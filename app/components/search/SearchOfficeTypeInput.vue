<template>
  <n-popover
    trigger="click"
    placement="bottom-start"
    :show-arrow="false"
  >
    <template #trigger>
      <n-button>
        <template #icon>
          <Icon
            name="mdi:office-building"
          />
        </template>

        Type
      </n-button>
    </template>

    <template #default>
      <div class="p-2">
        <n-flex
          class="mb-2"
          wrap
        >
          <n-button
            v-for="type in OfficeTypes"
            :key="type"
            round
            :bordered="false"
            type="primary"
            size="large"
            :primary="value === type"
            :tertiary="value !== type"
            class="w-full"
            @click="handleClick(type)"
          >
            <template #icon>
              <Icon
                :name="iconMap[type]"
                class="text-lg"
              />
            </template>
            {{ OfficeTypeLabel[type] }}
          </n-button>
        </n-flex>

        <n-button
          type="primary"
          @click="reset"
        >
          <template #icon>
            <icon name="mdi:refresh" />
          </template>
          Réinitialiser
        </n-button>
      </div>
    </template>
  </n-popover>
</template>

<script setup lang="ts">
import { OfficeType, OfficeTypeLabel, OfficeTypes } from '~~/shared/domains/offices/officeType';

const value = defineModel<OfficeType | undefined>('value', {
  default: undefined,
  required: false,
});

const handleClick = (type: OfficeType) => {
  value.value = type;
};

const iconMap: Record<OfficeType, string> = {
  [OfficeType.INDEPENDENT_SPACE]: 'mdi:door',
  [OfficeType.OPEN_SPACE]: 'mdi:chair-rolling',
  [OfficeType.PRIVATE_OFFICE]: 'mdi:door-closed',
};

const reset = () => {
  value.value = undefined;
};
</script>

<style scoped></style>
