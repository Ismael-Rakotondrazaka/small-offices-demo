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
    icon: 'mdi:search',
    label: 'Rechercher',
    to: {
      name: 'rechercher',
    },
  },
];

const routes = computed<MenuLinkRoute[]>(() =>
  drawerRoutes.map(route => omit(route, ['icon'])),
);
</script>
