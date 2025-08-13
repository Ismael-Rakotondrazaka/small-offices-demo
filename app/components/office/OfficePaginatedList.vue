<template>
  <div>
    <div
      v-if="offices.length"
    >
      <OfficeList
        :offices="offices"
        class="mb-3"
      />

      <n-flex justify="center">
        <n-pagination
          :on-update:page="onUpdatePageHandler"
          :on-update:page-size="onUpdatePageSizeHandler"
          :page="page"
          :page-size="pageSize"
          :page-count="totalPages"
          show-quick-jumper
          show-size-picker
          :page-sizes="pageSizes"
        />
      </n-flex>
    </div>

    <n-empty
      v-else-if="offices.length === 0"
      size="huge"
      class="mb-3"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Serialize } from '#imports';

import { generatePageSizes } from '~/utils';

interface Props {
  isLoading: boolean;
  offices: Serialize<OfficeDTO>[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

defineProps<Props>();

const emit = defineEmits<{
  'update:page': [value: number];
  'update:pageSize': [value: number];
}>();

const onUpdatePageHandler = (newPage: number) => {
  emit('update:page', newPage);
};

const onUpdatePageSizeHandler = (newPageSize: number) => {
  emit('update:pageSize', newPageSize);
};

const pageSizes = generatePageSizes(officeConfig.PAGE_SIZE_DEFAULT_VALUE);
</script>

<style scoped></style>
