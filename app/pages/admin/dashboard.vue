<template>
  <div class="mx-auto w-full max-w-7xl p-6">
    <div class="mb-8">
      <n-h1 class="mb-2">
        <i18n-t
          keypath="admin.dashboard.title"
          tag="span"
          scope="global"
        />
      </n-h1>
      <n-text
        depth="3"
        class="text-lg"
      >
        <i18n-t
          keypath="admin.dashboard.subtitle"
          tag="span"
          scope="global"
        />
      </n-text>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <n-card>
        <div class="flex items-center justify-between">
          <div>
            <n-text
              depth="3"
              class="text-sm"
            >
              <i18n-t
                keypath="admin.dashboard.metrics.totalOffices"
                tag="span"
                scope="global"
              />
            </n-text>
            <n-h2 class="mt-1 text-3xl font-bold">
              {{ metrics.totalOffices }}
            </n-h2>
          </div>
          <div class="rounded-full bg-blue-100 p-3">
            <Icon
              name="mdi:office-building"
              class="h-6 w-6 text-blue-600"
            />
          </div>
        </div>
      </n-card>

      <n-card>
        <div class="flex items-center justify-between">
          <div>
            <n-text
              depth="3"
              class="text-sm"
            >
              <i18n-t
                keypath="admin.dashboard.metrics.totalLeads"
                tag="span"
                scope="global"
              />
            </n-text>
            <n-h2 class="mt-1 text-3xl font-bold">
              {{ metrics.totalLeads }}
            </n-h2>
          </div>
          <div class="rounded-full bg-green-100 p-3">
            <Icon
              name="mdi:account-group"
              class="h-6 w-6 text-green-600"
            />
          </div>
        </div>
      </n-card>

      <n-card>
        <div class="flex items-center justify-between">
          <div>
            <n-text
              depth="3"
              class="text-sm"
            >
              <i18n-t
                keypath="admin.dashboard.metrics.pendingLeads"
                tag="span"
                scope="global"
              />
            </n-text>
            <n-h2 class="mt-1 text-3xl font-bold">
              {{ metrics.pendingLeads }}
            </n-h2>
          </div>
          <div class="rounded-full bg-yellow-100 p-3">
            <Icon
              name="mdi:clock-outline"
              class="h-6 w-6 text-yellow-600"
            />
          </div>
        </div>
      </n-card>

      <n-card>
        <div class="flex items-center justify-between">
          <div>
            <n-text
              depth="3"
              class="text-sm"
            >
              <i18n-t
                keypath="admin.dashboard.metrics.conversionRate"
                tag="span"
                scope="global"
              />
            </n-text>
            <n-h2 class="mt-1 text-3xl font-bold">
              {{ metrics.conversionRate }}%
            </n-h2>
          </div>
          <div class="rounded-full bg-purple-100 p-3">
            <Icon
              name="mdi:trending-up"
              class="h-6 w-6 text-purple-600"
            />
          </div>
        </div>
      </n-card>
    </div>

    <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <n-card>
        <template #header>
          <div class="flex items-center justify-between">
            <n-h3>
              <i18n-t
                keypath="admin.dashboard.recentLeads.title"
                tag="span"
                scope="global"
              />
            </n-h3>
            <n-button
              text
              type="primary"
              @click="navigateTo('/admin/leads')"
            >
              <i18n-t
                keypath="admin.dashboard.recentLeads.viewAll"
                tag="span"
                scope="global"
              />
            </n-button>
          </div>
        </template>
        <div class="space-y-4">
          <div
            v-for="lead in recentLeads"
            :key="lead.id"
            class="flex items-center justify-between rounded-lg border p-4"
          >
            <div class="flex items-center space-x-3">
              <div class="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Icon
                  name="mdi:account"
                  class="h-5 w-5 text-gray-600"
                />
              </div>
              <div>
                <n-text class="font-medium">
                  {{ lead.name }}
                </n-text>
                <n-text
                  depth="3"
                  class="text-sm"
                >
                  {{ lead.email }}
                </n-text>
              </div>
            </div>
            <div class="text-right">
              <n-tag
                :type="getLeadStatusType(lead.status)"
                size="small"
              >
                {{ getLeadStatusLabel(lead.status) }}
              </n-tag>
              <n-text
                depth="3"
                class="block text-sm"
              >
                {{ formatDate(lead.createdAt) }}
              </n-text>
            </div>
          </div>
        </div>
      </n-card>

      <n-card>
        <template #header>
          <div class="flex items-center justify-between">
            <n-h3>
              <i18n-t
                keypath="admin.dashboard.quickActions.title"
                tag="span"
                scope="global"
              />
            </n-h3>
          </div>
        </template>
        <div class="grid grid-cols-2 gap-4">
          <n-button
            type="primary"
            size="large"
            class="h-20"
            @click="navigateTo('/admin/offices')"
          >
            <div class="flex flex-col items-center space-y-2">
              <Icon
                name="mdi:office-building-plus"
                class="h-6 w-6"
              />
              <span>
                <i18n-t
                  keypath="admin.dashboard.quickActions.manageOffices"
                  tag="span"
                  scope="global"
                />
              </span>
            </div>
          </n-button>

          <n-button
            type="info"
            size="large"
            class="h-20"
            @click="navigateTo('/admin/leads')"
          >
            <div class="flex flex-col items-center space-y-2">
              <Icon
                name="mdi:account-group"
                class="h-6 w-6"
              />
              <span>
                <i18n-t
                  keypath="admin.dashboard.quickActions.manageLeads"
                  tag="span"
                  scope="global"
                />
              </span>
            </div>
          </n-button>

          <n-button
            type="success"
            size="large"
            class="h-20"
            @click="navigateTo('/admin/offices/create')"
          >
            <div class="flex flex-col items-center space-y-2">
              <Icon
                name="mdi:plus"
                class="h-6 w-6"
              />
              <span>
                <i18n-t
                  keypath="admin.dashboard.quickActions.addOffice"
                  tag="span"
                  scope="global"
                />
              </span>
            </div>
          </n-button>

          <n-button
            type="warning"
            size="large"
            class="h-20"
            @click="navigateTo('/admin/analytics')"
          >
            <div class="flex flex-col items-center space-y-2">
              <Icon
                name="mdi:chart-line"
                class="h-6 w-6"
              />
              <span>
                <i18n-t
                  keypath="admin.dashboard.quickActions.analytics"
                  tag="span"
                  scope="global"
                />
              </span>
            </div>
          </n-button>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

defineOgImageComponent('DefaultOgImage');

const { t } = useI18n({
  useScope: 'global',
});

const metrics = ref({
  conversionRate: 0,
  pendingLeads: 0,
  totalLeads: 0,
  totalOffices: 0,
});

const recentLeads = ref([]);

const getLeadStatusType = (status: string) => {
  const statusTypes = {
    contacted: 'info',
    converted: 'success',
    lost: 'error',
    pending: 'warning',
  };
  return statusTypes[status as keyof typeof statusTypes] || 'default';
};

const getLeadStatusLabel = (status: string) => {
  const statusLabels = {
    contacted: t('admin.dashboard.leadStatus.contacted'),
    converted: t('admin.dashboard.leadStatus.converted'),
    lost: t('admin.dashboard.leadStatus.lost'),
    pending: t('admin.dashboard.leadStatus.pending'),
  };
  return statusLabels[status as keyof typeof statusLabels] || status;
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

onMounted(async () => {
  try {
    const { data: officesData } = await useFetch('/api/admin/offices/count');
    const { data: leadsData } = await useFetch('/api/admin/leads/count');
    const { data: pendingLeadsData } = await useFetch('/api/admin/leads/pending/count');
    const { data: recentLeadsData } = await useFetch('/api/admin/leads/recent');

    metrics.value = {
      conversionRate: leadsData.value?.count > 0
        ? Math.round((leadsData.value.count / 100) * 100)
        : 0,
      pendingLeads: pendingLeadsData.value?.count || 0,
      totalLeads: leadsData.value?.count || 0,
      totalOffices: officesData.value?.count || 0,
    };

    if (recentLeadsData.value?.data) {
      recentLeads.value = recentLeadsData.value.data.map((lead: any) => ({
        ...lead,
        createdAt: new Date(lead.createdAt),
      }));
    }
  }
  catch (error) {
    console.error('Erreur lors du chargement des métriques:', error);
  }
});
</script>
