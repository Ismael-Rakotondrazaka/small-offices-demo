<template>
  <div class="mx-auto w-full max-w-4xl p-3">
    <n-h1>
      <i18n-t
        keypath="dashboard.welcome"
        tag="span"
        scope="global"
      >
        <template #firstName>
          <span class="text-primary">{{ user!.firstName }}</span>
        </template>
      </i18n-t>
    </n-h1>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
});

defineOgImageComponent('DefaultOgImage');

const { user } = useUserSession();
</script>

<style scoped></style>
