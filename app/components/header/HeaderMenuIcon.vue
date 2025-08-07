<template>
  <Icon :name="menuIconName" />
</template>

<script lang="ts" setup>
const menuSiderStore = useMenuSiderStore();

const menuIconName = computed(() =>
  menuSiderStore.isShown ? 'mdi:menu-open' : 'mdi:menu-close',
);
</script>

<style></style>
