<template>
  <div class="mx-auto w-full max-w-2xl p-3">
    <n-h1>{{ $t("posts.create.title") }}</n-h1>

    <UIButton>Hello</UIButton>

    <n-form id="create-post-form">
      <n-form-item
        :label="$t('posts.forms.fields.content.label')"
        required
        v-bind="contentProps"
      >
        <n-input
          v-model:value="content"
          type="textarea"
          show-count
          :placeholder="$t('posts.forms.fields.content.placeholder')"
        />
      </n-form-item>

      <n-p>{{ $t("posts.forms.fields.image.label") }}</n-p>

      <n-upload
        action="https://naive-upload.free.beeceptor.com/"
        :max="1"
        list-type="image-card"
        :custom-request="customMediaUploadRequest"
        :accept="mediaConfig.IMAGE_FORM_ACCEPT"
        class=""
        :on-remove="handleRemove"
      >
        <n-button>
          {{ $t("posts.forms.fields.image.upload.text") }}
        </n-button>
      </n-upload>
      <n-text
        v-if="errors.imageId"
        type="error"
      >
        {{ errors.imageId }}
      </n-text>

      <n-nutton
        class="mt-5"
        type="primary"
        :disabled="isStoreMediaStatusPending"
        :pending="isStorePostPending"
        @click="handleStorePost"
      >
        {{ $t("posts.forms.ctas.publish") }}
      </n-nutton>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import type { UploadCustomRequestOptions } from 'naive-ui';

defineOgImageComponent('DefaultOgImage');

definePageMeta({
  middleware: 'auth',
});

const localeRoute = useLocaleRoute();

const {
  defineField,
  errors,
  handleSubmit,
  isSubmitting: isStorePostPending,
  resetForm,
  setErrors,
  setFieldValue,
} = useForm({
  initialValues: {
    content: '',
    imageId: null,
  },
  validationSchema: toTypedSchema(StorePostRequestBodySchema),
});

const [content, contentProps] = defineField('content', makeInputProps<string>);
const [imageId] = defineField('imageId', makeInputProps<null | string>);

const prepareUploadBody = (_file: File): GetMediaUploadUrlRequestBody => ({
  file: {
    lastModified: _file.lastModified,
    name: _file.name,
    size: _file.size,
    type: _file.type,
  },
});

const getUploadUrl = async (body: GetMediaUploadUrlRequestBody) => {
  return await $fetch('/api/media/upload-url', {
    body,
    method: 'POST',
  });
};

const uploadFileToUrl = async (uploadUrl: string, _file: File) => {
  await $fetch(uploadUrl, {
    body: _file,
    headers: {
      'Content-Type': _file.type,
    },
    method: 'PUT',
  });
};

const confirmUpload = async (
  fileMetaData: ConfirmMediaUploadRequestBody['fileMetaData'],
) => {
  return $fetch('/api/media/confirm-upload', {
    body: {
      fileMetaData,
    },
    method: 'POST',
  });
};

const isStoreMediaStatusPending = ref(false);
const customMediaUploadRequest = async ({
  file: _file,
  onError,
  onFinish,
}: UploadCustomRequestOptions) => {
  isStoreMediaStatusPending.value = true;
  try {
    if (!_file.file) {
      return;
    }

    const body = prepareUploadBody(_file.file);

    const { fileMetaData, uploadUrl } = await getUploadUrl(body);
    await uploadFileToUrl(uploadUrl, _file.file);
    const mediaResponse = await confirmUpload(fileMetaData);
    imageId.value = mediaResponse.media.id;

    onFinish();
    message.success(t('home.upload.success'));
  }
  catch (error) {
    onError();
    handleFetchError(error, t, message, setErrors);
  }
  isStoreMediaStatusPending.value = false;
};

const handleRemove = () => {
  setFieldValue('imageId', undefined);
};

const { locale, t } = useI18n({
  useScope: 'global',
});

const headers = computed(() => ({
  'accept-language': locale.value,
}));

const message = useMessage();

const handleStorePost = handleSubmit(async (values) => {
  try {
    const responseData = await $fetch('/api/posts', {
      body: values,
      headers: headers.value,
      method: 'POST',
    });

    resetForm();

    navigateTo(
      localeRoute({
        name: 'posts-id',
        params: {
          id: responseData.data.id,
        },
      }),
    );
  }
  catch (error) {
    handleFetchError<StorePostRequest>(error, t, message, setErrors);
  }
});
</script>

<style scoped></style>
