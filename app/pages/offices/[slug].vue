<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <template
      v-if="data"
    >
      <n-image-group>
        <div class="flex flex-wrap gap-2 md:gap-4 mb-6">
          <div
            v-for="photo in data.data.photos"
            :key="photo.id"
            class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 aspect-video"
          >
            <n-image
              :src="photo.url"
              object-fit="cover"
              class="rounded-lg w-full h-full"
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </n-image-group>

      <div class="flex flex-col lg:flex-row gap-8">
        <div class="flex-1 flex flex-col justify-center">
          <n-h1 class="mb-2">
            {{ `${data.data.title} - Paris ${data.data.arr}` }}
          </n-h1>
          <n-p
            strong
          >
            {{ data.data.posts }} postes
            ·
            <template v-if="data.data.services.length">
              {{ data.data.services.length }} services
            </template>
          </n-p>

          <n-flex class="mb-4">
            <n-tag
              v-for="service in data.data.services"
              :key="service.id"
              type="info"
            >
              {{ service.name }}
            </n-tag>
          </n-flex>

          <p class="mb-4">
            <i18n-n
              scope="global"
              tag="span"
              :value="data.data.price"
              format="currency"
              class="font-bold"
            /> par mois
          </p>
        </div>
        <div class="flex-shrink-0 w-full max-w-md">
          <n-card
            title="Ce bureau vous plait ?"
            class=""
          >
            <NuxtLink
              class=""
              :to="{ name: 'lead-slug', params: { slug: data.data.slug } }"
            >
              <n-button
                type="primary"
                tag="span"
                primary
              >
                Demander une visite
              </n-button>
            </NuxtLink>
          </n-card>
        </div>
      </div>
    </template>

    <div
      v-else
      class="text-center py-12"
    >
      <Icon
        name="mdi:alert-circle"
        class="text-6xl text-gray-400 mx-auto mb-4"
      />
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Bureau non trouvé
      </h3>
      <n-p>
        Le bureau que vous recherchez n'existe pas ou a été supprimé.
      </n-p>
      <NuxtLink :to="{ name: 'search' }">
        <n-button
          type="primary"
          tag="span"
        >
          Retour à la recherche
        </n-button>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data }: Awaited<RequestToAsyncData<ShowOfficeRequest>> = await useFetch(`/api/offices/${route.params.slug}`);

const runtimeConfig = useRuntimeConfig();

useSeoMeta({
  author: 'Petits Bureaux',
  description: () => data.value ? `${data.value.data.title} - Paris ${data.value.data.arr}. ${data.value.data.posts} postes disponibles. Accédez à tous les bureaux du marché. Votre conseiller vous accompagne en visite et vous aide à négocier. Le tout gratuitement.` : 'Découvrez nos bureaux disponibles - Petits Bureaux',
  keywords: () => data.value ? `bureau ${data.value.data.title}, location bureau Paris ${data.value.data.arr}, ${data.value.data.posts} postes, immobilier d'entreprise, conseiller immobilier` : 'bureau, location bureaux, immobilier d\'entreprise',
  ogDescription: () => data.value ? `${data.value.data.title} - Paris ${data.value.data.arr}. ${data.value.data.posts} postes disponibles. Accédez à tous les bureaux du marché. Votre conseiller vous accompagne en visite et vous aide à négocier. Le tout gratuitement.` : 'Découvrez nos bureaux disponibles - Petits Bureaux',
  ogImage: () => data.value ? data.value.data.photos?.[0]?.url : null,
  ogImageUrl: () => data.value ? data.value.data.photos?.[0]?.url : null,
  ogLocale: 'fr_FR',
  ogSiteName: 'Petits Bureaux',
  ogTitle: () => data.value ? `${data.value.data.title} | Paris ${data.value.data.arr} | Petits Bureaux` : 'Découvrez nos bureaux | Petits Bureaux',
  ogType: 'website',
  ogUrl: () => data.value ? `${runtimeConfig.public.appUrl}/offices/${data.value.data.slug}` : `${runtimeConfig.public.appUrl}/offices/${route.params.slug}`,
  title: () => data.value ? `${data.value.data.title} | Paris ${data.value.data.arr} | Petits Bureaux` : 'Découvrez nos bureaux | Petits Bureaux',
  twitterCard: 'summary_large_image',
  twitterCreator: () => runtimeConfig.public.appUrl,
  twitterDescription: () => data.value ? `${data.value.data.title} - Paris ${data.value.data.arr}. ${data.value.data.posts} postes disponibles. Accédez à tous les bureaux du marché. Votre conseiller vous accompagne en visite et vous aide à négocier. Le tout gratuitement.` : 'Découvrez nos bureaux disponibles - Petits Bureaux',
  twitterImage: () => data.value ? data.value.data.photos?.[0]?.url : null,
  twitterSite: () => runtimeConfig.public.appUrl,
  twitterTitle: () => data.value ? `${data.value.data.title} | Paris ${data.value.data.arr} | Petits Bureaux` : 'Découvrez nos bureaux | Petits Bureaux',
});
</script>
