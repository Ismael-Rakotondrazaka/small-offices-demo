<template>
  <div
    class="relative flex h-full w-full flex-nowrap justify-between bg-white p-10 text-gray-900"
  >
    <div class="flex items-center justify-center">
      <div class="w-full">
        <p class="mb-4 text-[24px] font-semibold uppercase text-primary">
          Demande de visite
        </p>
        <h1
          class="m-0 mb-4 flex w-[600px] items-center text-[75px] font-semibold"
        >
          <span>{{ officeTitle || 'Bureau' }}</span>
        </h1>
        <p class="text-[32px] leading-tight text-slate-500">
          Paris {{ officeArr || '' }} · {{ officePosts || 0 }} postes · {{ formattedPrice }}/mois
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  officeArr?: number;
  officePosts?: number;
  officePrice?: number;
  officeTitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  officeArr: 0,
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
</script>
