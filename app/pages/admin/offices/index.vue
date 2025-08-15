<template>
  <div class="px-4 py-8">
    <n-h1>
      Gestion des Bureaux
    </n-h1>

    <n-p>
      Consultez et gérez les bureaux disponibles
    </n-p>

    <div class="mb-4">
      <n-input
        v-model:value="search"
        placeholder="Rechercher par titre..."
        class="mb-3"
        clearable
      >
        <template #prefix>
          <Icon name="mdi:magnify" />
        </template>
      </n-input>

      <n-flex align="center">
        <SearchOfficePriceRangeInput
          :max="priceLte"
          :min="priceGte"
          @update:range="onUpdatePriceRangeHandler"
        />

        <SearchOfficePostsRangeInput
          :max="postsLte"
          :min="postsGte"
          @update:range="onUpdatePostsRangeHandler"
        />

        <SearchOfficeArrInput
          :value="arr"
          @update:value="onUpdateArrHandler"
        />

        <SearchOfficeTypeInput
          :value="typeEquals"
          @update:value="onUpdateTypeHandler"
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
      </n-flex>
    </div>

    <n-space
      justify="space-between"
      align="center"
      class="mb-5"
    >
      <n-p>{{ officesData ? officesData.pagination.totalCount : 0 }} résultats</n-p>

      <n-select
        v-model:value="orderBy"
        :options="orderByOptions"
        :render-label="renderLabel"
        class="min-w-48"
      />
    </n-space>

    <n-data-table
      :columns="columns"
      :data="offices"
      :loading="isLoading"
      :pagination="paginationProps"
      :row-key="rowKey"
      remote
      @update:page="handlePageChange"
      @update:page-size="handlePageSizeChange"
    />
  </div>
</template>

<script lang="ts" setup>
import type { OfficeType } from '~~/shared/domains/offices/officeType';
import type { DataTableColumns, PaginationProps, SelectOption } from 'naive-ui';

import { useRouteQuery } from '@vueuse/router';
import { Icon } from '#components';
import { officeConfig } from '~~/shared/domains/offices/officeConfig';
import { OfficeTypeLabel } from '~~/shared/domains/offices/officeType';
import { NButton, NCarousel, NCarouselItem, NFlex, NPopover, NSelect, NTag } from 'naive-ui';
import { I18nN } from 'vue-i18n';

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
});

const OrderOption = {
  createdAtAsc: 'createdAtAsc',
  createdAtDesc: 'createdAtDesc',
  priceAsc: 'priceAsc',
  priceDesc: 'priceDesc',
  titleAsc: 'titleAsc',
  titleDesc: 'titleDesc',
} as const;
type OrderOption = (typeof OrderOption)[keyof typeof OrderOption];

const orderByOptions: SelectOption[] = [{
  label: 'Plus ancien',
  value: OrderOption.createdAtAsc,
},
{
  label: 'Plus récent',
  value: OrderOption.createdAtDesc,
},
{
  label: 'Titre A-Z',
  value: OrderOption.titleAsc,
},
{
  label: 'Titre Z-A',
  value: OrderOption.titleDesc,
},
{
  label: 'Moins cher',
  value: OrderOption.priceAsc,
}, {
  label: 'Plus cher',
  value: OrderOption.priceDesc,
}];

const renderLabel = (option: SelectOption) => {
  return h(
    'div',
    {
      style: {
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'nowrap',
        gap: '0.5rem',
      },
    },
    [
      h(Icon, {
        name: option.value && (
          [
            OrderOption.createdAtAsc,
            OrderOption.priceAsc,
            OrderOption.titleAsc,
          ] as string[])
          .includes(option.value as string)
          ? 'mdi:sort-ascending'
          : 'mdi:sort-descending',
        size: '1rem',
        style: {
          flex: 'none',
          height: '1.5rem',
          minHeight: '1.5rem',
          minWidth: '1.5rem',
          width: '1.5rem',
        },
      }),
      h(
        'div',
        {
          style: {
            padding: '4px 0',
          },
        },
        [
          h('div', null, [option.label as string]),
        ],
      ),
    ],
  );
};

const priceGte = useRouteQuery<null | string | string[] | undefined, IndexOfficeRequestQuery['price[gte]']>(
  'price[gte]',
  undefined,
  {
    transform: (value) => {
      if (value === null || value === undefined) return undefined;
      const num = Number(value);
      return num === 0 ? undefined : num;
    },
  },
);

const priceLte = useRouteQuery<null | string | string[] | undefined, IndexOfficeRequestQuery['price[lte]']>('price[lte]',
  undefined,
  {
    transform: (value) => {
      if (value === null || value === undefined) return undefined;
      const num = Number(value);
      return num >= 100_000 ? undefined : num;
    },
  },
);

const postsGte = useRouteQuery<null | string | string[] | undefined, IndexOfficeRequestQuery['posts[gte]']>(
  'posts[gte]',
  undefined,
  {
    transform: (value) => {
      if (value === null || value === undefined) return undefined;
      const num = Number(value);
      return num === 0 ? undefined : num;
    },
  },
);

const postsLte = useRouteQuery<null | string | string[] | undefined, IndexOfficeRequestQuery['posts[lte]']>('posts[lte]',
  undefined,
  {
    transform: (value) => {
      if (value === null || value === undefined) return undefined;
      const num = Number(value);
      return num >= 500 ? undefined : num;
    },
  },
);

const arr = useRouteQuery<null | string | string[] | undefined, number[]>('arr',
  [],
  {
    transform: (value) => {
      if (value === null || value === undefined) return [];
      if (Array.isArray(value)) {
        return value.map(v => Number(v)).filter(n => !Number.isNaN(n));
      }
      return [Number(value)].filter(n => !Number.isNaN(n));
    },
  },
);

const typeEquals = useRouteQuery<null | string | string[] | undefined, IndexOfficeRequestQuery['type[equals]']>('type[equals]',
  undefined,
  {
    transform: (value) => {
      if (value === null || value === undefined || Array.isArray(value)) return undefined;
      return value as IndexOfficeRequestQuery['type[equals]'];
    },
  },
);

const page = useRouteQuery<number | string | string[], number>('page', '1', {
  transform: (value) => {
    if (value === null || value === undefined) return 1;

    if (typeof value === 'number') {
      return value;
    }

    const parsedValue = parseInt(Array.isArray(value) ? value[0]! : value, 10);
    return Number.isNaN(parsedValue) ? 1 : parsedValue;
  },
});

const pageSize = useRouteQuery<null | string | string[] | undefined, number>(
  'pageSize',
  `${officeConfig.PAGE_SIZE_DEFAULT_VALUE}`,
  {
    transform: (value) => {
      if (value === null || value === undefined || Array.isArray(value)) return officeConfig.PAGE_SIZE_DEFAULT_VALUE;
      return Number(value);
    },
  },
);

const orderBy = useRouteQuery<null | string | string[] | undefined, OrderOption>('orderBy',
  undefined,
  {
    transform: (value) => {
      if (value === null || value === undefined || Array.isArray(value)) return OrderOption.createdAtAsc;
      return value as OrderOption;
    },
  },
);

const search = useRouteQuery<null | string | string[] | undefined, IndexOfficeRequestQuery['search']>('search',
  undefined,
  {
    transform: (value) => {
      if (value === null || value === undefined || Array.isArray(value)) return undefined;

      return value.length > 0 ? value : undefined;
    },
  },
);
const searchDebounced = debouncedRef(search, 1_500);

const orderByCreatedAt = computed(() => {
  if (orderBy.value === OrderOption.createdAtAsc) return 'asc';
  if (orderBy.value === OrderOption.createdAtDesc) return 'desc';
  return undefined;
});

const orderByPrice = computed(() => {
  if (orderBy.value === OrderOption.priceAsc) return 'asc';
  if (orderBy.value === OrderOption.priceDesc) return 'desc';
  return undefined;
});

const orderByTitle = computed(() => {
  if (orderBy.value === OrderOption.titleAsc) return 'asc';
  if (orderBy.value === OrderOption.titleDesc) return 'desc';
  return undefined;
});

const requestQuery = computed<IndexOfficeRequestQuery>(() => ({
  'arr[equals]': arr.value.length === 1 ? arr.value[0] : undefined,
  'arr[in]': arr.value.length > 1 ? arr.value : undefined,
  'orderBy[createdAt]': orderByCreatedAt.value,
  'orderBy[price]': orderByPrice.value,
  'orderBy[title]': orderByTitle.value,
  'page': page.value,
  'pageSize': pageSize.value,
  'posts[gte]': postsGte.value,
  'posts[lte]': postsLte.value,
  'price[gte]': priceGte.value,
  'price[lte]': priceLte.value,
  'search': searchDebounced.value || undefined,
  'type[equals]': typeEquals.value,
}));

const { data: officesData, pending: isLoading } = await useFetch('/api/offices', {
  query: requestQuery,
});

const onUpdatePriceRangeHandler = (min: number | undefined, max: number | undefined) => {
  priceGte.value = min;
  priceLte.value = max;
};

const onUpdatePostsRangeHandler = (min: number | undefined, max: number | undefined) => {
  postsGte.value = min;
  postsLte.value = max;
};

const onUpdateArrHandler = (value: number[]) => {
  arr.value = value;
};

const onUpdateTypeHandler = (value: OfficeType | undefined) => {
  typeEquals.value = value || undefined;
};

const offices = computed(() => officesData.value?.data || []);
const paginationData = computed(() => officesData.value?.pagination || { count: 0, links: { current: '', first: '', last: '', next: null, previous: null }, page: 1, pageSize: officeConfig.PAGE_SIZE_DEFAULT_VALUE, totalCount: 0, totalPages: 0 });

const paginationProps = computed<PaginationProps>(() => ({
  itemCount: paginationData.value.totalCount,
  onChange: (newValue: number) => {
    page.value = newValue;
  },
  onUpdatePageSize: (size: number) => {
    pageSize.value = size;
    page.value = 1;
  },
  page: paginationData.value.page,
  pageSize: paginationData.value.pageSize,
  pageSizes: generatePageSizes(paginationData.value.pageSize),
  showSizePicker: true,
}));

const rowKey = (row: Serialize<OfficeDTO>) => row.id;

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
};

const resetSearch = async () => {
  priceGte.value = undefined;
  priceLte.value = undefined;
  postsGte.value = undefined;
  postsLte.value = undefined;
  arr.value = [];
  typeEquals.value = undefined;
  search.value = undefined;
  page.value = 1;
  pageSize.value = officeConfig.PAGE_SIZE_DEFAULT_VALUE;
};

const columns = computed<DataTableColumns<Serialize<OfficeDTO>>>(() => [
  {
    key: 'title',
    render: row => h('div', { class: 'font-medium' }, row.title),
    sorter: false,
    title: 'Titre',
  },
  {
    key: 'slug',
    render: row => h('div', { class: 'text-sm text-gray-600' }, row.slug),
    sorter: false,
    title: 'Slug',
  },
  {
    key: 'type',
    render: row => h(
      NTag,
      {
        size: 'small',
        type: 'info',
      },
      { default: () => OfficeTypeLabel[row.type as OfficeType] },
    ),
    sorter: false,
    title: 'Type',
  },
  {
    key: 'arr',
    render: row => h('div', { class: 'font-medium' }, `Paris ${row.arr}`),
    sorter: false,
    title: 'Arrondissement',
  },
  {
    key: 'posts',
    render: row => h('div', { class: 'font-medium' }, `${row.posts} postes`),
    sorter: false,
    title: 'Postes',
  },
  {
    key: 'price',
    render: row => h(
      'div',
      { class: 'font-medium' },
      h(I18nN, {
        format: 'currency',
        scope: 'global',
        tag: 'span',
        value: row.price,
      }),
    ),
    sorter: false,
    title: 'Prix',
  },
  {
    key: 'isFake',
    render: row => h(
      NTag,
      {
        size: 'small',
        type: row.isFake ? 'warning' : 'success',
      },
      { default: () => row.isFake ? 'Fictif' : 'Réel' },
    ),
    sorter: false,
    title: 'Type',
  },
  {
    key: 'photos',
    render: row => h(
      NPopover,
      {
        placement: 'top',
        trigger: 'hover',
      },
      {
        default: () => h(
          NCarousel,
          {
            showArrow: true,
            showDots: true,
            style: {
              height: '12rem',
              maxWidth: '17rem',
            },
          },
          {
            default: () =>
              row.photos.map(photo => h(
                NCarouselItem,
                null,
                {
                  default: () => h(
                    'img',
                    {
                      alt: photo.alt ?? photo.id,
                      src: photo.url,
                      style: {
                        height: '12rem',
                        objectFit: 'cover',
                        width: '17rem',
                      },
                    },
                  ),
                },
              )),
          },
        ),
        trigger: () => h('div', { class: 'font-medium cursor-pointer hover:text-blue-600' }, `${row.photos.length} photo(s)`),
      },
    ),
    sorter: false,
    title: 'Photos',
  },
  {
    key: 'createdAt',
    render: row => formatDate(new Date(row.createdAt)),
    sorter: false,
    title: 'Date de création',
  },
  {
    key: 'actions',
    render: row => h(
      NFlex,
      {
        size: 'small',
        wrap: false,
      },
      {
        default: () => [
          h(
            NButton,
            {
              onClick: () => navigateTo({
                name: 'admin-offices-slug',
                params: {
                  slug: row.slug,
                },
              }),
              secondary: true,
              size: 'small',
              type: 'default',
            },
            {
              icon: () => h(Icon, { name: 'mdi:eye' }),
            },
          ),
          h(
            NButton,
            {
              onClick: () => navigateTo({
                name: 'admin-offices-slug-modifier',
                params: {
                  slug: row.slug,
                },
              }),
              secondary: true,
              size: 'small',
              type: 'primary',
            },
            {
              icon: () => h(Icon, { name: 'mdi:pencil' }),
            },
          ),
        ],
      },
    ),
    sorter: false,
    title: 'Actions',
  },
]);

const handlePageChange = (newValue: number) => {
  page.value = newValue;
};

const handlePageSizeChange = (size: number) => {
  pageSize.value = size;
  page.value = 1;
};
</script>

<style>

</style>
