<template>
  <n-page-header
    class="p-3"
    @back="menuSiderStore.toggle"
  >
    <template #back>
      <HeaderMenuIcon />
    </template>

    <template #title>
      <span class="text-xl font-bold text-primary">
        Petits Bureaux
      </span>
    </template>

    <template #subtitle>
      <span class="text-sm text-gray-600 dark:text-gray-300 hidden md:block">
        Accédez à tous les bureaux du marché. Votre conseiller vous accompagne en visite et vous aide à négocier. Le tout gratuitement.
      </span>
    </template>

    <template #extra>
      <n-space align="center">
        <ThemeSwitch />

        <LocaleSwitch />
      </n-space>
    </template>
  </n-page-header>
</template>

<script setup lang="ts">
const menuSiderStore = useMenuSiderStore();
</script>
