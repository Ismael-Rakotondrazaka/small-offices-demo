<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-6xl mx-auto">
      <!-- Search Header -->
      <div class="mb-8">
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Rechercher des bureaux
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Trouvez le bureau parfait selon vos besoins et votre budget
        </p>
      </div>

      <!-- Search Filters -->
      <n-card class="mb-8">
        <div class="grid md:grid-cols-4 gap-4">
          <n-input
            v-model:value="searchQuery"
            placeholder="Entrez une ville ou un arrondissement"
            size="large"
          >
            <template #prefix>
              <Icon name="mdi:map-marker" />
            </template>
          </n-input>

          <n-select
            v-model:value="selectedType"
            :options="officeTypes"
            placeholder="Type de bureau"
            size="large"
          />

          <n-select
            v-model:value="selectedPrice"
            :options="priceRanges"
            placeholder="Fourchette de prix"
            size="large"
          />

          <n-button
            type="primary"
            size="large"
            class="w-full"
            @click="performSearch"
          >
            Rechercher
          </n-button>
        </div>
      </n-card>

      <!-- Search Results -->
      <div
        v-if="isLoading"
        class="text-center py-12"
      >
        <n-spin size="large" />
        <p class="mt-4 text-gray-600 dark:text-gray-300">
          Recherche en cours...
        </p>
      </div>

      <div
        v-else-if="searchResults.length > 0"
        class="space-y-6"
      >
        <div class="flex justify-between items-center">
          <p class="text-gray-600 dark:text-gray-300">
            {{ searchResults.length }} bureau(x) trouvé(s)
          </p>
          <n-select
            v-model:value="sortBy"
            :options="sortOptions"
            placeholder="Trier par"
            size="small"
          />
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <n-card
            v-for="office in searchResults"
            :key="office.id"
            class="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            @click="navigateToOffice(office.slug)"
          >
            <div class="space-y-4">
              <div class="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                <img
                  v-if="office.photos && office.photos.length > 0"
                  :src="office.photos[0].url"
                  :alt="office.title"
                  class="w-full h-full object-cover"
                >
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center"
                >
                  <Icon
                    name="mdi:office-building"
                    class="text-4xl text-gray-400"
                  />
                </div>
              </div>

              <div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {{ office.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {{ office.description }}
                </p>

                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Icon name="mdi:map-marker" />
                    <span>{{ office.location }}</span>
                  </div>
                  <div class="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {{ formatPrice(office.price_cents) }}
                  </div>
                </div>
              </div>
            </div>
          </n-card>
        </div>
      </div>

      <div
        v-else-if="hasSearched"
        class="text-center py-12"
      >
        <Icon
          name="mdi:search-off"
          class="text-6xl text-gray-400 mx-auto mb-4"
        />
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Aucun résultat trouvé
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          Essayez de modifier vos critères de recherche ou élargissez votre zone géographique
        </p>
        <n-button
          type="primary"
          @click="resetSearch"
        >
          Modifier la recherche
        </n-button>
      </div>

      <div
        v-else
        class="text-center py-12"
      >
        <Icon
          name="mdi:map-search"
          class="text-6xl text-gray-400 mx-auto mb-4"
        />
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Commencez votre recherche
        </h3>
        <p class="text-gray-600 dark:text-gray-300">
          Utilisez les filtres ci-dessus pour trouver des bureaux qui correspondent à vos critères
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const searchQuery = ref(route.query.q as string || '');
const selectedType = ref<null | string>(route.query.type as string || null);
const selectedPrice = ref<null | string>(null);
const sortBy = ref<null | string>('relevance');
const isLoading = ref(false);
const hasSearched = ref(false);
const searchResults = ref<any[]>([]);

const officeTypes = [
  { label: 'Bureau privatif', value: 'private' },
  { label: 'Espace de coworking', value: 'coworking' },
  { label: 'Salle de réunion', value: 'meeting' },
  { label: 'Bureau partagé', value: 'shared' },
];

const priceRanges = [
  { label: 'Moins de 500€', value: '0-500' },
  { label: '500€ - 1000€', value: '500-1000' },
  { label: '1000€ - 2000€', value: '1000-2000' },
  { label: 'Plus de 2000€', value: '2000+' },
];

const sortOptions = [
  { label: 'Pertinence', value: 'relevance' },
  { label: 'Prix croissant', value: 'price_asc' },
  { label: 'Prix décroissant', value: 'price_desc' },
  { label: 'Distance', value: 'distance' },
];

const performSearch = async () => {
  isLoading.value = true;
  hasSearched.value = true;

  try {
    const query = {
      price: selectedPrice.value,
      q: searchQuery.value,
      sort: sortBy.value,
      type: selectedType.value,
    };

    const { data } = await useFetch('/api/offices', {
      query: Object.fromEntries(
        Object.entries(query).filter(([_, value]) => value && value !== ''),
      ),
    });

    searchResults.value = data.value?.data || [];
  }
  catch (error) {
    console.error('Search error:', error);
    searchResults.value = [];
  }
  finally {
    isLoading.value = false;
  }
};

const resetSearch = () => {
  searchQuery.value = '';
  selectedType.value = null;
  selectedPrice.value = null;
  sortBy.value = 'relevance';
  hasSearched.value = false;
  searchResults.value = [];
};

const navigateToOffice = (slug: string) => {
  navigateTo(`/offices/${slug}`);
};

const formatPrice = (priceCents: number) => {
  return new Intl.NumberFormat('fr-FR', {
    currency: 'EUR',
    style: 'currency',
  }).format(priceCents / 100);
};

watch([searchQuery, selectedType, selectedPrice, sortBy], () => {
  if (hasSearched.value) {
    performSearch();
  }
});

onMounted(() => {
  if (searchQuery.value || selectedType.value) {
    performSearch();
  }
});
</script>

<style>

</style>
