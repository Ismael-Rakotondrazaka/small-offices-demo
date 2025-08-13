<template>
  <n-popover
    v-model:show="showPopover"
    trigger="click"
    placement="bottom-start"
    :show-arrow="false"
  >
    <template #trigger>
      <n-button
        :type="isInitialValue ? 'default' : 'primary'"
      >
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
          v-model:value="localValue"
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
              v-model:value="localMin"
              :max="localValue[1] ?? DEFAULT_VALUES.max"
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
              v-model:value="localMax"
              :max="DEFAULT_VALUES.max"
              :min="localValue[0] ?? DEFAULT_VALUES.min"
              :step="DEFAULT_VALUES.step"
              size="small"
            />
          </div>
        </n-space>

        <n-flex justify="space-between">
          <n-button
            type="primary"
            secondary
            @click="reset"
          >
            <template #icon>
              <icon name="mdi:refresh" />
            </template>
            Réinitialiser
          </n-button>

          <n-button
            type="primary"
            primary
            @click="apply"
          >
            <template #icon>
              <icon name="mdi:check" />
            </template>
            Appliquer
          </n-button>
        </n-flex>
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

const showPopover = ref(false);

const marks = computed(() => ({
  [DEFAULT_VALUES.max]: `${DEFAULT_VALUES.max}+`,
  [DEFAULT_VALUES.min]: `${DEFAULT_VALUES.min}`,
}));

const localValue = ref<[number, number]>([
  props.min ?? DEFAULT_VALUES.min,
  props.max ?? DEFAULT_VALUES.max,
]);

const localMin = ref<number | undefined>(props.min);
const localMax = ref<number | undefined>(props.max);

watch(() => props.min, (newValue) => {
  localMin.value = newValue;
  localValue.value[0] = newValue ?? DEFAULT_VALUES.min;
});

watch(() => props.max, (newValue) => {
  localMax.value = newValue;
  localValue.value[1] = newValue ?? DEFAULT_VALUES.max;
});

watch(localValue, (newValue) => {
  const newMin = newValue[0] === 0 ? undefined : newValue[0];
  const newMax = newValue[1] === 500 ? undefined : newValue[1];

  localMin.value = newMin;
  localMax.value = newMax;
});

watch(localMin, (newValue) => {
  localValue.value[0] = newValue ?? DEFAULT_VALUES.min;
});

watch(localMax, (newValue) => {
  localValue.value[1] = newValue ?? DEFAULT_VALUES.max;
});

const apply = () => {
  const newMin = localValue.value[0] === 0 ? undefined : localValue.value[0];
  const newMax = localValue.value[1] === 500 ? undefined : localValue.value[1];

  emit('update:min', newMin);
  emit('update:max', newMax);
  showPopover.value = false;
};

const reset = () => {
  localValue.value = [DEFAULT_VALUES.min, DEFAULT_VALUES.max];
  localMin.value = undefined;
  localMax.value = undefined;
  apply();
};

const isInitialValue = computed(() => {
  return localMin.value === undefined && localMax.value === undefined;
});
</script>
