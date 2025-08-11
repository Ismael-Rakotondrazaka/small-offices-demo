<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-8">
            <div class="space-y-4">
              <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                {{ $t('home.hero.title') }}
              </h1>
              <p class="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ $t('home.hero.subtitle') }}
              </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-4">
              <n-button
                type="primary"
                size="large"
                class="text-lg px-8 py-4"
                @click="navigateTo('/search')"
              >
                {{ $t('home.hero.searchButton') }}
              </n-button>
              <n-button
                size="large"
                class="text-lg px-8 py-4"
                @click="scrollToFeatures"
              >
                {{ $t('home.hero.learnMoreButton') }}
              </n-button>
            </div>

            <div class="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div class="flex items-center space-x-2">
                <Icon
                  name="mdi:check-circle"
                  class="text-green-500"
                />
                <span>{{ $t('home.hero.freeService') }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <Icon
                  name="mdi:check-circle"
                  class="text-green-500"
                />
                <span>{{ $t('home.hero.expertAdvice') }}</span>
              </div>
            </div>
          </div>

          <div class="relative">
            <div class="relative z-10">
              <img
                src="/images/illustrations/hero/hero_4356x1800.webp"
                alt="Office spaces"
                class="w-full h-auto rounded-2xl shadow-2xl"
              >
            </div>
            <div class="absolute -top-4 -right-4 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 blur-3xl" />
            <div class="absolute -bottom-4 -left-4 w-64 h-64 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-20 blur-3xl" />
          </div>
        </div>
      </div>
    </section>

    <!-- Search Section -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {{ $t('home.search.title') }}
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-300">
              {{ $t('home.search.description') }}
            </p>
          </div>

          <n-card class="shadow-lg">
            <div class="grid md:grid-cols-3 gap-4">
              <n-input
                v-model:value="searchQuery"
                :placeholder="$t('home.search.locationPlaceholder')"
                size="large"
              >
                <template #prefix>
                  <Icon name="mdi:map-marker" />
                </template>
              </n-input>

              <n-select
                v-model:value="selectedType"
                :options="officeTypes"
                :placeholder="$t('home.search.typePlaceholder')"
                size="large"
              />

              <n-button
                type="primary"
                size="large"
                class="w-full"
                @click="handleSearch"
              >
                {{ $t('home.search.searchButton') }}
              </n-button>
            </div>
          </n-card>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section
      ref="featuresSection"
      class="py-20 bg-gray-50 dark:bg-gray-800"
    >
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ $t('home.features.title') }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {{ $t('home.features.description') }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <n-card
            v-for="feature in features"
            :key="feature.id"
            class="h-full hover:shadow-lg transition-shadow duration-300"
          >
            <div class="text-center space-y-4">
              <div class="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Icon
                  :name="feature.icon"
                  class="text-2xl text-blue-600 dark:text-blue-400"
                />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                {{ feature.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                {{ feature.description }}
              </p>
            </div>
          </n-card>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ $t('home.howItWorks.title') }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            {{ $t('home.howItWorks.description') }}
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(step, index) in howItWorksSteps"
            :key="step.id"
            class="text-center relative"
          >
            <div class="w-20 h-20 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
              {{ index + 1 }}
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ step.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-blue-600 dark:bg-blue-700">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl lg:text-4xl font-bold text-white mb-6">
          {{ $t('home.cta.title') }}
        </h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          {{ $t('home.cta.description') }}
        </p>
        <n-button
          type="primary"
          size="large"
          class="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100"
          @click="navigateTo('/search')"
        >
          {{ $t('home.cta.button') }}
        </n-button>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
defineOgImageComponent('DefaultOgImage');

const featuresSection = ref<HTMLElement>();
const searchQuery = ref('');
const selectedType = ref<null | string>(null);

const officeTypes = [
  { label: 'Bureau privatif', value: 'private' },
  { label: 'Espace de coworking', value: 'coworking' },
  { label: 'Salle de réunion', value: 'meeting' },
  { label: 'Bureau partagé', value: 'shared' },
];

const features = [
  {
    description: 'Trouvez des bureaux près de chez vous avec notre carte interactive',
    icon: 'mdi:map-marker-radius',
    id: 1,
    title: 'Recherche géolocalisée',
  },
  {
    description: 'Un expert vous accompagne gratuitement dans votre recherche',
    icon: 'mdi:account-tie',
    id: 2,
    title: 'Conseil personnalisé',
  },
  {
    description: 'Nous négocions les meilleurs tarifs pour vous',
    icon: 'mdi:handshake',
    id: 3,
    title: 'Négociation incluse',
  },
  {
    description: 'Planifiez des visites avec les propriétaires',
    icon: 'mdi:calendar-check',
    id: 4,
    title: 'Visites organisées',
  },
  {
    description: 'Aucun frais caché, notre service est entièrement gratuit',
    icon: 'mdi:shield-check',
    id: 5,
    title: 'Service gratuit',
  },
  {
    description: 'Consultez les avis authentiques de nos clients',
    icon: 'mdi:star',
    id: 6,
    title: 'Avis vérifiés',
  },
];

const howItWorksSteps = [
  {
    description: 'Utilisez notre moteur de recherche pour trouver des bureaux selon vos critères',
    id: 1,
    title: 'Recherchez',
  },
  {
    description: 'Prenez rendez-vous avec notre conseiller pour une visite personnalisée',
    id: 2,
    title: 'Contactez',
  },
  {
    description: 'Visitez les bureaux sélectionnés avec l\'accompagnement de notre expert',
    id: 3,
    title: 'Visitez',
  },
];

const scrollToFeatures = () => {
  featuresSection.value?.scrollIntoView({ behavior: 'smooth' });
};

const handleSearch = () => {
  const query = {
    q: searchQuery.value,
    type: selectedType.value,
  };

  navigateTo({
    path: '/search',
    query: Object.fromEntries(
      Object.entries(query).filter(([_, value]) => value && value !== ''),
    ),
  });
};
</script>

<style scoped></style>
