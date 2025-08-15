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
            :pending="isStoreLeadPending"
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
            <div class="md:w-1/3 w-full">
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
defineOgImageComponent('DefaultOgImage');

const route = useRoute('lead-slug');

const { data } = await useFetch(`/api/offices/${route.params.slug}`);

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

const handleStoreLead = handleSubmit(async (values) => {
  try {
    await $fetch('/api/leads', {
      body: values,
      headers: headers.value,
      method: 'POST',
    });

    message.success('Demande de visite envoyée avec succès !');
    resetForm();
  }
  catch (error) {
    handleFetchError<StoreLeadRequest>(error, t, message, setErrors);
  }
});
</script>

<style scoped></style>
