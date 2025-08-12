<template>
  <div class="min-h-screen py-20 bg-gray-50 dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Contactez-nous
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            Notre équipe d'experts est là pour vous accompagner dans votre recherche de bureau
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12">
          <div class="space-y-8">
            <div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Informations de contact
              </h2>
              <div class="space-y-4">
                <div class="flex items-center space-x-3">
                  <Icon
                    name="mdi:phone"
                    class="text-blue-600 dark:text-blue-400 text-xl"
                  />
                  <span class="text-gray-600 dark:text-gray-300">07 55 54 06 09</span>
                </div>
                <div class="flex items-center space-x-3">
                  <Icon
                    name="mdi:email"
                    class="text-blue-600 dark:text-blue-400 text-xl"
                  />
                  <span class="text-gray-600 dark:text-gray-300">contact@petits-bureaux.fr</span>
                </div>
                <div class="flex items-center space-x-3">
                  <Icon
                    name="mdi:clock"
                    class="text-blue-600 dark:text-blue-400 text-xl"
                  />
                  <span class="text-gray-600 dark:text-gray-300">Lun-Ven: 9h-18h</span>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Notre équipe
              </h3>
              <div class="grid grid-cols-2 gap-4">
                <div
                  v-for="member in teamMembers"
                  :key="member.id"
                  class="text-center p-4 bg-white dark:bg-gray-700 rounded-lg"
                >
                  <div class="w-12 h-12 mx-auto mb-2 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span class="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {{ member.name.charAt(0) }}
                    </span>
                  </div>
                  <p class="font-semibold text-gray-900 dark:text-white text-sm">
                    {{ member.name }}
                  </p>
                  <p class="text-xs text-gray-600 dark:text-gray-300">
                    {{ member.role }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Envoyez-nous un message
            </h2>
            <form
              class="space-y-6"
              @submit.prevent="handleSubmit"
            >
              <div class="grid md:grid-cols-2 gap-4">
                <n-input
                  v-model:value="form.firstName"
                  placeholder="Prénom"
                  size="large"
                  required
                />
                <n-input
                  v-model:value="form.lastName"
                  placeholder="Nom"
                  size="large"
                  required
                />
              </div>

              <n-input
                v-model:value="form.email"
                type="text"
                placeholder="Email"
                size="large"
                required
              />

              <n-input
                v-model:value="form.phone"
                placeholder="Téléphone"
                size="large"
              />

              <n-input
                v-model:value="form.company"
                placeholder="Entreprise"
                size="large"
              />

              <n-select
                v-model:value="form.officeType"
                :options="officeTypeOptions"
                placeholder="Type de bureau recherché"
                size="large"
              />

              <n-input-number
                v-model:value="form.capacity"
                placeholder="Nombre de postes"
                size="large"
                :min="1"
                :max="1000"
              />

              <n-input
                v-model:value="form.budget"
                placeholder="Budget mensuel (€HT)"
                size="large"
              />

              <n-input
                v-model:value="form.location"
                placeholder="Localisation souhaitée"
                size="large"
              />

              <n-input
                v-model:value="form.message"
                type="textarea"
                placeholder="Votre message (optionnel)"
                size="large"
                :rows="4"
              />

              <n-button
                type="primary"
                size="large"
                class="w-full"
                :loading="isSubmitting"
                @click="handleSubmit"
              >
                Envoyer ma demande
              </n-button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type FormData = {
  budget: string;
  capacity: null | number;
  company: string;
  email: string;
  firstName: string;
  lastName: string;
  location: string;
  message: string;
  officeType: null | string;
  phone: string;
};

type TeamMember = {
  id: number;
  name: string;
  role: string;
};

const teamMembers: TeamMember[] = [
  { id: 1, name: 'Chloe', role: 'Consultante Senior' },
  { id: 2, name: 'Edouard', role: 'Expert Immobilier' },
  { id: 3, name: 'Martin', role: 'Conseiller Commercial' },
  { id: 4, name: 'Paul K', role: 'Spécialiste Coworking' },
  { id: 5, name: 'Pauline', role: 'Consultante' },
  { id: 6, name: 'Paul V', role: 'Expert Bureaux' },
];

const officeTypeOptions = [
  { label: 'Bureau privatif', value: 'private' },
  { label: 'Espace de coworking', value: 'coworking' },
  { label: 'Bureau opéré', value: 'operated' },
  { label: 'Étage/plateau indépendant', value: 'floor' },
  { label: 'Poste en open space', value: 'open-space' },
];

const form = ref<FormData>({
  budget: '',
  capacity: null,
  company: '',
  email: '',
  firstName: '',
  lastName: '',
  location: '',
  message: '',
  officeType: null,
  phone: '',
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;

  try {
    await $fetch('/api/leads', {
      body: {
        company: form.value.company,
        email: form.value.email,
        message: `
          Type de bureau: ${form.value.officeType || 'Non spécifié'}
          Capacité: ${form.value.capacity || 'Non spécifié'} postes
          Budget: ${form.value.budget || 'Non spécifié'}
          Localisation: ${form.value.location || 'Non spécifié'}
          
          Message: ${form.value.message || 'Aucun message'}
        `,
        name: `${form.value.firstName} ${form.value.lastName}`,
        phone: form.value.phone,
        status: 'new',
      },
      method: 'POST',
    });

    form.value = {
      budget: '',
      capacity: null,
      company: '',
      email: '',
      firstName: '',
      lastName: '',
      location: '',
      message: '',
      officeType: null,
      phone: '',
    };

    alert('Votre demande a été envoyée avec succès ! Nous vous recontacterons rapidement.');
  }
  catch (error) {
    console.error('Erreur lors de l\'envoi:', error);
    alert('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
  }
  finally {
    isSubmitting.value = false;
  }
};
</script>
