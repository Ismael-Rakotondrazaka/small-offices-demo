<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <n-h1>Demander une visite</n-h1>

    <div class="flex flex-col md:flex-row gap-8">
      <div class="md:w-1/2 w-full">
        <n-form>
          <n-form-item
            label="Nom"
            required
            v-bind="nameProps"
          >
            <n-input
              v-model:value="name"
              type="text"
              placeholder="Votre nom"
            />
          </n-form-item>

          <n-form-item
            label="Email"
            required
            v-bind="emailProps"
          >
            <n-input
              v-model:value="email"
              type="text"
              placeholder="Votre email"
            />
          </n-form-item>

          <n-form-item
            label="Téléphone"
            required
            v-bind="phoneProps"
          >
            <n-input
              v-model:value="phone"
              type="text"
              placeholder="06 12 34 56 78 ou +33 6 12 34 56 78"
            />
          </n-form-item>

          <n-button
            class="mt-5"
            type="primary"
            :loading="isStoreLeadPending"
            @click="handleStoreLead"
          >
            Envoyer la demande
          </n-button>
        </n-form>
      </div>
      <div class="md:w-1/2 w-full flex flex-col gap-5">
        <n-card
          v-if="data"
          class="mb-5"
          :title="`${data.data.title} - Paris ${data.data.arr}`"
        >
          <div class="flex flex-col md:flex-row gap-5">
            <div
              v-if="data.data.photos.length"
              class="md:w-1/3 w-full"
            >
              <n-image
                :src="data.data.photos[0]!.url"
                object-fit="cover"
                class="rounded-lg w-full h-full"
                width="100%"
                height="100%"
                :preview-disabled="true"
              />
            </div>
            <div class="md:w-2/3 w-full">
              <n-p strong>
                {{ data.data.posts }} postes
                ·
                <template v-if="data.data.services.length">
                  {{ data.data.services.length }} services
                </template>
              </n-p>
              <p>
                <i18n-n
                  scope="global"
                  tag="span"
                  :value="data.data.price"
                  format="currency"
                  class="font-bold"
                /> par mois
              </p>
            </div>
          </div>
        </n-card>
        <div v-if="data">
          <LocationPreview
            :lat="data.data.lat"
            :lng="data.data.lng"
            class="rounded-lg"
            style="height: 300px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute('lead-slug');

const { data }: Awaited<RequestToAsyncData<ShowOfficeRequest>> = await useFetch(`/api/offices/${route.params.slug}`);

defineOgImageComponent('OgImageLead', {
  officeArr: data.value?.data?.arr,
  officePosts: data.value?.data?.posts,
  officePrice: data.value?.data?.price,
  officeTitle: data.value?.data?.title,
});

const runtimeConfig = useRuntimeConfig();

useSeoMeta({
  author: 'Petits Bureaux',
  description: () => data.value?.data?.title ? `Demander une visite pour ${data.value.data.title} - Paris ${data.value.data.arr}. Accédez à tous les bureaux du marché. Votre conseiller vous accompagne en visite et vous aide à négocier. Le tout gratuitement.` : 'Demander une visite | Petits Bureaux',
  keywords: () => data.value?.data?.title ? `visite bureau ${data.value.data.title}, location bureau Paris ${data.value.data.arr}, conseiller immobilier, immobilier d'entreprise` : 'visite bureau, location bureaux, conseiller immobilier',
  ogDescription: () => data.value?.data?.title ? `Demander une visite pour ${data.value.data.title} - Paris ${data.value.data.arr}. Accédez à tous les bureaux du marché. Votre conseiller vous accompagne en visite et vous aide à négocier. Le tout gratuitement.` : 'Demander une visite | Petits Bureaux',
  ogLocale: 'fr_FR',
  ogSiteName: 'Petits Bureaux',
  ogTitle: () => data.value?.data?.title ? `Visite ${data.value.data.title} | Paris ${data.value.data.arr} | Petits Bureaux` : 'Demander une visite | Petits Bureaux',
  ogType: 'website',
  ogUrl: () => data.value?.data?.slug ? `${runtimeConfig.public.appUrl}/lead/${data.value.data.slug}` : `${runtimeConfig.public.appUrl}/lead/${route.params.slug}`,
 
  title: () => data.value?.data?.title ? `Visite ${data.value.data.title} | Paris ${data.value.data.arr} | Petits Bureaux` : 'Demander une visite | Petits Bureaux',
  twitterCard: 'summary_large_image',
  twitterCreator: () => runtimeConfig.public.appUrl,
  twitterDescription: () => data.value?.data?.title ? `Demander une visite pour ${data.value.data.title} - Paris ${data.value.data.arr}. Accédez à tous les bureaux du marché. Votre conseiller vous accompagne en visite et vous aide à négocier. Le tout gratuitement.` : 'Demander une visite | Petits Bureaux',
  twitterSite: () => runtimeConfig.public.appUrl,
  twitterTitle: () => data.value?.data?.title ? `Visite ${data.value.data.title} | Paris ${data.value.data.arr} | Petits Bureaux` : 'Demander une visite | Petits Bureaux',
});

const message = useMessage();

const {
  defineField,
  handleSubmit,
  isSubmitting: isStoreLeadPending,
  resetForm,
  setErrors,
} = useForm({
  initialValues: {
    email: '',
    name: '',
    officeSlug: route.params.slug as string,
    phone: '',
  },
  validationSchema: toTypedSchema(StoreLeadRequestBodySchema),
});

const [email, emailProps] = defineField('email', makeInputProps<StoreLeadRequestBody['email']>);
const [name, nameProps] = defineField('name', makeInputProps<StoreLeadRequestBody['name']>);
const [phone, phoneProps] = defineField('phone', makeInputProps<StoreLeadRequestBody['phone']>);

const { locale, t } = useI18n({
  useScope: 'global',
});

const headers = computed(() => ({
  'accept-language': locale.value,
}));

const { gtag } = useGtag();

const handleStoreLead = handleSubmit(async (values) => {
  try {
    await $fetch('/api/leads', {
      body: values,
      headers: headers.value,
      method: 'POST',
    });

    message.success('Demande de visite envoyée avec succès !');
    resetForm();

    gtag('event', 'lead_submit', {
      office_id: data.value?.data?.id,
      office_slug: route.params.slug,
    });
  }
  catch (error) {
    handleFetchError<StoreLeadRequest>(error, t, message, setErrors);
  }
});
</script>

<style scoped></style>
