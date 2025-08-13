<template>
  <n-grid
    cols="2"
    x-gap="8"
    y-gap="8"
    item-responsive
    responsive="screen"
  >
    <n-grid-item
      v-for="office in offices"
      :key="office.id"
      span="2 m:1"
    >
      <OfficeListItem
        :office="office"
      />
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts" setup>
interface Props {
  offices: Serialize<OfficeDTO>[];
}

defineProps<Props>();
</script>
