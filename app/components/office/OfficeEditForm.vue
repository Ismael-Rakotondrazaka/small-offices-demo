<template>
  <n-form>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <n-form-item
          label="Titre"
          required
          v-bind="titleProps"
        >
          <n-input
            v-model:value="title"
            type="text"
            placeholder="Nom du bureau"
          />
        </n-form-item>
      </div>

      <div>
        <n-form-item
          label="Slug"
          required
          :feedback="slugFeedback"
          :validation-status="slugValidationStatus"
        >
          <n-input
            v-model:value="slug"
            type="text"
            placeholder="nom-du-bureau"
          />
        </n-form-item>
        <n-p
          v-if="slug.length"
        >
          <n-text
            :type="isSlugAvailable ? 'success' : 'error'"
          >
            <Icon :name="isSlugAvailable ? 'mdi:check' : 'mdi:close'" />
            {{ urlPreview }}
          </n-text>
        </n-p>
      </div>

      <div>
        <n-form-item
          label="Type"
          required
          v-bind="typeProps"
        >
          <n-select
            v-model:value="type"
            :options="officeTypeOptions"
            placeholder="Sélectionner un type"
          />
        </n-form-item>
      </div>

      <div>
        <n-form-item
          label="Nombre de postes"
          required
          v-bind="postsProps"
        >
          <n-input-number
            v-model:value="posts"
            :min="1"
            placeholder="Nombre de postes"
          />
        </n-form-item>
      </div>

      <div>
        <n-form-item
          label="Prix mensuel"
          required
          v-bind="priceProps"
        >
          <n-input-number
            v-model:value="price"
            :min="0"
            placeholder="Prix"
          >
            <template #suffix>
              €
            </template>
          </n-input-number>
        </n-form-item>
      </div>
    </div>

    <n-form-item
      label="Arrondissement"
      required
      v-bind="arrProps"
    >
      <n-select
        v-model:value="arr"
        :options="arrOptions"
        placeholder="Sélectionner un arrondissement"
      />
    </n-form-item>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <n-form-item
        label="Latitude"
        required
        v-bind="latProps"
      >
        <n-input-number
          v-model:value="lat"
          placeholder="48.8566"
        />
      </n-form-item>
      <n-form-item
        label="Longitude"
        required
        v-bind="lngProps"
      >
        <n-input-number
          v-model:value="lng"
          placeholder="2.3522"
        />
      </n-form-item>
    </div>

    <OfficeMarkerForm
      v-model:lat="lat"
      v-model:lng="lng"
      v-model:arr="arr"
      :style="{
        height: '500px',
        borderRadius: '10px',
        marginBottom: '1rem',
      }"
    />

    <n-form-item
      label="Services"
      v-bind="serviceIdsProps"
      required
    >
      <n-select
        v-model:value="serviceIds"
        :options="serviceOptions"
        multiple
        filterable
        clearable
        placeholder="Sélectionner les services"
      />
    </n-form-item>

    <n-form-item
      required
      label="Photos"
      v-bind="photoUrlsProps"
    >
      <n-upload
        :max="5"
        multiple
        list-type="image-card"
        :custom-request="customMediaUploadRequest"
        :accept="mediaConfig.IMAGE_FORM_ACCEPT"
        :default-file-list="defaultUploadFileList"
        class=""
        :on-remove="handleRemove"
      >
        Ajouter des photos
      </n-upload>
    </n-form-item>

    <n-form-item
      label="Bureau factice"
      v-bind="isFakeProps"
    >
      <n-switch
        v-model:value="isFake"
      />
    </n-form-item>

    <n-button
      class="mt-6"
      type="primary"
      :pending="isStoreOfficePending"
      @click="handleStoreOffice"
    >
      <template #icon>
        <Icon name="mdi:content-save" />
      </template>

      Enregistrer
    </n-button>
  </n-form>
</template>

<script setup lang="ts">
import type { SelectOption, UploadCustomRequestOptions, UploadFileInfo, UploadOnRemove } from 'naive-ui';

import slugify from 'slugify';

interface Props {
  office: Serialize<OfficeDTO>;
}
const props = defineProps<Props>();

type Emits = {
  'update:office': [office: Serialize<OfficeDTO>];
};

const emit = defineEmits<Emits>();

const runtimeConfig = useRuntimeConfig();

const message = useMessage();

const arrOptions: SelectOption[] = Array.from({ length: 20 }, (_, index) => index + 1).map(value => ({
  label: `Paris ${value}`,
  value,
}));

const {
  defineField,
  handleSubmit,
  isSubmitting: isStoreOfficePending,
  setErrors,
} = useForm({
  initialValues: {
    arr: props.office.arr,
    isFake: props.office.isFake,
    lat: props.office.lat,
    lng: props.office.lng,
    photoUrls: props.office.photos.map(photo => photo.url),
    posts: props.office.posts,
    price: props.office.price,
    serviceIds: props.office.services.map(service => service.id),
    slug: props.office.slug,
    title: props.office.title,
    type: props.office.type,
  },
  validationSchema: toTypedSchema(StoreOfficeRequestBodySchema),
});

const resetForm = () => {
  title.value = props.office.title;
  slug.value = props.office.slug;
  type.value = props.office.type;
  arr.value = props.office.arr;
  posts.value = props.office.posts;
  price.value = props.office.price;
  lat.value = props.office.lat;
  lng.value = props.office.lng;
  serviceIds.value = props.office.services.map(service => service.id);
  photoUrls.value = props.office.photos.map(photo => photo.url);
  isFake.value = props.office.isFake;
};

const [title, titleProps] = defineField('title', makeInputProps<StoreOfficeRequestBody['title']>);
const [slug, slugProps] = defineField('slug', makeInputProps<StoreOfficeRequestBody['slug']>);
const [type, typeProps] = defineField('type', makeInputProps<StoreOfficeRequestBody['type']>);
const [arr, arrProps] = defineField('arr', makeInputProps<StoreOfficeRequestBody['arr']>);
const [posts, postsProps] = defineField('posts', makeInputProps<StoreOfficeRequestBody['posts']>);
const [price, priceProps] = defineField('price', makeInputProps<StoreOfficeRequestBody['price']>);
const [lat, latProps] = defineField('lat', makeInputProps<StoreOfficeRequestBody['lat']>);
const [lng, lngProps] = defineField('lng', makeInputProps<StoreOfficeRequestBody['lng']>);
const [serviceIds, serviceIdsProps] = defineField('serviceIds', makeInputProps<StoreOfficeRequestBody['serviceIds']>);
const [photoUrls, photoUrlsProps] = defineField('photoUrls', makeInputProps<StoreOfficeRequestBody['photoUrls']>);
const [isFake, isFakeProps] = defineField('isFake', makeInputProps<StoreOfficeRequestBody['isFake']>);

const supabase = useSupabaseClient();

const config = useRuntimeConfig();

const defaultUploadFileList = computed<UploadFileInfo[]>(() => {
  return props.office.photos.map(photo => ({
    id: photo.id,
    name: photo.url,
    status: 'finished',
    type: 'image/*',
    url: photo.url,
  }));
});

const customMediaUploadRequest = async ({
  file: _file,
  onError,
  onFinish,
}: UploadCustomRequestOptions) => {
  try {
    if (!_file.file) {
      return;
    }

    const { data, error } = await supabase.storage.from(config.public.fileStorageBucketName)
      .upload(`/offices/${slug.value}/${formatFileName(_file.file.name)}`, _file.file, {
        contentType: _file.file.type,
      });

    if (error || !data) {
      onError();
      message.error(`Erreur lors de l'upload de la photo: ${_file.file.name}`);
      return;
    }

    photoUrls.value.push(`${config.public.fileStorageBucketEntryPoint}/${data.path}`);

    onFinish();
    message.success(`Photo ${_file.file.name} ajoutée avec succès`);
  }
  catch {
    onError();
    message.error(_file.file ? `Erreur lors de l'upload de la photo: ${_file.file.name}` : 'Erreur lors de l\'upload de la photo');
  }
};

const handleRemove: UploadOnRemove = ({ index }) => {
  photoUrls.value = photoUrls.value.filter((_, i) => i !== index);
  return true;
};

watch(title, (value) => {
  const slugified = slugify(value, {
    locale: 'fr',
    lower: true,
  });

  if (value && !slug.value && slugified !== props.office.slug) {
    slug.value = slugified;
  }
}, {
  immediate: false,
});

const slugDebounced = debouncedRef(slug, 1500);

const urlPreview = computed(() => {
  return `${runtimeConfig.public.appUrl}/offices/${slugDebounced.value}`;
});

const isSlugAvailable = ref(true);

const checkSlugAvailability = async (slug: string) => {
  try {
    const { data } = await $fetch('/api/offices/slug/is-available', {
      query: { slug },
    });

    return data;
  }
  catch {
    return false;
  }
};

watch(slugDebounced, async (value) => {
  if (value !== slug.value) {
    isSlugAvailable.value = await checkSlugAvailability(value);
  }
});

const slugFeedback = computed(() => {
  if (slugProps.value.feedback) {
    return slugProps.value.feedback;
  }

  if (!slug.value.length) {
    return undefined;
  }

  return isSlugAvailable.value ? 'Le slug est disponible' : 'Le slug n\'est pas disponible';
});

const slugValidationStatus = computed(() => {
  if (slugProps.value.validationStatus) {
    return slugProps.value.validationStatus;
  }

  return slug.value.length && !isSlugAvailable.value ? 'error' : undefined;
});

const { t } = useI18n({
  useScope: 'global',
});

const { data: servicesData } = await useFetch('/api/services');

const officeTypeOptions = computed(() =>
  OfficeTypes.map(type => ({
    label: OfficeTypeLabel[type],
    value: type,
  })),
);

const serviceOptions = computed(() =>
  servicesData.value?.data.map(service => ({
    label: service.name,
    value: service.id,
  })) ?? [],
);

const handleStoreOffice = handleSubmit(async (values) => {
  try {
    const officeData = await $fetch<Serialize<UpdateOfficeRequestData>>(`/api/offices/${slug.value}`, {
      body: values,
      method: 'PUT',
    });

    message.success('Bureau modifié avec succès !');
    emit('update:office', officeData.data);

    resetForm();
  }
  catch (error) {
    handleFetchError<StoreOfficeRequest>(error, t, message, setErrors);
  }
});
</script>

<style scoped></style>
