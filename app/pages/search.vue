<template>
  <main class="h-[calc(100vh-64px)]">
    <div class="relative h-full">
      <div class="flex h-full">
        <div
          class="w-full lg:w-1/2 lg:max-w-[600px] flex flex-col"
          :class="{ hidden: isMobile && !showList }"
        >
          <div class="flex-shrink-0 p-4 border-b border-gray-200">
            <n-flex
              class="flex-wrap gap-2"
            >
              <SearchOfficeArrInput
                :value="arr"
                @update:value="onUpdateArrHandler"
              />
              <SearchOfficePostsRangeInput
                :max="postsLte"
                :min="postsGte"
                @update:range="onUpdatePostsRangeHandler"
              />
              <SearchOfficeTypeInput
                :value="type"
                @update:value="onUpdateTypeHandler"
              />
              <SearchOfficePriceRangeInput
                :max="priceLte"
                :min="priceGte"
                @update:range="onUpdatePriceRangeHandler"
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
          </div>
          <div class="flex-1 overflow-y-auto p-4">
            <OfficePaginatedList
              v-if="data !== undefined"
              :page="page"
              :page-size="pageSize"
              :offices="data.data"
              :total-count="data.pagination.totalCount"
              :total-pages="data.pagination.totalPages"
              :is-loading="isLoading"
              @update:page="onUpdatePageHandler"
              @update:page-size="onUpdatePageSizeHandler"
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
        <div
          class="w-full lg:w-1/2 flex-1"
          :class="{ hidden: isMobile && showList }"
        >
          <SearchMap :offices="data ? data.data : []" />
        </div>
      </div>
    </div>

    <n-button
      v-if="isMobile"
      type="primary"
      size="large"
      class="fixed mr-4 z-50 shadow-lg"
      @click="toggleView"
    >
      <template #icon>
        <Icon
          :name="showList ? 'mdi:map' : 'mdi:format-list-bulleted'"
        />
      </template>
      {{ showList ? 'Voir la carte' : 'Voir la liste' }}
    </n-button>
  </main>
</template>

<script lang="ts" setup>
import type { OfficeType } from '#imports';

definePageMeta({
  layout: 'map',
});

interface Props {
  propsQuery?: {
    arr?: number[];
  } & IndexOfficeRequestQuery;
}

const props = defineProps<Props>();

const route = useRoute('search');

const isMobile = ref(false);
const showList = ref(true);

const updateMobileState = () => {
  isMobile.value = window.innerWidth < 1024;
};

const toggleView = () => {
  showList.value = !showList.value;
};

onMounted(() => {
  updateMobileState();
  window.addEventListener('resize', updateMobileState);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateMobileState);
});

const arr = computed<number[]>(() => {
  if (props.propsQuery?.['arr'] !== undefined) return props.propsQuery['arr'] ?? [];
  const value = route.query.arr;
  if (value === null || value === undefined) return [];
  if (Array.isArray(value)) return value.map(Number);
  return [Number(value)];
});

const type = computed<IndexOfficeRequestQuery['type[equals]']>(() => {
  if (props.propsQuery?.['type[equals]'] !== undefined) return props.propsQuery['type[equals]'];
  const value = route.query['type[equals]'];
  if (value === null || value === undefined) return undefined;
  return value as OfficeType;
});

const priceGte = computed<IndexOfficeRequestQuery['price[gte]']>(() => {
  if (props.propsQuery?.['price[gte]'] !== undefined) return props.propsQuery['price[gte]'];
  const value = route.query['price[gte]'];
  if (value === null || value === undefined) return undefined;
  const num = Number(value);
  return num === 0 ? undefined : num;
});

const priceLte = computed<IndexOfficeRequestQuery['price[lte]']>(() => {
  if (props.propsQuery?.['price[lte]'] !== undefined) return props.propsQuery['price[lte]'];
  const value = route.query['price[lte]'];
  if (value === null || value === undefined) return undefined;
  const num = Number(value);
  return num >= 100_000 ? undefined : num;
});

const postsGte = computed<IndexOfficeRequestQuery['posts[gte]']>(() => {
  if (props.propsQuery?.['posts[gte]'] !== undefined) return props.propsQuery['posts[gte]'];
  const value = route.query['posts[gte]'];
  if (value === null || value === undefined) return undefined;
  const num = Number(value);
  return num === 0 ? undefined : num;
});

const postsLte = computed<IndexOfficeRequestQuery['posts[lte]']>(() => {
  if (props.propsQuery?.['posts[lte]'] !== undefined) return props.propsQuery['posts[lte]'];
  const value = route.query['posts[lte]'];
  if (value === null || value === undefined) return undefined;
  const num = Number(value);
  return num >= 500 ? undefined : num;
});

const page = computed<number>(() => {
  if (props.propsQuery?.page !== undefined) return props.propsQuery.page;
  const value = route.query.page;
  if (value === null || value === undefined) return 1;
  return Number(value);
});

const pageSize = computed<number>(() => {
  if (props.propsQuery?.pageSize !== undefined) return props.propsQuery.pageSize;
  const value = route.query.pageSize;
  if (value === null || value === undefined) return officeConfig.PAGE_SIZE_DEFAULT_VALUE;
  return Number(value);
});

const orderByPrice = computed<IndexOfficeRequestQuery['orderBy[price]']>(() => {
  if (props.propsQuery?.['orderBy[price]'] !== undefined) return props.propsQuery['orderBy[price]'];
  const value = route.query['orderBy[price]'];
  if (value === null || value === undefined) return undefined;
  return value === 'asc' || value === 'desc' ? value : undefined;
});

const query = computed<Props['propsQuery']>(() => ({
  'arr': arr.value.length ? arr.value : undefined,
  'orderBy[price]': orderByPrice.value,
  'page': page.value,
  'pageSize': pageSize.value,
  'posts[gte]': postsGte.value,
  'posts[lte]': postsLte.value,
  'price[gte]': priceGte.value,
  'price[lte]': priceLte.value,
  'type[equals]': type.value,
}));

const requestQuery = computed<IndexOfficeRequestQuery>(() => ({
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

const onUpdateArrHandler = (value: number[]) => {
  return navigateTo({
    name: 'search',
    query: {
      ...query.value,
      arr: value.length ? value : undefined,
      page: 1,
      pageSize: officeConfig.PAGE_SIZE_DEFAULT_VALUE,
    },
  });
};

const onUpdateTypeHandler = (value: OfficeType | undefined) => {
  return navigateTo({
    name: 'search',
    query: {
      ...query.value,
      'page': 1,
      'pageSize': officeConfig.PAGE_SIZE_DEFAULT_VALUE,
      'type[equals]': value,
    },
  });
};

const onUpdatePriceRangeHandler = (min: number | undefined, max: number | undefined) => {
  return navigateTo({
    name: 'search',
    query: {
      ...query.value,
      'page': 1,
      'pageSize': officeConfig.PAGE_SIZE_DEFAULT_VALUE,
      'price[gte]': min,
      'price[lte]': max,
    },
  });
};

const onUpdatePostsRangeHandler = (min: number | undefined, max: number | undefined) => {
  return navigateTo({
    name: 'search',
    query: {
      ...query.value,
      'page': 1,
      'pageSize': officeConfig.PAGE_SIZE_DEFAULT_VALUE,
      'posts[gte]': min,
      'posts[lte]': max,
    },
  });
};

const toggleSortByPrice = async () => {
  return navigateTo({
    name: 'search',
    query: {
      ...query.value,
      'orderBy[price]': orderByPrice.value === 'asc' ? 'desc' : 'asc',
    },
  });
};

const onUpdatePageHandler = (value: number) => {
  return navigateTo({
    name: 'search',
    query: {
      ...query.value,
      page: value,
    },
  });
};

const onUpdatePageSizeHandler = (value: number) => {
  return navigateTo({
    name: 'search',
    query: {
      ...query.value,
      pageSize: value,
    },
  });
};

const { data, status }: Awaited<RequestToAsyncData<IndexOfficeRequest>> = useFetch('/api/offices', {
  query: requestQuery,
});

const isLoading = useFetchLoading(status);

const resetSearch = async () => {
  return navigateTo({
    name: 'search',
  });
};

defineOgImageComponent('OgImageSearch');

const runtimeConfig = useRuntimeConfig();

useSeoMeta({
  author: 'Petits Bureaux',
  description: 'Recherchez et trouvez le bureau idéal pour votre entreprise. Accédez à tous les bureaux du marché. Votre conseiller vous accompagne en visite et vous aide à négocier. Le tout gratuitement.',
  keywords: 'recherche bureaux, location bureaux Paris, coworking, immobilier d\'entreprise, conseiller immobilier',
  ogDescription: 'Recherchez et trouvez le bureau idéal pour votre entreprise. Accédez à tous les bureaux du marché. Votre conseiller vous accompagne en visite et vous aide à négocier. Le tout gratuitement.',
  ogLocale: 'fr_FR',
  ogSiteName: 'Petits Bureaux',
  ogTitle: 'Recherche de bureaux - Petits Bureaux',
  ogType: 'website',
  ogUrl: () => `${runtimeConfig.public.appUrl}/search`,
  title: 'Recherche de bureaux - Petits Bureaux',
  twitterCard: 'summary_large_image',
  twitterCreator: () => runtimeConfig.public.appUrl,
  twitterDescription: 'Recherchez et trouvez le bureau idéal pour votre entreprise. Accédez à tous les bureaux du marché. Votre conseiller vous accompagne en visite et vous aide à négocier. Le tout gratuitement.',
  twitterSite: () => runtimeConfig.public.appUrl,
  twitterTitle: 'Recherche de bureaux - Petits Bureaux',
});
</script>

<style scoped>

</style>
