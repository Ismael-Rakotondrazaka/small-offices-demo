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
            name="mdi:account-group"
          />
        </template>

        Postes
      </n-button>
    </template>

    <template #default>
      <div class="p-2">
        <n-slider
          v-model:value="value"
          range
          :step="DEFAULT_VALUES.step"
          :min="DEFAULT_VALUES.min"
          :max="DEFAULT_VALUES.max"
          :marks="marks"
        />

        <n-space class="mb-2">
          <div class="flex flex-col items-start">
            <n-text class="mb-1">
              Min
            </n-text>
            <n-input-number
              v-model:value="min"
              :max="value[1] ?? DEFAULT_VALUES.max"
              :min="0"
              :step="DEFAULT_VALUES.step"
              size="small"
            />
          </div>
          <div class="flex flex-col items-start">
            <n-text class="mb-1">
              Max
            </n-text>
            <n-input-number
              v-model:value="max"
              :max="DEFAULT_VALUES.max"
              :min="value[0] ?? DEFAULT_VALUES.min"
              :step="DEFAULT_VALUES.step"
              size="small"
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
  max: 500,
  min: 0,
  step: 5,
};

const min = defineModel<number | undefined>('min', {
  default: undefined,
  required: false,
});

const max = defineModel<number | undefined>('max', {
  default: undefined,
  required: false,
});

const marks = computed(() => ({
  [DEFAULT_VALUES.max]: `${DEFAULT_VALUES.max}+`,
  [DEFAULT_VALUES.min]: `${DEFAULT_VALUES.min}`,
}));

const value = ref<[number, number]>([
  min.value ?? DEFAULT_VALUES.min,
  max.value ?? DEFAULT_VALUES.max,
]);

watch(value, (newValue) => {
  min.value = newValue[0] === 0 ? undefined : newValue[0];
  max.value = newValue[1] === 100 ? undefined : newValue[1];
});

watch(min, (newValue) => {
  value.value[0] = newValue ?? DEFAULT_VALUES.min;
});

watch(max, (newValue) => {
  value.value[1] = newValue ?? DEFAULT_VALUES.max;
});
</script>
