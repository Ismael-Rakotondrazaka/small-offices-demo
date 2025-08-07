<script lang="ts" setup>
const onSignInWithFacebookClickHandler = async () => {
  return navigateTo('/api/auth/facebook', {
    external: true,
  });
};
</script>

<template>
  <n-button
    type="primary"
    @click="onSignInWithFacebookClickHandler"
  >
    <template #icon>
      <Icon
        name="mdi:facebook-box"
        size="1.5rem"
      />
    </template>

    {{ $t("forms.buttons.facebookLogin") }}
  </n-button>
</template>

<style scoped></style>
