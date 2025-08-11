<script lang="ts" setup>
definePageMeta({
  middleware: 'admin-guest',
});
</script>

<template>
  <div class="container mx-auto">
    <n-card
      title="Se connecter"
      size="small"
      class="mx-auto w-full max-w-md"
    >
      <SignInWithCredentialsForm class="mb-5" />
    </n-card>
  </div>
</template>

<style scoped></style>
