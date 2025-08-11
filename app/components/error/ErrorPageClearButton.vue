<template>
  <p v-if="session !== null">
    <n-button @click="handleGoDashboard">
      Go back to dashboard.
    </n-button>
  </p>

  <p v-else>
    <n-button @click="handleGoHome">
      <template #default>
        <span>
          Retour à l'accueil
        </span>
      </template>
    </n-button>
  </p>
</template>

<script lang="ts" setup>
const session = useSupabaseSession();

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
