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

import { Icon, NuxtLinkLocale } from '#components';

const { t } = useI18n({
  useScope: 'global',
});

const renderIcon = (name: string) => {
  return () =>
    h(Icon, {
      name: name,
    });
};

const renderNuxtLinkLocale = (
  props: {
    locale?: string | undefined;
  } & NuxtLinkProps,
  text: string,
) => {
  return () =>
    // @ts-expect-error NuxtLinkLocale is a component that accepts props
    h(NuxtLinkLocale, props, {
      default: () => text,
    });
};

const homeMenu: ComputedRef<MenuOption> = computed(() => ({
  icon: renderIcon('mdi:home'),
  key: 'home',
  label: renderNuxtLinkLocale(
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
  label: renderNuxtLinkLocale(
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
  label: renderNuxtLinkLocale(
    {
      to: {
        name: 'dashboard',
      },
    },
    t('sider.menus.dashboard'),
  ),
}));
const piniaMenu: ComputedRef<MenuOption> = computed(() => ({
  icon: renderIcon('mdi:fruit-pineapple'),
  key: 'pinia',
  label: renderNuxtLinkLocale(
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
  label: renderNuxtLinkLocale(
    {
      to: {
        name: 'techs',
      },
    },
    t('sider.menus.techs'),
  ),
}));
const signInMenu: ComputedRef<MenuOption> = computed(() => ({
  icon: renderIcon('mdi:login'),
  key: 'signin',
  label: renderNuxtLinkLocale(
    {
      to: {
        name: 'signin',
      },
    },
    t('sider.menus.signIn'),
  ),
}));
const registerMenu: ComputedRef<MenuOption> = computed(() => ({
  icon: renderIcon('mdi:account-plus'),
  key: 'register',
  label: renderNuxtLinkLocale(
    {
      to: {
        name: 'register',
      },
    },
    t('sider.menus.register'),
  ),
}));

const { loggedIn } = useUserSession();

const menuOptions: ComputedRef<MenuOption[]> = computed(() =>
  loggedIn.value
    ? [
        homeMenu.value,
        dashboardMenu.value,
        postsMenu.value,
        piniaMenu.value,
        techsMenu.value,
      ]
    : [
        homeMenu.value,
        postsMenu.value,
        piniaMenu.value,
        techsMenu.value,
        signInMenu.value,
        registerMenu.value,
      ],
);
</script>

<style scoped></style>
