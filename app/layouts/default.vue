<template>
  <NaiveLayoutNavbar
    id="layout-default"
    :routes="routes"
    :drawer-routes="drawerRoutes"
    drawer-width="90%"
    toggle-icon="mdi:menu"
    class="bg-white"
  >
    <template #start>
      <NuxtLink
        :to="{
          name: 'index',
        }"
      >
        <img
          src="/images/logos/logo-petits-bureaux.svg"
          width="32"
          height="32"
          alt="Petits Bureaux"
        >
      </NuxtLink>
    </template>

    <template #drawer-header>
      Petits Bureaux
    </template>

    <template #default>
      <slot />

      <FooterApp />
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
      name: 'search',
    },
  },
];

const routes = computed<MenuLinkRoute[]>(() =>
  drawerRoutes.map(route => omit(route, ['icon'])),
);
</script>
