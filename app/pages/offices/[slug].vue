<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div
      v-if="isLoading"
      class="text-center py-12"
    >
      <n-spin size="large" />
      <p class="mt-4 text-gray-600 dark:text-gray-300">
        Chargement du bureau...
      </p>
    </div>

    <OfficeListItem
      v-else-if="data"
      class="max-w-6xl mx-auto"
      :office="data.data"
    />

    <div
      v-else
      class="text-center py-12"
    >
      <Icon
        name="mdi:alert-circle"
        class="text-6xl text-gray-400 mx-auto mb-4"
      />
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Bureau non trouvé
      </h3>
      <p class="text-gray-600 dark:text-gray-300 mb-6">
        Le bureau que vous recherchez n'existe pas ou a été supprimé.
      </p>
      <NuxtLink :to="{ name: 'search' }">
        <n-button
          type="primary"
          tag="span"
        >
          Retour à la recherche
        </n-button>
      </NuxtLink>
    </div>

    <!-- Visit Form Modal -->
    <n-modal
      v-model:show="showVisitForm"
      preset="card"
      title="Planifier une visite"
      class="w-full max-w-md"
    >
      <div class="space-y-4">
        <n-form>
          <n-form-item
            label="Nom complet"
            path="name"
          >
            <n-input
              v-model:value="visitForm.name"
              placeholder="Votre nom complet"
            />
          </n-form-item>

          <n-form-item
            label="Email"
            path="email"
          >
            <n-input
              v-model:value="visitForm.email"
              placeholder="votre@email.com"
            />
          </n-form-item>

          <n-form-item
            label="Téléphone"
            path="phone"
          >
            <n-input
              v-model:value="visitForm.phone"
              placeholder="Votre numéro de téléphone"
            />
          </n-form-item>

          <n-form-item
            label="Date souhaitée"
            path="preferredDate"
          >
            <n-date-picker
              v-model:value="visitForm.preferredDate"
              type="date"
              placeholder="Choisissez une date"
            />
          </n-form-item>

          <n-form-item
            label="Message (optionnel)"
            path="message"
          >
            <n-input
              v-model:value="visitForm.message"
              type="textarea"
              placeholder="Informations supplémentaires..."
              :rows="3"
            />
          </n-form-item>
        </n-form>

        <div class="flex space-x-3">
          <n-button
            class="flex-1"
          >
            Annuler
          </n-button>
          <n-button
            type="primary"
            class="flex-1"
            @click="submitVisitForm"
          >
            Envoyer
          </n-button>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const message = useMessage();

const showVisitForm = ref(false);

const visitForm = ref({
  email: '',
  message: '',
  name: '',
  phone: '',
  preferredDate: null,
});

const { data, status } = await useFetch(`/api/offices/${route.params.slug}`);

const isLoading = useFetchLoading(status);

const submitVisitForm = async () => {
  try {
    message.success('Demande de visite envoyée avec succès !');
  }
  catch {
    message.error('Erreur lors de l\'envoi de la demande');
  }
};
</script>
