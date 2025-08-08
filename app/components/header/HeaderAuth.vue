<template>
  <n-page-header
    class="p-3"
    @back="menuSiderStore.toggle"
  >
    <template #back>
      <HeaderMenuIcon />
    </template>

    <template #title>
      {{ $t("app.name") }}
    </template>

    <template #subtitle>
      <p class="!hidden lg:!inline-block">
        {{ $t("app.description") }}
      </p>
    </template>

    <template #extra>
      <n-space align="center">
        <ThemeSwitch />

        <LocaleSwitch />

        <HeaderUserMenu />
      </n-space>
    </template>
  </n-page-header>
</template>

<script setup lang="ts">
const menuSiderStore = useMenuSiderStore();
</script>
