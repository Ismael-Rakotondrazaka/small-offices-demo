<template>
  <n-layout class="">
    <n-menu
      :inverted="true"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
    />
  </n-layout>
</template>

<script lang="ts" setup>
import type { MenuOption } from 'naive-ui';
import type { NuxtLinkProps } from 'nuxt/app';

import { Icon, NuxtLink } from '#components';

const { t } = useI18n({
  useScope: 'global',
});

const renderIcon = (name: string) => {
  return () =>
    h(Icon, {
      name: name,
    });
};

const renderNuxtLink = (
  props: {
    locale?: string | undefined;
  } & NuxtLinkProps,
  text: string,
) => {
  return () =>
    h(NuxtLink, props, {
      default: () => text,
    });
};

const homeMenu: ComputedRef<MenuOption> = computed(() => ({
  icon: renderIcon('mdi:home'),
  key: 'home',
  label: renderNuxtLink(
    {
      to: {
        name: 'index',
      },
    },
    t('sider.menus.home'),
  ),
}));

const postsMenu: ComputedRef<MenuOption> = computed(() => ({
  icon: renderIcon('mdi:message'),
  key: 'posts',
  label: renderNuxtLink(
    {
      to: {
        name: 'posts',
      },
    },
    t('sider.menus.posts'),
  ),
}));
const dashboardMenu: ComputedRef<MenuOption> = computed(() => ({
  icon: renderIcon('mdi:chart-pie'),
  key: 'dashboard',
  label: renderNuxtLink(
    {
      to: {
        name: 'dashboard',
      },
    },
    t('sider.menus.dashboard'),
  ),
}));

const adminDashboardMenu: ComputedRef<MenuOption> = computed(() => ({
  icon: renderIcon('mdi:shield-account'),
  key: 'admin-dashboard',
  label: renderNuxtLink(
    {
      to: {
        name: 'admin-dashboard',
      },
    },
    t('sider.menus.adminDashboard'),
  ),
}));
const piniaMenu: ComputedRef<MenuOption> = computed(() => ({
  icon: renderIcon('mdi:fruit-pineapple'),
  key: 'pinia',
  label: renderNuxtLink(
    {
      to: {
        name: 'pinia',
      },
    },
    t('sider.menus.pinia'),
  ),
}));
const techsMenu: ComputedRef<MenuOption> = computed(() => ({
  icon: renderIcon('mdi:code-tags'),
  key: 'techs',
  label: renderNuxtLink(
    {
      to: {
        name: 'techs',
      },
    },
    t('sider.menus.techs'),
  ),
}));
const adminLoginMenu: ComputedRef<MenuOption> = computed(() => ({
  icon: renderIcon('mdi:shield-account'),
  key: 'admin-login',
  label: renderNuxtLink(
    {
      to: {
        name: 'admin-login',
      },
    },
    t('sider.menus.adminLogin'),
  ),
}));
const registerMenu: ComputedRef<MenuOption> = computed(() => ({
  icon: renderIcon('mdi:account-plus'),
  key: 'register',
  label: renderNuxtLink(
    {
      to: {
        name: 'register',
      },
    },
    t('sider.menus.register'),
  ),
}));

const session = useSupabaseSession();

const menuOptions: ComputedRef<MenuOption[]> = computed(() =>
  session.value
    ? [
        homeMenu.value,
        dashboardMenu.value,
        adminDashboardMenu.value,
        postsMenu.value,
        piniaMenu.value,
        techsMenu.value,
      ]
    : [
        homeMenu.value,
        postsMenu.value,
        piniaMenu.value,
        techsMenu.value,
        adminLoginMenu.value,
        registerMenu.value,
      ],
);
</script>

<style scoped></style>
