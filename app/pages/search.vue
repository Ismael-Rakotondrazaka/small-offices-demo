<template>
  <div class="container mx-auto py-2">
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
          secondary
          @click="resetSearch"
        >
          <template #icon>
            <Icon
              name="mdi:refresh"
            />
          </template>
        </n-button>

        <n-button
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
      </n-flex>

      <!-- Search Results -->
      <OfficePaginatedList
        v-if="data !== undefined"
        v-model:page="page"
        v-model:page-size="pageSize"
        :offices="data.data"
        :total-count="data.pagination.totalCount"
        :total-pages="data.pagination.totalPages"
        :is-loading="isLoading"
      />

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
const page = useRouteQuery<number>('page', 1);
const pageSize = useRouteQuery<number>('pageSize', officeConfig.PAGE_SIZE_DEFAULT_VALUE);
const orderByPrice = useRouteQuery<'asc' | 'desc' | undefined>('orderBy[price]', 'asc');

const query = computed<IndexOfficeRequestQuery>(() => ({
  'arr[equals]': arr.value.length === 1 ? arr.value[0] : undefined,
  'arr[in]': arr.value.length > 1 ? arr.value : undefined,
  'orderBy[price]': orderByPrice.value,
  'page': page.value,
  'pageSize': pageSize.value,
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

const resetSearch = async () => {
  arr.value = [];
  type.value = undefined;
  priceMin.value = undefined;
  priceMax.value = undefined;
  orderByPrice.value = 'asc';
};
</script>

<style scoped>

</style>
