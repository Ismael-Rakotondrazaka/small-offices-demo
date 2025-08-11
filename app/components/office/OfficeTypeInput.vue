<template>
  <n-select
    v-model:value="value"
    placeholder="Type de bureau"
    :options="options"
  />
</template>

<script setup lang="ts">
import type { SelectOption } from "naive-ui";
import { OfficeType, OfficeTypeLabel } from "~~/shared/domains/offices/officeType";

const value = defineModel<OfficeType | null>("value", {
  required: false,
  default: null,
});

const options: SelectOption[] = [
  {
    label: OfficeTypeLabel[OfficeType.PRIVATE_OFFICE],
    value: OfficeType.PRIVATE_OFFICE,
  },
  {
    label: OfficeTypeLabel[OfficeType.OPEN_SPACE],
    value: OfficeType.OPEN_SPACE,
  },
  {
    label: OfficeTypeLabel[OfficeType.INDEPENDENT_SPACE],
    value: OfficeType.INDEPENDENT_SPACE,
  },
];
</script>

<style scoped></style> 