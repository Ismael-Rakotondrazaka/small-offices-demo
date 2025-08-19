<template>
  <div
    class="relative flex flex-col items-center justify-center h-full w-full bg-white p-8 text-gray-900 overflow-hidden"
  >
    <div
      v-if="imgUrl"
      class="absolute inset-0 w-full h-full"
      :style="`background-image: url('${imgUrl}'); background-size: cover; background-position: center; filter: blur(4px) brightness(0.7);`"
    />

    <!-- <img
      v-if="imgUrl"
      :src="imgUrl"
      :alt="officeTitle"
      class="w-64 h-48 object-cover rounded-lg"
    > -->
    <div class="relative flex flex-col items-center w-full">
      <h1 class="text-4xl font-bold mb-2">
        {{ officeTitle }}
      </h1>
      <p class="text-2xl text-slate-600 mb-1">
        Paris {{ officeArr }}
      </p>
      <p class="text-xl text-slate-500 mb-4">
        {{ officePosts }} postes · {{ formattedPrice }}/mois
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  officeArr?: number;
  officePhoto?: string;
  officePosts?: number;
  officePrice?: number;
  officeTitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  officeArr: 0,
  officePhoto: undefined,
  officePosts: 0,
  officePrice: 0,
  officeTitle: '',
});

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    currency: 'EUR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: 'currency',
  }).format(price);
};

const formattedPrice = computed(() => {
  return formatPrice(props.officePrice);
});

const img = useImage();

const imgUrl = computed(() => {
  return props.officePhoto
    ? img(props.officePhoto, {
        format: 'jpeg',
        height: 90,
        width: 160,
      })
    : null;
});
</script>
