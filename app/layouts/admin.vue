<template>
  <n-layout
    :has-sider="true"
    position="absolute"
    class=""
  >
    <n-layout-sider
      :native-scrollbar="false"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :collapse-mode="'transform'"
      bordered
      :default-collapsed="false"
      position="static"
      class="z-[2]"
    >
      <div class="p-4">
        <div class="flex items-center space-x-3 mb-6">
          <img
            src="/images/logos/logo-petits-bureaux_32x32.png"
            alt="Petits Bureaux"
            class="h-8 w-8"
          >
          <n-text class="font-bold text-lg">
            <i18n-t
              keypath="admin.layout.title"
              tag="span"
              scope="global"
            />
          </n-text>
        </div>

        <n-menu
          :inverted="true"
          :options="adminMenuOptions"
        />
      </div>
    </n-layout-sider>

    <n-layout>
      <n-layout-header
        position="absolute"
        class="z-[1]"
        bordered
      >
        <div class="flex items-center justify-between p-4">
          <n-h2>
            <i18n-t
              keypath="admin.layout.dashboard"
              tag="span"
              scope="global"
            />
          </n-h2>
          <div class="flex items-center space-x-4">
            <n-button
              text
              @click="navigateTo('/')"
            >
              <Icon
                name="mdi:home"
                class="h-5 w-5"
              />
            </n-button>
            <HeaderUserMenu />
          </div>
        </div>
      </n-layout-header>

      <n-layout-content
        content-style=""
        class="my-20 lg:my-16"
        :native-scrollbar="true"
      >
        <slot />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
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
    h(NuxtLinkLocale, props, {
      default: () => text,
    });
};

const dashboardMenu: ComputedRef<MenuOption> = computed(() => ({
  icon: renderIcon('mdi:view-dashboard'),
  key: 'admin-dashboard',
  label: renderNuxtLinkLocale(
    {
      to: {
        name: 'admin-dashboard',
      },
    },
    t('admin.menu.dashboard'),
  ),
}));

const officesMenu: ComputedRef<MenuOption> = computed(() => ({
  icon: renderIcon('mdi:office-building'),
  key: 'admin-offices',
  label: renderNuxtLinkLocale(
    {
      to: {
        name: 'admin-offices',
      },
    },
    t('admin.menu.offices'),
  ),
}));

const leadsMenu: ComputedRef<MenuOption> = computed(() => ({
  icon: renderIcon('mdi:account-group'),
  key: 'admin-leads',
  label: renderNuxtLinkLocale(
    {
      to: {
        name: 'admin-leads',
      },
    },
    t('admin.menu.leads'),
  ),
}));

const analyticsMenu: ComputedRef<MenuOption> = computed(() => ({
  icon: renderIcon('mdi:chart-line'),
  key: 'admin-analytics',
  label: renderNuxtLinkLocale(
    {
      to: {
        name: 'admin-analytics',
      },
    },
    t('admin.menu.analytics'),
  ),
}));

const adminMenuOptions: ComputedRef<MenuOption[]> = computed(() => [
  dashboardMenu.value,
  officesMenu.value,
  leadsMenu.value,
  analyticsMenu.value,
]);
</script>
