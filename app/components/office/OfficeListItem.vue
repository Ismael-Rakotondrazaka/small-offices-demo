<template>
  <n-card
    :title="title"
  >
    <template #cover>
      <n-carousel
        :show-arrow="true"
        :show-dots="true"
        :autoplay="false"
        class="h-48"
      >
        <n-carousel-item
          v-for="photo in office.photos"
          :key="photo.id"
        >
          <NuxtLinkLocale
            :to="{
              name: 'offices-slug',
              params: {
                slug: office.slug,
              },
            }"
          >
            <img
              :src="photo.url"
              :alt="office.title"
              class="w-full h-full object-cover"
            >
          </NuxtLinkLocale>
        </n-carousel-item>
      </n-carousel>
    </template>

    <n-p
      strong
    >
      {{ office.posts }} postes

      ·

      <template v-if="office.services.length">
        {{ office.services.length }} services
      </template>
    </n-p>

    <p>
      <i18n-n
        scope="global"
        tag="span"
        :value="office.price"
        format="currency"
        class="font-bold"
      /> par mois
    </p>
  </n-card>
</template>

<script lang="ts" setup>
interface Props {
  office: Serialize<OfficeDTO>;
}

const props = defineProps<Props>();

const title = computed(() => {
  return `${props.office.title} - Paris ${props.office.arr}`;
});
</script>
