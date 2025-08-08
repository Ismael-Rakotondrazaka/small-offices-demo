<template>
  <n-layout
    :has-sider="true"
    position="absolute"
    class=""
  >
    <MenuSider v-model:show-menu="menuSiderStore.isShown" />

    <n-layout>
      <n-layout-header
        position="absolute"
        class="z-[1]"
        bordered
      >
        <HeaderAuth v-if="loggedIn" />
        <HeaderApp v-else />
      </n-layout-header>

      <n-layout-content
        content-style=""
        class="my-20 lg:my-16"
        :native-scrollbar="true"
      >
        <slot />
      </n-layout-content>

      <n-layout-footer
        bordered
        position="absolute"
        class="z-[1]"
      >
        <FooterApp />
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
const menuSiderStore = useMenuSiderStore();

const { loggedIn } = useUserSession();
</script>
