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
            name="mdi:map-marker"
          />
        </template>

        Arrondissements
      </n-button>
    </template>

    <template #default>
      <div class="">
        <n-grid
          class="mb-2"
          cols="6"
          x-gap="8"
          y-gap="8"
          item-responsive
          responsive="screen"
        >
          <n-grid-item
            v-for="index in 20"
            :key="index"
            span="3 m:2 l:1"
          >
            <n-button
              round
              :bordered="false"
              type="primary"
              size="large"
              :primary="value.includes(index)"
              :tertiary="!value.includes(index)"
              class="w-full"
              @click="handleClick(index)"
            >
              Paris {{ index }}
            </n-button>
          </n-grid-item>
        </n-grid>

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
type Props = {
  value: number[];
};

const props = defineProps<Props>();

type Emits = {
  'update:value': [value: number[]];
};

const emit = defineEmits<Emits>();

const value = ref<number[]>(props.value);

const showPopover = ref(false);

const handleClick = (index: number) => {
  if (value.value.includes(index)) {
    value.value = value.value.filter(i => i !== index);
  }
  else {
    value.value = [...value.value, index];
  }
};

const apply = () => {
  emit('update:value', value.value);
  showPopover.value = false;
};

const reset = () => {
  value.value = [];
  apply();
};

const isInitialValue = computed(() => {
  return value.value.length === 0;
});
</script>

<style scoped></style>
