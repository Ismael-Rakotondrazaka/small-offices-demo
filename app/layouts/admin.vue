<template>
  <NaiveLayoutNavbar
    :routes="routes"
    :drawer-routes="drawerRoutes"
    drawer-width="90%"
    toggle-icon="mdi:menu"
  >
    <template #start>
      <NuxtLinkLocale
        :to="{
          name: 'index',
        }"
      >
        <NuxtImg
          src="/images/logos/logo-petits-bureaux.svg"
          width="32"
          height="32"
        />
      </NuxtLinkLocale>
    </template>

    <template #drawer-header>
      Petits Bureaux
    </template>

    <template #default>
      <slot />
    </template>

    <template #end>
      <n-flex>
        <NaiveColorModeSwitch />
      </n-flex>
    </template>
  </NaiveLayoutNavbar>
</template>

<script setup lang="ts">
import type { MenuLinkRoute } from '#build/types/naiveui';

import { omit } from 'es-toolkit';

const drawerRoutes: MenuLinkRoute[] = [
  {
    icon: 'mdi:home',
    label: 'Dashboard',
    to: {
      name: 'admin-dashboard',
    },
  },
  {
    icon: 'mdi:office-building',
    label: 'Bureaux',
    to: {
      name: 'admin-offices',
    },
  },
  {
    icon: 'mdi:account-group',
    label: 'Leads',
    to: {
      name: 'admin-leads',
    },
  },
  {
    icon: 'mdi:chart-line',
    label: 'Analytiques',
    to: {
      name: 'admin-analytiques',
    },
  },
];

const routes = computed<MenuLinkRoute[]>(() =>
  drawerRoutes.map(route => omit(route, ['icon'])),
);
</script>
