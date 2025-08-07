<template>
  <p v-if="loggedIn">
    <n-button @click="handleGoDashboard">
      Go back to dashboard.
    </n-button>
  </p>

  <p v-else>
    <n-button @click="handleGoHome">
      <template #default>
        <span>
          {{ $t("errors.ctas.goBackHome") }}
        </span>
      </template>
    </n-button>
  </p>
</template>

<script lang="ts" setup>
const { loggedIn } = useUserSession();

const localeRoute = useLocaleRoute();

const handleGoHome = () => {
  clearError({
    redirect: localeRoute('index')?.href,
  });
};

const handleGoDashboard = () => {
  clearError({
    redirect: localeRoute('dashboard')?.href,
  });
};
</script>

<style scoped></style>
