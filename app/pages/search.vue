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

        <SearchOfficePostsRangeInput
          v-model:max="postsLte"
          v-model:min="postsGte"
        />

        <SearchOfficeTypeInput
          v-model:value="type"
        />

        <SearchOfficePriceRangeInput
          v-model:max="priceLte"
          v-model:min="priceGte"
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
const type = useRouteQuery<null | string | string[] | undefined, OfficeType | undefined>('type[equals]', undefined, {
  transform: (value) => {
    if (value === null || value === undefined) {
      return undefined;
    }

    return value as OfficeType;
  },
});
const priceGte = useRouteQuery<null | string | string[] | undefined, number | undefined>('price[gte]', undefined, {
  transform: (value) => {
    if (value === null || value === undefined) {
      return undefined;
    }

    const num = Number(value);

    return num === 0 ? undefined : num;
  },
});
const priceLte = useRouteQuery<null | string | string[] | undefined, number | undefined>('price[lte]', undefined, {
  transform: (value) => {
    if (value === null || value === undefined) {
      return undefined;
    }

    const num = Number(value);

    return num >= 100_000 ? undefined : num;
  },
});
const postsGte = useRouteQuery<null | string | string[] | undefined, number | undefined>('posts[gte]', undefined, {
  transform: (value) => {
    if (value === null || value === undefined) {
      return undefined;
    }

    const num = Number(value);

    return num === 0 ? undefined : num;
  },
});
const postsLte = useRouteQuery<null | string | string[] | undefined, number | undefined>('posts[lte]', undefined, {
  transform: (value) => {
    if (value === null || value === undefined) {
      return undefined;
    }

    const num = Number(value);

    return num >= 500 ? undefined : num;
  },
});
const page = useRouteQuery<number>('page', 1);
const pageSize = useRouteQuery<number>('pageSize', officeConfig.PAGE_SIZE_DEFAULT_VALUE);
const orderByPrice = useRouteQuery<null | string | string[] | undefined, 'asc' | 'desc' | undefined>('orderBy[price]', 'asc', {
  transform: (value) => {
    if (value === null || value === undefined) {
      return undefined;
    }

    return value as 'asc' | 'desc';
  },
});

const query = computed<IndexOfficeRequestQuery>(() => ({
  'arr[equals]': arr.value.length === 1 ? arr.value[0] : undefined,
  'arr[in]': arr.value.length > 1 ? arr.value : undefined,
  'orderBy[price]': orderByPrice.value,
  'page': page.value,
  'pageSize': pageSize.value,
  'posts[gte]': postsGte.value,
  'posts[lte]': postsLte.value,
  'price[gte]': priceGte.value,
  'price[lte]': priceLte.value,
  'type[equals]': type.value,
}));
const queryDebounced = refDebounced(query, 1000);

const toggleSortByPrice = async () => {
  orderByPrice.value = orderByPrice.value === 'asc' ? 'desc' : 'asc';
};

const { data, status }: Awaited<RequestToAsyncData<IndexOfficeRequest>> = useFetch('/api/offices', {
  query: queryDebounced,
});

const isLoading = useFetchLoading(status);

const resetSearch = async () => {
  arr.value = [];
  type.value = undefined;
  priceGte.value = undefined;
  priceLte.value = undefined;
  postsGte.value = undefined;
  postsLte.value = undefined;
  orderByPrice.value = 'asc';
};
</script>

<style scoped>

</style>
