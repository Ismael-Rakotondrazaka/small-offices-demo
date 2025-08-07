<template>
  <n-switch
    v-model:value="isActive"
    @update:value="onThemeChange"
  >
    <template #checked>
      <Icon name="mdi:moon-waning-crescent" />
    </template>

    <template #unchecked>
      <Icon name="mdi:white-balance-sunny" />
    </template>
  </n-switch>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
const { colorModePreference: naiveUIColorModePreference } = useNaiveColorMode();

const isActive = computed({
  get: () => colorMode.preference === 'dark',
  set: (value: boolean) => {
    const preference = value ? 'dark' : 'light';
    colorMode.preference = preference;
    naiveUIColorModePreference.set(preference); // Sync with naive color mode preference
  },
});

const onThemeChange = (value: boolean) => {
  isActive.value = value;
};
</script>

<style scoped></style>
