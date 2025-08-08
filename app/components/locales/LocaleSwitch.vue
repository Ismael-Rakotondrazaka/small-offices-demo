<template>
  <div>
    <n-dropdown
      trigger="hover"
      :options="options"
      placement="bottom-start"
      @select="handleSelect"
    >
      <n-button
        text
        :bordered="false"
      >
        <Icon
          name="mdi:translate"
          size="24px"
        />
      </n-button>
    </n-dropdown>
  </div>
</template>

<script lang="ts" setup>
import type { DropdownOption } from 'naive-ui';

const switchLocalePath = useSwitchLocalePath();

const handleSelect = (key: 'fr') => {
  const newPath = switchLocalePath(key);
  navigateTo(newPath);
};

const { locales } = useI18n();

const options = computed<DropdownOption[]>(() => {
  return locales.value.map(locale => ({
    key: locale.code,
    label: locale.name,
  }));
});
</script>

<style scoped></style>
