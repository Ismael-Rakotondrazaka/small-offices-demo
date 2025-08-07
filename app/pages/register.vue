<script lang="ts" setup>
definePageMeta({
  middleware: 'guest',
});
</script>

<template>
  <div class="container mx-auto">
    <n-card
      :title="$t('auth.register.form.title')"
      size="small"
      class="mx-auto w-full max-w-md"
    >
      <RegisterForm class="w-full" />
    </n-card>
  </div>
</template>

<style scoped></style>
