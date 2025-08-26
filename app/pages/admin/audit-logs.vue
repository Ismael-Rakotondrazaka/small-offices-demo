<template>
  <div class="px-4 py-8">
    <n-h1>
      Journaux d'audit
    </n-h1>

    <n-p>
      Surveillez toutes les actions et modifications de l'administrateur
    </n-p>

    <div class="mb-4">
      <n-flex align="center">
        <n-select
          v-model:value="actionEquals"
          placeholder="Filtrer par action"
          :options="actionOptions"
          clearable
          class="min-w-48"
        />

        <n-select
          v-model:value="targetTableEquals"
          placeholder="Filtrer par table"
          :options="tableOptions"
          clearable
          class="min-w-48"
        />

        <SearchDateRangeInput
          :max="createdAtLte"
          :min="createdAtGte"
          @update:range="onUpdateDateRangeHandler"
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
      <p>
        <span class="font-bold">
          {{ auditLogsData ? auditLogsData.pagination.totalCount : 0 }}
        </span>
        Résultats
      </p>
    </n-space>

    <n-data-table
      :columns="columns"
      :data="auditLogs"
      :loading="isLoading"
      :pagination="paginationProps"
      :row-key="rowKey"
      remote
      @update:page="handlePageChange"
      @update:page-size="handlePageSizeChange"
    />

    <n-modal
      v-model:show="showModal"
      preset="card"
      title="Détails du journal d'audit"
      style="max-width: 600px"
    >
      <div class="space-y-4">
        <div>
          <h3 class="text-lg font-semibold mb-2">
            Métadonnées
          </h3>
          <pre class="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">{{ modalContent }}</pre>
        </div>
      </div>
      <template #footer>
        <n-space justify="end">
          <n-button @click="showModal = false">
            Fermer
          </n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import type { DataTableColumns, PaginationProps } from 'naive-ui';

import { useRouteQuery } from '@vueuse/router';
import { Icon } from '#components';
import { NButton, NTag } from 'naive-ui';

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
});

defineOgImageComponent('OgImageAdmin', {
  pageTitle: 'Audit Logs',
});

const runtimeConfig = useRuntimeConfig();

useSeoMeta({
  author: 'Petits Bureaux',
  description: 'Journaux d\'audit - Administration Petits Bureaux',
  keywords: 'administration, audit logs, sécurité, traçabilité, back-office',
  ogDescription: 'Journaux d\'audit - Administration Petits Bureaux',
  ogLocale: 'fr_FR',
  ogSiteName: 'Petits Bureaux',
  ogTitle: 'Journaux d\'audit - Administration Petits Bureaux',
  ogType: 'website',
  ogUrl: () => `${runtimeConfig.public.appUrl}/admin/audit-logs`,
  robots: 'noindex, nofollow',
  title: 'Journaux d\'audit - Administration Petits Bureaux',
  twitterCard: 'summary_large_image',
  twitterCreator: () => runtimeConfig.public.appUrl,
  twitterDescription: 'Journaux d\'audit - Administration Petits Bureaux',
  twitterSite: () => runtimeConfig.public.appUrl,
  twitterTitle: 'Journaux d\'audit - Administration Petits Bureaux',
});

const actionEquals = useRouteQuery<null | string | string[] | undefined, string | undefined>('action[equals]',
  undefined,
  {
    transform: (value) => {
      if (value === null || value === undefined || Array.isArray(value)) return undefined;
      return value;
    },
  },
);

const targetTableEquals = useRouteQuery<null | string | string[] | undefined, string | undefined>('targetTable[equals]',
  undefined,
  {
    transform: (value) => {
      if (value === null || value === undefined || Array.isArray(value)) return undefined;
      return value;
    },
  },
);

const createdAtGte = useRouteQuery<null | string | string[] | undefined, number | undefined>(
  'createdAt[gte]',
  undefined,
  {
    transform: (value) => {
      if (value === null || value === undefined || Array.isArray(value)) return undefined;
      return Number(value);
    },
  },
);

const createdAtLte = useRouteQuery<null | string | string[] | undefined, number | undefined>(
  'createdAt[lte]',
  undefined,
  {
    transform: (value) => {
      if (value === null || value === undefined || Array.isArray(value)) return undefined;
      return Number(value);
    },
  },
);

const onUpdateDateRangeHandler = (min: number | undefined, max: number | undefined) => {
  createdAtGte.value = min;
  createdAtLte.value = max;
};

const page = useRouteQuery<null | string | string[] | undefined, number | undefined>('page', undefined, {
  transform: (value) => {
    if (value === null || value === undefined || Array.isArray(value)) return undefined;
    return Number(value);
  },
});

const pageSize = useRouteQuery<null | string | string[] | undefined, number | undefined>(
  'pageSize',
  undefined,
  {
    transform: (value) => {
      if (value === null || value === undefined || Array.isArray(value)) return undefined;
      return Number(value);
    },
  },
);

const actionOptions = [
  { label: 'Create', value: 'CREATE' },
  { label: 'Update', value: 'UPDATE' },
  { label: 'Delete', value: 'DELETE' },
];

const tableOptions = [
  { label: 'Office', value: 'Office' },
  { label: 'Lead', value: 'Lead' },
  { label: 'Service', value: 'Service' },
  { label: 'Photo', value: 'Photo' },
  { label: 'UserRole', value: 'UserRole' },
];

const computeRequestQuery = (): IndexAuditLogsRequestQuery => {
  let createdAtGteValue: string | undefined;
  let createdAtLteValue: string | undefined;

  if (createdAtGte.value !== undefined && createdAtLte.value !== undefined && createdAtGte.value === createdAtLte.value) {
    const range = getDayRange(createdAtGte.value);
    createdAtGteValue = new Date(range[0]).toISOString();
    createdAtLteValue = new Date(range[1]).toISOString();
  }
  else {
    createdAtGteValue = createdAtGte.value ? new Date(createdAtGte.value).toISOString() : undefined;
    createdAtLteValue = createdAtLte.value ? new Date(createdAtLte.value).toISOString() : undefined;
  }

  return {
    'action[equals]': actionEquals.value,
    'createdAt[gte]': createdAtGteValue,
    'createdAt[lte]': createdAtLteValue,
    'page': page.value || 1,
    'pageSize': pageSize.value || auditLogConfig.PAGE_SIZE_DEFAULT_VALUE,
    'targetTable[equals]': targetTableEquals.value,
  };
};

const requestQuery = computed<IndexAuditLogsRequestQuery>(computeRequestQuery);

const { data: auditLogsData, pending: isLoading } = await useFetch('/api/auditLogs', {
  query: requestQuery,
});

const auditLogs = computed(() => auditLogsData.value?.data || []);
const paginationData = computed(() => auditLogsData.value?.pagination || { count: 0, links: { current: '', first: '', last: '', next: null, previous: null }, page: 1, pageSize: auditLogConfig.PAGE_SIZE_DEFAULT_VALUE, totalCount: 0, totalPages: 0 });

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

const rowKey = (row: Serialize<AuditLogDTO>) => row.id;

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
  actionEquals.value = undefined;
  targetTableEquals.value = undefined;
  createdAtGte.value = undefined;
  createdAtLte.value = undefined;
  page.value = undefined;
  pageSize.value = undefined;
};

const columns = computed<DataTableColumns<Serialize<AuditLogDTO>>>(() => [
  {
    key: 'action',
    render: row => h(
      NTag,
      {
        size: 'small',
        type: row.action === 'CREATE' ? 'success' : row.action === 'UPDATE' ? 'warning' : 'error',
      },
      { default: () => row.action },
    ),
    sorter: false,
    title: 'Action',
    width: 100,
  },
  {
    key: 'targetTable',
    render: row => h('div', { class: 'font-medium' }, row.targetTable),
    sorter: false,
    title: 'Table',
    width: 120,
  },
  {
    key: 'targetId',
    render: row => h('div', { class: 'text-sm text-gray-600' }, row.targetId),
    sorter: false,
    title: 'Target ID',
    width: 200,
  },
  {
    key: 'actorId',
    render: row => h('div', { class: 'text-sm text-gray-600' }, row.actorId),
    sorter: false,
    title: 'Actor ID',
    width: 200,
  },
  {
    key: 'createdAt',
    render: row => formatDate(new Date(row.createdAt)),
    sorter: false,
    title: 'Date',
    width: 180,
  },
  {
    key: 'meta',
    render: (row) => {
      if (!row.meta) return h('div', { class: 'text-gray-400' }, '-');
      return h(
        NButton,
        {
          onClick: () => showMetaDetails(row.meta!),
          secondary: true,
          size: 'small',
          type: 'info',
        },
        {
          icon: () => h(Icon, { name: 'mdi:information' }),
        },
      );
    },
    sorter: false,
    title: 'Details',
    width: 100,
  },
]);

const showModal = ref(false);
const modalContent = ref('');

const showMetaDetails = (meta: Record<string, unknown>) => {
  modalContent.value = JSON.stringify(meta, null, 2);
  showModal.value = true;
};

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
