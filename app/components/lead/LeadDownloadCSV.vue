<template>
  <n-button
    type="primary"
    @click="downloadCSV"
  >
    <template #icon>
      <Icon name="mdi:download" />
    </template>
    Télécharger en CSV
  </n-button>
</template>

<script lang="ts" setup>
interface Props {
  query: DownloadLeadsRequestQuery;
}

const props = defineProps<Props>();

const downloadCSV = async () => {
  return navigateTo({
    path: '/api/leads/download',
    query: props.query,
  }, {
    external: true,
  });
};
</script>

<style>

</style>
