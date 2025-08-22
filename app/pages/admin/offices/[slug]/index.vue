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

      <LocationPreview
        :lat="data.data.lat"
        :lng="data.data.lng"
        class="rounded-lg mb-5"
        style="height: 300px"
      />

      <NuxtLink
        class=""
        :to="{ name: 'admin-offices-slug-modifier', params: { slug: data.data.slug } }"
      >
        <n-button
          type="primary"
          tag="span"
          primary
        >
          <template #icon>
            <Icon
              name="mdi:pencil"
              class="text-2xl"
            />
          </template>

          Modifier
        </n-button>
      </NuxtLink>
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
      <NuxtLink :to="{ name: 'admin-offices' }">
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
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
});

const route = useRoute();

const { data }: Awaited<RequestToAsyncData<ShowOfficeRequest>> = await useFetch(`/api/offices/${route.params.slug}`);

defineOgImageComponent('OgImageAdmin', {
  pageTitle: data.value?.data?.title || 'Détail du bureau',
});

useSeoMeta({
  ogTitle: () => data.value?.data?.title || 'Détail du bureau',
  title: () => data.value?.data?.title || 'Détail du bureau',
});
</script>
