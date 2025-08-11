<template>
  <n-page-header
    class="p-3"
  >
    <template #back>
      <HeaderMenuIcon />
    </template>

    <template #title>
      Petits Bureaux
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
</script>
