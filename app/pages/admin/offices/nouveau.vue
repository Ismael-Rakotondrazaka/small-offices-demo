<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <n-h1>Créer un nouveau bureau</n-h1>

    <n-form class="max-w-4xl">
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
              :type="isAvailableData?.data ? 'success' : 'error'"
            >
              <Icon :name="isAvailableData?.data ? 'mdi:check' : 'mdi:close'" />
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
        Créer le bureau
      </n-button>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import type { SelectOption, UploadCustomRequestOptions, UploadOnRemove } from 'naive-ui';

import slugify from 'slugify';
import { v7 as uuidv7 } from 'uuid';

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
});

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
  resetForm,
  setErrors,
} = useForm({
  initialValues: {
    arr: 1,
    isFake: false,
    lat: 48.8596,
    lng: 2.3429,
    photoUrls: [],
    posts: 5,
    price: 500,
    serviceIds: [],
    slug: '',
    title: '',
    type: 'PRIVATE_OFFICE',
  },
  validationSchema: toTypedSchema(StoreOfficeRequestBodySchema),
});

const [title, titleProps] = defineField('title', makeInputProps<StoreOfficeRequestBody['title']>);
useNonEmptyString(title);
const [slug, slugProps] = defineField('slug', makeInputProps<StoreOfficeRequestBody['slug']>);
useNonEmptyString(slug);
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

const customMediaUploadRequest = async ({
  file: _file,
  onError,
  onFinish,
}: UploadCustomRequestOptions) => {
  try {
    if (!_file.file) {
      return;
    }

    const { data, error } = await supabase.storage.from('petits-bureaux').upload(`/offices/${slug.value}/${uuidv7()}__${slugify(_file.file.name, {
      locale: 'fr',
      lower: true,
    })}`, _file.file, {
      contentType: _file.file.type,
    });

    if (error || !data) {
      onError();
      message.error(`Erreur lors de l'upload de la photo: ${_file.file.name}`);
      return;
    }

    photoUrls.value.push(data.fullPath);

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
  if (value && !slug.value) {
    slug.value = slugify(value, {
      locale: 'fr',
      lower: true,
    });
  }
}, {
  immediate: false,
});

const slugDebounced = debouncedRef(slug, 1500);

const urlPreview = computed(() => {
  return `${runtimeConfig.public.appUrl}/offices/${slugDebounced.value}`;
});

const queryDebounced = computed(() => ({
  slug: slugDebounced.value,
}));

const { data: isAvailableData } = await useFetch('/api/offices/slug/is-available', {
  query: queryDebounced,
});

const slugFeedback = computed(() => {
  if (slugProps.value.feedback) {
    return slugProps.value.feedback;
  }

  if (!slug.value.length) {
    return undefined;
  }

  return isAvailableData.value?.data ? 'Le slug est disponible' : 'Le slug n\'est pas disponible';
});

const slugValidationStatus = computed(() => {
  if (slugProps.value.validationStatus) {
    return slugProps.value.validationStatus;
  }

  return slug.value.length && !isAvailableData.value?.data ? 'error' : undefined;
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
    const officeData = await $fetch('/api/offices', {
      body: values,
      method: 'POST',
    });

    message.success('Bureau créé avec succès !');
    resetForm();

    return navigateTo({
      name: 'admin-offices-id',
      params: {
        id: officeData.data.id,
      },
    });
  }
  catch (error) {
    handleFetchError<StoreOfficeRequest>(error, t, message, setErrors);
  }
});
</script>

<style scoped></style>
