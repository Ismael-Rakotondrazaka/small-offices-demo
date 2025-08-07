<template>
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
      <n-avatar circle>
        <template #default>
          <Icon
            name="mdi:account"
            size="24px"
          />
        </template>
      </n-avatar>
    </n-button>
  </n-dropdown>
</template>

<script lang="ts" setup>
import type { DropdownOption } from 'naive-ui';

import { Icon } from '#components';

const renderIcon = (name: string) => {
  return () =>
    h(Icon, {
      name: name,
    });
};

const options: DropdownOption[] = [
  {
    icon: renderIcon('mdi:logout'),
    key: 'logout',
    label: 'Logout',
  },
];

const { clear } = useUserSession();

const localeRoute = useLocaleRoute();

const handleSelect = async (key: number | string) => {
  switch (String(key)) {
    case 'logout': {
      await clear();

      return navigateTo(
        localeRoute({
          name: 'index',
        }),
      );
    }

    default:
      break;
  }
};
</script>

<style scoped></style>
