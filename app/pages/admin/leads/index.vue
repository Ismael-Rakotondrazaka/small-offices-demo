<template>
  <div class="px-4 py-8">
    <n-h1>
      Gestion des Leads
    </n-h1>

    <n-p>
      Consultez et gérez les demandes de visite des clients
    </n-p>

    <div class="mb-4">
      <n-input
        v-model:value="search"
        placeholder="Rechercher par nom, email ou téléphone..."
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

        <n-select
          v-model:value="statusEquals"
          :options="statusOptions"
          placeholder="Filtrer par statut"
          class="!w-48"
          clearable
          @update-value="onUpdateStatusHandler"
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
      <n-p>{{ leadsData ? leadsData.pagination.totalCount : 0 }} résultats</n-p>

      <n-select
        v-model:value="orderBy"
        :options="orderByOptions"
        :render-label="renderLabel"
        class="min-w-48"
      />
    </n-space>

    <n-data-table
      :columns="columns"
      :data="leads"
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
import type { DataTableColumns, PaginationProps, SelectOption } from 'naive-ui';

import { useRouteQuery } from '@vueuse/router';
import { Icon } from '#components';
import { LeadStatus, LeadStatuses, LeadStatusLabel } from '~~/shared/domains/leads/leadStatus';
import { NFlex, NSelect, NTag } from 'naive-ui';

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
});

const OrderOption = {
  createdAtAsc: 'createdAtAsc',
  createdAtDesc: 'createdAtDesc',
  priceAsc: 'priceAsc',
  priceDesc: 'priceDesc',
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

const statusEquals = useRouteQuery<null | string | string[] | undefined, IndexLeadRequestQuery['status[equals]']>('status[equals]',
  undefined,
  {
    transform: (value) => {
      if (value === null || value === undefined || Array.isArray(value)) return undefined;
      return value as IndexLeadRequestQuery['status[equals]'];
    },
  },
);

const priceGte = useRouteQuery<null | string | string[] | undefined, IndexLeadRequestQuery['price[gte]']>(
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

const priceLte = useRouteQuery<null | string | string[] | undefined, IndexLeadRequestQuery['price[lte]']>('price[lte]',
  undefined,
  {
    transform: (value) => {
      if (value === null || value === undefined) return undefined;
      const num = Number(value);
      return num >= 100_000 ? undefined : num;
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
  `${leadConfig.PAGE_SIZE_DEFAULT_VALUE}`,
  {
    transform: (value) => {
      if (value === null || value === undefined || Array.isArray(value)) return leadConfig.PAGE_SIZE_DEFAULT_VALUE;
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

/* const sortOrder = useRouteQuery<null | string | string[] | undefined, 'asc' | 'desc'>('sortOrder',
  'desc',
  {
    transform: (value) => {
      if (value === null || value === undefined || Array.isArray(value)) return 'desc';
      return value as 'asc' | 'desc';
    },
  },
); */

const search = useRouteQuery<null | string | string[] | undefined, IndexLeadRequestQuery['search']>('search',
  undefined,
  {
    transform: (value) => {
      if (value === null || value === undefined || Array.isArray(value)) return undefined;

      return value.length > 0 ? value : undefined;
    },
  },
);
const searchDebounced = debouncedRef(search, 1_500);

const statusOptions = LeadStatuses.map(status => ({
  label: LeadStatusLabel[status],
  value: status,
}));

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

const requestQuery = computed<IndexLeadRequestQuery>(() => ({
  'orderBy[createdAt]': orderByCreatedAt.value,
  'orderBy[price]': orderByPrice.value,
  'page': page.value,
  'pageSize': pageSize.value,
  'price[gte]': priceGte.value,
  'price[lte]': priceLte.value,
  'search': searchDebounced.value || undefined,
  'status[equals]': statusEquals.value,
}));

const { data: leadsData, pending: isLoading, refresh } = await useFetch('/api/leads', {
  query: requestQuery,
});

const onUpdatePriceRangeHandler = (min: number | undefined, max: number | undefined) => {
  priceGte.value = min;
  priceLte.value = max;
};

const leads = computed(() => leadsData.value?.data || []);
const paginationData = computed(() => leadsData.value?.pagination || { count: 0, links: { current: '', first: '', last: '', next: null, previous: null }, page: 1, pageSize: leadConfig.PAGE_SIZE_DEFAULT_VALUE, totalCount: 0, totalPages: 0 });

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

const rowKey = (row: Serialize<LeadDTO>) => row.id;

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
};

const getStatusTagType = (status: LeadStatus) => {
  switch (status) {
    case LeadStatus.CONTACTED:
      return 'info';
    case LeadStatus.CONVERTED:
      return 'success';
    case LeadStatus.LOST:
      return 'error';
    case LeadStatus.PENDING:
      return 'warning';
    default:
      return 'default';
  }
};

const message = useMessage();

const handleStatusChange = async (lead: Serialize<LeadDTO>, newStatus: LeadStatus) => {
  if (lead.status === newStatus) {
    return;
  }

  try {
    const body: UpdateLeadRequestBody = {
      status: newStatus,
    };

    await $fetch(`/api/leads/${lead.id}`, {
      body,
      method: 'PUT',
    });

    await refresh();

    message.success('Statut mis à jour avec succès');
  }
  catch {
    message.error('Erreur lors de la mise à jour du statut');
  }
};

const onUpdateStatusHandler = (value: LeadStatus | null) => {
  statusEquals.value = value || undefined;
};

const resetSearch = async () => {
  priceGte.value = undefined;
  priceLte.value = undefined;
  statusEquals.value = undefined;
  search.value = undefined;
  page.value = 1;
  pageSize.value = leadConfig.PAGE_SIZE_DEFAULT_VALUE;
};

const columns = computed<DataTableColumns<Serialize<LeadDTO>>>(() => [
  {
    key: 'name',
    render: row => h('div', { class: 'font-medium' }, row.name),
    sorter: false,
    title: 'Nom',
  },
  {
    key: 'email',
    render: row => h('a', { class: 'text-blue-600 hover:underline', href: `mailto:${row.email}` }, row.email),
    sorter: false,
    title: 'Email',
  },
  {
    key: 'phone',
    render: row => row.phone ? h('a', { class: 'text-blue-600 hover:underline', href: `tel:${row.phone}` }, row.phone) : '-',
    sorter: false,
    title: 'Téléphone',
  },
  {
    key: 'status',
    render: row => h(
      NTag,
      {
        size: 'small',
        type: getStatusTagType(row.status),
      },
      { default: () => LeadStatusLabel[row.status] },
    ),
    sorter: false,
    title: 'Statut',
  },
  {
    key: 'createdAt',
    render: row => formatDate(new Date(row.createdAt)),
    sorter: false,
    title: 'Date',
  },
  {
    key: 'actions',
    render: row => h(
      NFlex,
      { gap: 'small' },
      {
        default: () => [
          h(
            NSelect,
            {
              onUpdateValue: (value: LeadStatus) => handleStatusChange(row, value),
              options: LeadStatuses.map(status => ({
                label: LeadStatusLabel[status],
                value: status,
              })),
              value: row.status,
            },
            { default: () => 'Modifier' },
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
