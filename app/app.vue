<template>
  <NuxtLoadingIndicator color="#302aa7" />
  <naive-config
    :breakpoints="breakPoints"
    :locale="frFR"
    :date-locale="dateFrFR"
  >
    <n-notification-provider>
      <n-message-provider
        placement="top"
        :duration="5000"
        :keep-alive-on-hover="true"
      >
        <n-dialog-provider>
          <nuxt-layout>
            <nuxt-page />
          </nuxt-layout>
        </n-dialog-provider>
      </n-message-provider>
    </n-notification-provider>
  </naive-config>
</template>

<script lang="ts" setup>
import { dateFrFR, frFR } from 'naive-ui';

useHead({
  link: [
    {
      href: '/favicon.ico',
      rel: 'icon',
      type: 'image/x-icon',
    },
    {
      href: '/favicon.ico',
      rel: 'shortcut icon',
      type: 'image/x-icon',
    },
  ],
});

const breakPoints = {
  l: 1024, // matches Tailwind's 'lg'
  m: 768, // matches Tailwind's 'md'
  s: 640, // matches Tailwind's 'sm'
  xl: 1280, // matches Tailwind's 'xl'
  xs: 0,
  xxl: 1536, // matches Tailwind's '2xl'
};
</script>

<style scoped></style>
