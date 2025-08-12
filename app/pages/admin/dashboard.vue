<template>
  <div class="mx-auto w-full max-w-7xl p-6">
    <n-h1>
      Dashboard
    </n-h1>

    <n-grid
      cols="3"
      responsive="screen"
      :x-gap="8"
      :y-gap="8"
      class="mb-5"
    >
      <n-grid-item>
        <n-card title="Bureaux">
          <template #header-extra>
            <Icon
              name="mdi:office-building"
              size="1.5rem"
            />
          </template>
          <n-statistic>
            {{ metrics.totalOffices }}
          </n-statistic>
        </n-card>
      </n-grid-item>

      <n-grid-item>
        <n-card title="Leads Totals">
          <template #header-extra>
            <Icon
              name="mdi:account-group"
              size="1.5rem"
            />
          </template>
          <n-statistic>
            {{ metrics.totalLeads }}
          </n-statistic>
        </n-card>
      </n-grid-item>

      <n-grid-item>
        <n-card title="Pending Leads">
          <template #header-extra>
            <Icon
              name="mdi:clock-outline"
              size="1.5rem"
            />
          </template>
          <n-statistic>
            {{ metrics.pendingLeads }}
          </n-statistic>
        </n-card>
      </n-grid-item>
    </n-grid>

    <n-card title="Actions rapides">
      <NuxtLinkLocale
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
      </NuxtLinkLocale>
    </n-card>

    <n-h2>
      Recent Leads
    </n-h2>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
});

defineOgImageComponent('DefaultOgImage');

const metrics = ref({
  pendingLeads: 0,
  totalLeads: 0,
  totalOffices: 0,
});
</script>
