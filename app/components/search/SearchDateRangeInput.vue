<template>
  <n-date-picker
    v-model:value="localValue"
    type="daterange"
    clearable
  />
</template>

<script lang="ts" setup>
type Props = {
  max?: number;
  min?: number;
};

const props = defineProps<Props>();

type Emits = {
  'update:range': [min: number | undefined, max: number | undefined];
};

const emit = defineEmits<Emits>();

const localValue = ref<[number, number] | null>(
  typeof props.min === 'number' && typeof props.max === 'number'
    ? [props.min, props.max]
    : null,
);

watch(() => props.min, (newValue) => {
  if (newValue === undefined) {
    localValue.value = null;
    return;
  }

  if (localValue.value === null && props.max !== undefined) {
    localValue.value = [newValue, props.max];
  }
});

watch(() => props.max, (newValue) => {
  if (newValue === undefined) {
    localValue.value = null;
    return;
  }

  if (localValue.value === null && props.min !== undefined) {
    localValue.value = [props.min, newValue];
  }
});

watch(localValue, (newValue) => {
  if (newValue === null) {
    emit('update:range', undefined, undefined);
    return;
  }

  emit('update:range', newValue[0], newValue[1]);
});
</script>
