<script lang="ts" setup>
definePageMeta({
  middleware: 'guest',
});
</script>

<template>
  <div class="container mx-auto">
    <n-card
      :title="$t('auth.signIn.form.title')"
      size="small"
      class="mx-auto w-full max-w-md"
    >
      <SignInWithCredentialsForm class="mb-5" />

      <n-divider>{{ $t("auth.signIn.form.or") }}</n-divider>

      <SignInWithFacebookForm class="w-full" />
    </n-card>
  </div>
</template>

<style scoped></style>
