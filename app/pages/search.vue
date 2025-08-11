<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-6xl mx-auto">
      <!-- Search Filters -->
      <n-flex
        class="mb-5"
      >
        <SearchOfficeArrInput
          v-model:value="arr"
        />

        <SearchOfficeTypeInput
          v-model:value="type"
        />

        <SearchOfficePriceRangeInput
          v-model:max="priceMax"
          v-model:min="priceMin"
        />

        <n-button
          type="primary"

          @click="performSearch"
        >
          <template #icon>
            <Icon
              name="mdi:magnify"
            />
          </template>
          Rechercher
        </n-button>

        <n-button
          type="primary"
          secondary
          @click="resetSearch"
        >
          <template #icon>
            <Icon
              name="mdi:refresh"
            />
          </template>
        </n-button>
      </n-flex>

      <!-- Search Results -->
      <n-spin :show="isLoading">
        <div
          v-if="data !== undefined"
          class="space-y-6"
        >
          <div class="flex justify-between items-center">
            <p class="text-gray-600 dark:text-gray-300">
              {{ data.data.length }} bureau(x) trouvé(s)
            </p>
            <n-button
              size="small"
              @click="toggleSortByPrice"
            >
              <template #icon>
                <Icon
                  v-if="orderByPrice === 'asc'"
                  name="mdi:sort-ascending"
                />
                <Icon
                  v-else
                  name="mdi:sort-descending"
                />
              </template>
            </n-button>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <n-card
              v-for="office in data.data"
              :key="office.id"
              class="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              @click="navigateToOffice(office.slug)"
            >
              <div class="space-y-4">
                <div class="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    v-if="Array.isArray(office.photos) && office.photos.length > 0 && office.photos[0]?.url"
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
                      <span>
                        {{ office.arr ? `Paris ${office.arr}` : 'Paris' }}
                      </span>
                    </div>
                    <div class="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {{ formatPrice(office.price) }}
                    </div>
                  </div>
                </div>
              </div>
            </n-card>
          </div>
        </div>

        <div
          v-else-if="data === undefined"
          class="text-center"
        >
          <n-empty
            size="huge"
            description="Aucun bureau trouvé"
            class="mb-5"
          />

          <n-button
            type="primary"
            @click="resetSearch"
          >
            Modifier la recherche
          </n-button>
        </div>
      </n-spin>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { OfficeType } from '~~/shared/domains';

import { useRouteQuery } from '@vueuse/router';

const arr = useRouteQuery<null | string | string[] | undefined, number[]>('arr', [], {
  transform: (value) => {
    if (value === null || value === undefined) {
      return [];
    }

    if (Array.isArray(value)) {
      return value.map(Number);
    }

    return [Number(value)];
  },
});
const type = useRouteQuery<OfficeType | undefined>('type[equals]');
const priceMin = useRouteQuery<number | undefined>('price[gte]');
const priceMax = useRouteQuery<number | undefined>('price[lte]');
const orderByPrice = useRouteQuery<'asc' | 'desc' | undefined>('orderBy[price]', 'asc');

const query = computed<IndexOfficeRequestQuery>(() => ({
  'arr[equals]': arr.value.length > 0 ? arr.value[0] : undefined,
  'arr[in]': arr.value.length > 0 ? arr.value : undefined,
  'orderBy[price]': orderByPrice.value,
  'page': 1,
  'pageSize': 20,
  'price[gte]': priceMin.value,
  'price[lte]': priceMax.value,
  'type[equals]': type.value,
}));

const toggleSortByPrice = async () => {
  orderByPrice.value = orderByPrice.value === 'asc' ? 'desc' : 'asc';
  await execute();
};

const { data, execute, status }: Awaited<RequestToAsyncData<IndexOfficeRequest>> = useFetch('/api/offices', {
  query,
});

const isLoading = useFetchLoading(status);

const performSearch = async () => {
  navigateTo({
    query: {
      ...query.value,
      arr: arr.value.length > 0 ? arr.value[0] : undefined,
      arrIn: arr.value.length > 0 ? arr.value : undefined,
    },
  });

  await execute();
};

const resetSearch = async () => {
  arr.value = [];
  type.value = undefined;
  priceMin.value = undefined;
  priceMax.value = undefined;
  orderByPrice.value = 'asc';

  await performSearch();
};

const navigateToOffice = (slug: string) => {
  navigateTo(`/offices/${slug}`);
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    currency: 'EUR',
    style: 'currency',
  }).format(price);
};
</script>

<style>

</style>
