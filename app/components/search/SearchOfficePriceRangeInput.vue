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

<script lang="ts" setup>
import { Icon } from '#components';

const DEFAULT_VALUES = {
  max: 100_000,
  min: 0,
  step: 500,
};

type Props = {
  max?: number;
  min?: number;
};

const props = defineProps<Props>();

type Emits = {
  'update:max': [value: number | undefined];
  'update:min': [value: number | undefined];
};

const emit = defineEmits<Emits>();

const marks = computed(() => ({
  [DEFAULT_VALUES.max]: `${DEFAULT_VALUES.max}+`,
  [DEFAULT_VALUES.min]: `${DEFAULT_VALUES.min}`,
}));

const value = ref<[number, number]>([
  props.min ?? DEFAULT_VALUES.min,
  props.max ?? DEFAULT_VALUES.max,
]);

const min = ref<number | undefined>(props.min);
const max = ref<number | undefined>(props.max);

watch(value, (newValue) => {
  const newMin = newValue[0] === 0 ? undefined : newValue[0];
  const newMax = newValue[1] === 100_000 ? undefined : newValue[1];

  min.value = newMin;
  max.value = newMax;

  emit('update:min', newMin);
  emit('update:max', newMax);
});

watch(min, (newValue) => {
  value.value[0] = newValue ?? DEFAULT_VALUES.min;
});

watch(max, (newValue) => {
  value.value[1] = newValue ?? DEFAULT_VALUES.max;
});

const reset = () => {
  value.value = [DEFAULT_VALUES.min, DEFAULT_VALUES.max];
  min.value = undefined;
  max.value = undefined;
  emit('update:min', undefined);
  emit('update:max', undefined);
};
</script>
