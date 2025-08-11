<template>
  <n-drawer
    v-if="isMobileOrTablet"
    v-model:show="showMenu"
    placement="left"
    class=""
  >
    <n-layout-sider
      :native-scrollbar="false"
      :collapsed-width="0"
      :collapsed="false"
      trigger-style="top: 240px;"
      collapsed-trigger-style="top: 240px; right: -30px;"
      :collapse-mode="'transform'"
      bordered
      :default-collapsed="true"
      position="absolute"
      class="z-[2]"
    >
      <MenuSiderContent />
    </n-layout-sider>
  </n-drawer>
  <n-layout-sider
    v-else
    :native-scrollbar="false"
    :collapsed-width="0"
    :collapsed="!showMenu"
    trigger-style="top: 240px;"
    collapsed-trigger-style="top: 240px; right: -20px;"
    :collapse-mode="'transform'"
    bordered
    :default-collapsed="true"
    position="static"
    class="z-[2]"
  >
    <MenuSiderContent />
  </n-layout-sider>
</template>

<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

const showMenu = defineModel<boolean>('showMenu', {
  required: true,
});

const breakpoints = useBreakpoints(breakpointsTailwind);

const isMobileOrTablet = breakpoints.smallerOrEqual('lg');
</script>

<style scoped></style>
