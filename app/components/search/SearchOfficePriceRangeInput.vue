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
            name="mdi:currency-eur"
          />
        </template>

        Budget
      </n-button>
    </template>

    <template #default>
      <div class="p-2">
        <n-space class="mb-2">
          <div class="flex flex-col items-start">
            <n-text class="mb-1">
              Min
            </n-text>
            <n-input-number
              :max="value[1]"
              :min="0"
              :step="DEFAULT_VALUES.step"
              :value="value[0]"
              size="small"
              @update:value="v => value[0] = v ?? 0"
            />
          </div>
          <div class="flex flex-col items-start">
            <n-text class="mb-1">
              Max
            </n-text>
            <n-input-number
              :max="DEFAULT_VALUES.max"
              :min="value[0]"
              :step="DEFAULT_VALUES.step"
              :value="value[1]"
              size="small"
              @update:value="v => value[1] = v ?? 0"
            />
          </div>
        </n-space>
        <n-button
          type="primary"
          @click="value = [DEFAULT_VALUES.min, DEFAULT_VALUES.max]"
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

<script lang="ts" setup>
import { Icon } from '#components';

const DEFAULT_VALUES = {
  max: 100000,
  min: 0,
  step: 500,
};

const min = defineModel<number | undefined>('min', {
  default: undefined,
  required: false,
});

const max = defineModel<number | undefined>('max', {
  default: undefined,
  required: false,
});

const value = ref<[number, number]>([
  min.value ?? 0,
  max.value ?? DEFAULT_VALUES.max,
]);

watch(value, (newValue) => {
  min.value = newValue[0];
  max.value = newValue[1];
});

watch(min, (newValue) => {
  value.value[0] = newValue ?? 0;
});

watch(max, (newValue) => {
  value.value[1] = newValue ?? DEFAULT_VALUES.max;
});
</script>
