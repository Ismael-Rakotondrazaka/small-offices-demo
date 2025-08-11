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
          cols="4"
          :x-gap="8"
          :y-gap="8"
        >
          <n-grid-item
            v-for="index in 20"
            :key="index"
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
const value = defineModel<number[]>('value', {
  default: () => [],
  required: false,
});

const reset = () => {
  value.value = [];
};

const handleClick = (index: number) => {
  if (value.value.includes(index)) {
    value.value = value.value.filter(i => i !== index);
  }
  else {
    value.value = [...value.value, index];
  }
};
</script>

<style scoped></style>
