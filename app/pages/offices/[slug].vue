<template>
  <div class="container mx-auto px-4 py-8">
    <div
      v-if="isLoading"
      class="text-center py-12"
    >
      <n-spin size="large" />
      <p class="mt-4 text-gray-600 dark:text-gray-300">
        Chargement du bureau...
      </p>
    </div>

    <div
      v-else-if="office"
      class="max-w-6xl mx-auto"
    >
      <!-- Breadcrumb -->
      <nav class="mb-8">
        <n-breadcrumb>
          <n-breadcrumb-item @click="navigateTo('/')">
            Accueil
          </n-breadcrumb-item>
          <n-breadcrumb-item @click="navigateTo('/search')">
            Recherche
          </n-breadcrumb-item>
          <n-breadcrumb-item>
            {{ office.title }}
          </n-breadcrumb-item>
        </n-breadcrumb>
      </nav>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Photos Gallery -->
          <div class="space-y-4">
            <div class="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
              <img
                v-if="office.photos && office.photos.length > 0"
                :src="currentPhoto?.url || office.photos[0].url"
                :alt="office.title"
                class="w-full h-full object-cover"
              >
              <div
                v-else
                class="w-full h-full flex items-center justify-center"
              >
                <Icon
                  name="mdi:office-building"
                  class="text-6xl text-gray-400"
                />
              </div>
            </div>

            <div
              v-if="office.photos && office.photos.length > 1"
              class="grid grid-cols-4 gap-2"
            >
              <div
                v-for="(photo, index) in office.photos"
                :key="index"
                class="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                @click="currentPhoto = photo"
              >
                <img
                  :src="photo.url"
                  :alt="`${office.title} - Photo ${index + 1}`"
                  class="w-full h-full object-cover"
                >
              </div>
            </div>
          </div>

          <!-- Office Details -->
          <div class="space-y-6">
            <div>
              <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {{ office.title }}
              </h1>
              <div class="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                <div class="flex items-center space-x-2">
                  <Icon name="mdi:map-marker" />
                  <span>{{ office.location }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <Icon name="mdi:office-building" />
                  <span>{{ getOfficeTypeLabel(office.type) }}</span>
                </div>
              </div>
            </div>

            <div class="prose dark:prose-invert max-w-none">
              <p class="text-lg text-gray-700 dark:text-gray-300">
                {{ office.description }}
              </p>
            </div>

            <!-- Services -->
            <div v-if="office.services && office.services.length > 0">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Services inclus
              </h3>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div
                  v-for="service in office.services"
                  :key="service.id"
                  class="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <Icon
                    :name="service.icon"
                    class="text-blue-600 dark:text-blue-400"
                  />
                  <span class="text-gray-700 dark:text-gray-300">{{ service.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Price Card -->
          <n-card>
            <div class="space-y-4">
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {{ formatPrice(office.price_cents) }}
                </div>
                <div class="text-gray-600 dark:text-gray-300">
                  par mois
                </div>
              </div>

              <n-button
                type="primary"
                size="large"
                class="w-full"
                @click="showVisitForm = true"
              >
                Planifier une visite
              </n-button>

              <n-button
                size="large"
                class="w-full"
                @click="showContactForm = true"
              >
                Nous contacter
              </n-button>
            </div>
          </n-card>

          <!-- Quick Info -->
          <n-card>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Informations rapides
            </h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-300">Type</span>
                <span class="font-medium">{{ getOfficeTypeLabel(office.type) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-300">Surface</span>
                <span class="font-medium">{{ office.size_m2 }}m²</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-300">Capacité</span>
                <span class="font-medium">{{ office.capacity }} personnes</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-300">Disponibilité</span>
                <span class="font-medium text-green-600 dark:text-green-400">
                  Disponible
                </span>
              </div>
            </div>
          </n-card>
        </div>
      </div>
    </div>

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
      <n-button
        type="primary"
        @click="navigateTo('/search')"
      >
        Retour à la recherche
      </n-button>
    </div>

    <!-- Visit Form Modal -->
    <n-modal
      v-model:show="showVisitForm"
      preset="card"
      title="Planifier une visite"
      class="w-full max-w-md"
    >
      <div class="space-y-4">
        <n-form
          ref="visitFormRef"
          :model="visitForm"
          :rules="visitFormRules"
        >
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
            @click="showVisitForm = false"
          >
            Annuler
          </n-button>
          <n-button
            type="primary"
            class="flex-1"
            :loading="isSubmittingVisit"
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
const officeSlug = route.params.slug as string;

const isLoading = ref(true);
const office = ref<any>(null);
const currentPhoto = ref<any>(null);
const showVisitForm = ref(false);
const showContactForm = ref(false);
const isSubmittingVisit = ref(false);
const visitFormRef = ref();

const visitForm = ref({
  email: '',
  message: '',
  name: '',
  phone: '',
  preferredDate: null,
});

const visitFormRules = {
  email: {
    message: 'L\'email est requis',
    required: true,
    trigger: 'blur',
    validator: (rule: any, value: string) => {
      if (!value) return false;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
  },
  name: {
    message: 'Le nom est requis',
    required: true,
    trigger: 'blur',
  },
  phone: {
    message: 'Le téléphone est requis',
    required: true,
    trigger: 'blur',
  },
  preferredDate: {
    message: 'La date est requise',
    required: true,
    trigger: 'change',
  },
};

const officeTypes = {
  coworking: 'Espace de coworking',
  meeting: 'Salle de réunion',
  private: 'Bureau privatif',
  shared: 'Bureau partagé',
};

const getOfficeTypeLabel = (type: string) => {
  return officeTypes[type as keyof typeof officeTypes] || type;
};

const formatPrice = (priceCents: number) => {
  return new Intl.NumberFormat('fr-FR', {
    currency: 'EUR',
    style: 'currency',
  }).format(priceCents / 100);
};

const fetchOffice = async () => {
  try {
    const { data } = await useFetch(`/api/offices/${officeSlug}`);
    office.value = data.value;
    if (office.value?.photos?.length > 0) {
      currentPhoto.value = office.value.photos[0];
    }
  }
  catch (error) {
    console.error('Error fetching office:', error);
    office.value = null;
  }
  finally {
    isLoading.value = false;
  }
};

const submitVisitForm = async () => {
  try {
    await visitFormRef.value?.validate();
    isSubmittingVisit.value = true;

    const leadData = {
      email: visitForm.value.email,
      message: visitForm.value.message,
      name: visitForm.value.name,
      office_id: office.value.id,
      phone: visitForm.value.phone,
      preferred_date: visitForm.value.preferredDate,
    };

    await $fetch('/api/leads', {
      body: leadData,
      method: 'POST',
    });

    showVisitForm.value = false;
    visitForm.value = {
      email: '',
      message: '',
      name: '',
      phone: '',
      preferredDate: null,
    };

    window.$message.success('Demande de visite envoyée avec succès !');
  }
  catch (error) {
    console.error('Error submitting visit form:', error);
    window.$message.error('Erreur lors de l\'envoi de la demande');
  }
  finally {
    isSubmittingVisit.value = false;
  }
};

onMounted(() => {
  fetchOffice();
});
</script>
