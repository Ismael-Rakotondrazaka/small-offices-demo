<template>
  <div>
    <NaiveConfig>
      <NMessageProvider
        placement="bottom-right"
        :duration="5000"
        :keep-alive-on-hover="true"
      >
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </NMessageProvider>
    </NaiveConfig>
  </div>
</template>

<script lang="ts" setup>
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
</script>

<style scoped></style>
