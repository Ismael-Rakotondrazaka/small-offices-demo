<template>
  <div class="min-h-screen">
    <HomeHeroSection />

    <HomeOfficeTypesSection />

    <HomePartnerSection />

    <HomeTestimonialsSection />

    <HomeExplanationSection />

    <HomeFaqSection />

    <HomeSearchOptionsSection />

    <HomeOfficesPerArrSection />

    <HomeLatestOfficesSection />
  </div>
</template>

<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();

defineOgImageComponent('OgImageDefault');

useSeoMeta({
  title: 'Petits Bureaux - Accédez à tous les bureaux du marché',
  description: 'Accédez à tous les bureaux du marché. Votre conseiller vous accompagne en visite et vous aide à négocier. Le tout gratuitement.',
  keywords: 'bureaux, location bureaux, coworking, immobilier d\'entreprise, Paris, conseiller immobilier',
  author: 'Petits Bureaux',
 
  ogType: 'website',
  ogTitle: 'Petits Bureaux - Accédez à tous les bureaux du marché',
  ogDescription: 'Accédez à tous les bureaux du marché. Votre conseiller vous accompagne en visite et vous aide à négocier. Le tout gratuitement.',
  ogUrl: () => runtimeConfig.public.appUrl,
  ogSiteName: 'Petits Bureaux',
  ogLocale: 'fr_FR',
  twitterCard: 'summary_large_image',
  twitterSite: () => runtimeConfig.public.appUrl,
  twitterTitle: 'Petits Bureaux - Accédez à tous les bureaux du marché',
  twitterDescription: 'Accédez à tous les bureaux du marché. Votre conseiller vous accompagne en visite et vous aide à négocier. Le tout gratuitement.',
  twitterCreator: () => runtimeConfig.public.appUrl,
});
</script>
