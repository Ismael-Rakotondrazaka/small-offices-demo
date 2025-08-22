<script lang="ts" setup>
definePageMeta({
  middleware: 'admin-guest',
});

const runtimeConfig = useRuntimeConfig();

defineOgImageComponent('OgImageAdmin', {
  pageTitle: 'Connexion',
});

useSeoMeta({
  author: 'Petits Bureaux',
  description: 'Espace d\'administration - Connexion sécurisée pour les conseillers Petits Bureaux',
  keywords: 'administration, conseiller immobilier, gestion bureaux, back-office',
  ogDescription: 'Espace d\'administration - Connexion sécurisée pour les conseillers Petits Bureaux',
  ogLocale: 'fr_FR',
  ogSiteName: 'Petits Bureaux',
  ogTitle: 'Connexion Administration - Petits Bureaux',
  ogType: 'website',
  ogUrl: () => `${runtimeConfig.public.appUrl}/admin/login`,
  robots: 'noindex, nofollow',
  title: 'Connexion Administration - Petits Bureaux',
  twitterCard: 'summary_large_image',
  twitterCreator: () => runtimeConfig.public.appUrl,
  twitterDescription: 'Espace d\'administration - Connexion sécurisée pour les conseillers Petits Bureaux',
  twitterSite: () => runtimeConfig.public.appUrl,
  twitterTitle: 'Connexion Administration - Petits Bureaux',
});
</script>

<template>
  <div class="container mx-auto min-h-screen flex items-center justify-center">
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
