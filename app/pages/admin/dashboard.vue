<template>
  <div class="px-4 py-8">
    <n-h1>
      Dashboard
    </n-h1>

    <n-grid
      cols="4"
      responsive="screen"
      item-responsive
      x-gap="8"
      y-gap="8"
      class="mb-5"
    >
      <n-grid-item span="4 m:2 l:1 xl:1 2xl:1">
        <n-card title="Bureaux">
          <template #header-extra>
            <Icon
              name="mdi:office-building"
              size="1.5rem"
            />
          </template>
          <n-statistic>
            {{ totalOffices }}
          </n-statistic>
        </n-card>
      </n-grid-item>

      <n-grid-item span="4 m:2 l:1 xl:1 2xl:1">
        <n-card title="Leads Totals">
          <template #header-extra>
            <Icon
              name="mdi:account-group"
              size="1.5rem"
            />
          </template>
          <n-statistic>
            {{ totalLeads }}
          </n-statistic>
        </n-card>
      </n-grid-item>

      <n-grid-item span="4 m:2 l:1 xl:1 2xl:1">
        <n-card title="Leads en attente">
          <template #header-extra>
            <Icon
              name="mdi:clock-outline"
              size="1.5rem"
            />
          </template>
          <n-statistic>
            {{ pendingLeads }}
          </n-statistic>
        </n-card>
      </n-grid-item>

      <n-grid-item span="4 m:2 l:1 xl:1 2xl:1">
        <n-card title="Taux de conversion">
          <template #header-extra>
            <Icon
              name="mdi:trending-up"
              size="1.5rem"
            />
          </template>
          <n-statistic>
            {{ conversionRate }}%
          </n-statistic>
        </n-card>
      </n-grid-item>
    </n-grid>

    <n-card title="Actions rapides">
      <NuxtLink
        :to="{
          name: 'admin-offices-nouveau',
        }"
      >
        <n-button
          type="primary"
          size="large"
          tag="span"
        >
          <template #icon>
            <Icon
              name="mdi:office-building-plus"
              class="h-6 w-6"
            />
          </template>
          Nouveau Bureau
        </n-button>
      </NuxtLink>
    </n-card>

    <n-h2>
      Recent Leads
    </n-h2>

    <n-data-table
      :columns="columns"
      :data="leads"
      :loading="isLoading"
      :pagination="false"
      :row-key="rowKey"
      remote
    />
  </div>
</template>

<script lang="ts" setup>
import type { DataTableColumns } from 'naive-ui';

import { Icon, NuxtLink } from '#components';
import { LeadStatus, LeadStatuses, LeadStatusLabel } from '~~/shared/domains/leads/leadStatus';
import { NCard, NFlex, NImage, NPopover, NSelect, NTag } from 'naive-ui';
import { I18nN } from 'vue-i18n';

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
});

defineOgImageComponent('OgImageAdmin', {
  pageTitle: 'Tableau de bord',
});

useSeoMeta({
  author: 'Petits Bureaux',
  description: 'Tableau de bord d\'administration - Gestion des bureaux et des leads Petits Bureaux',
  keywords: 'administration, tableau de bord, gestion bureaux, gestion leads, back-office',
  ogDescription: 'Tableau de bord d\'administration - Gestion des bureaux et des leads Petits Bureaux',
  ogLocale: 'fr_FR',
  ogSiteName: 'Petits Bureaux',
  ogTitle: 'Tableau de bord - Administration Petits Bureaux',
  ogType: 'website',
  ogUrl: () => `${runtimeConfig.public.appUrl}/admin/dashboard`,
  robots: 'noindex, nofollow',
  title: 'Tableau de bord - Administration Petits Bureaux',
  twitterCard: 'summary_large_image',
  twitterCreator: () => runtimeConfig.public.appUrl,
  twitterDescription: 'Tableau de bord d\'administration - Gestion des bureaux et des leads Petits Bureaux',
  twitterSite: () => runtimeConfig.public.appUrl,
  twitterTitle: 'Tableau de bord - Administration Petits Bureaux',
});

const { data: pendingLeads } = await useFetch('/api/leads/count', {
  query: {
    'status[equals]': 'PENDING',
  },
});

const { data: convertedLeads } = await useFetch('/api/leads/count', {
  query: {
    'status[equals]': 'CONVERTED',
  },
});

const { data: totalLeads } = await useFetch('/api/leads/count');
const { data: totalOffices } = await useFetch('/api/offices/count');

const conversionRate = computed(() => {
  if (!totalLeads.value || !convertedLeads.value || totalLeads.value === 0) {
    return 0;
  }
  return Math.round((convertedLeads.value / totalLeads.value) * 100);
});

const requestQuery: IndexLeadRequestQuery = {
  'orderBy[createdAt]': 'desc',
  'page': 1,
  'pageSize': 10,
};

const { data: recentLeadsData, pending: isLoading, refresh } = await useFetch('/api/leads', {
  query: requestQuery,
});
const leads = computed<Serialize<LeadDTO>[]>(() => recentLeadsData.value?.data ?? []);

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

    await $fetch<Serialize<UpdateLeadRequestData>>(`/api/leads/${lead.id}`, {
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
    key: 'office',
    render: row => h(
      NPopover,
      {
        placement: 'top',
        trigger: 'hover',
      },
      {
        default: () => h(
          NCard,
          {
            bordered: false,
            size: 'small',
            style: {
              maxWidth: '300px',
            },
          },
          {
            default: () => [
              row.office.photos.length > 0
                ? h(
                    NuxtLink,
                    {
                      to: {
                        name: 'admin-offices-slug',
                        params: {
                          slug: row.office.slug,
                        },
                      },
                    },
                    {
                      default: () => [
                        h(
                          NImage,
                          {
                            alt: row.office.title,
                            class: 'rounded mb-2',
                            height: '120px',
                            objectFit: 'cover',
                            previewDisabled: true,
                            src: row.office.photos[0]!.url,
                            width: '100%',
                          },
                        ),
                        h('div', { class: 'sr-only' }, { default: () => row.office.title }),
                      ],
                    },
                  )
                : null,
              h('div', { class: 'font-medium mb-1' }, row.office.title),
              h('div', { class: 'text-sm text-gray-600 mb-1' }, `Paris ${row.office.arr}`),
              h('div', { class: 'text-sm text-gray-600' }, `${row.office.posts} postes`),
            ],
          },
        ),
        trigger: () => h('div', { class: 'font-medium cursor-pointer hover:text-blue-600' }, row.office.title),
      },
    ),
    sorter: false,
    title: 'Bureaux',
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
        value: row.office.price,
      }),
    ),
    sorter: false,
    title: 'Prix',
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

const runtimeConfig = useRuntimeConfig();

useSeoMeta({
  author: 'Petits Bureaux',
  description: 'Tableau de bord d\'administration - Gestion des bureaux et des leads Petits Bureaux',
  keywords: 'administration, tableau de bord, gestion bureaux, gestion leads, back-office',
  ogDescription: 'Tableau de bord d\'administration - Gestion des bureaux et des leads Petits Bureaux',
  ogLocale: 'fr_FR',
  ogSiteName: 'Petits Bureaux',
  ogTitle: 'Tableau de bord - Administration Petits Bureaux',
  ogType: 'website',
  ogUrl: () => `${runtimeConfig.public.appUrl}/admin/dashboard`,
  robots: 'noindex, nofollow',
  title: 'Tableau de bord - Administration Petits Bureaux',
  twitterCard: 'summary_large_image',
  twitterCreator: () => runtimeConfig.public.appUrl,
  twitterDescription: 'Tableau de bord d\'administration - Gestion des bureaux et des leads Petits Bureaux',
  twitterSite: () => runtimeConfig.public.appUrl,
  twitterTitle: 'Tableau de bord - Administration Petits Bureaux',
});
</script>
