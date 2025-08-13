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
            :primary="localValue === type"
            :tertiary="localValue !== type"
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

<script setup lang="ts">
import { OfficeType } from '#imports';

type Props = {
  value?: OfficeType;
};

const props = defineProps<Props>();

type Emits = {
  'update:value': [value: OfficeType | undefined];
};

const emit = defineEmits<Emits>();

const showPopover = ref(false);

const localValue = ref<OfficeType | undefined>(props.value);

watch(() => props.value, (newValue) => {
  localValue.value = newValue;
});

const handleClick = (type: OfficeType) => {
  localValue.value = localValue.value === type ? undefined : type;
};

const apply = () => {
  emit('update:value', localValue.value);
  showPopover.value = false;
};

const reset = () => {
  localValue.value = undefined;
  apply();
};

const iconMap: Record<OfficeType, string> = {
  [OfficeType.INDEPENDENT_SPACE]: 'mdi:door',
  [OfficeType.OPEN_SPACE]: 'mdi:chair-rolling',
  [OfficeType.PRIVATE_OFFICE]: 'mdi:door-closed',
};

const isInitialValue = computed(() => {
  return localValue.value === undefined;
});
</script>

<style scoped></style>
