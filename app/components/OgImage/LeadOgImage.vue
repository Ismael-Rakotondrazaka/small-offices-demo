<template>
  <div
    class="relative flex h-full w-full flex-nowrap justify-between bg-white p-10 text-gray-900"
  >
    <div class="flex items-center justify-center w-full">
      <div class="flex items-center gap-8 w-full">
        <div class="flex-1">
          <p class="mb-4 text-[24px] font-semibold uppercase text-primary">
            Demande de visite
          </p>
          <h1
            class="m-0 mb-4 text-[60px] font-semibold leading-tight"
          >
            {{ officeTitle || 'Bureau' }}
          </h1>
          <p class="text-[32px] leading-tight text-slate-500 mb-2">
            Paris {{ officeArr || '' }}
          </p>
          <p class="text-[28px] leading-tight text-slate-600">
            {{ officePosts || 0 }} postes · {{ formattedPrice }}/mois
          </p>
        </div>
        <div class="flex-shrink-0">
          <div class="w-[400px] h-[300px] bg-gradient-to-br from-orange-50 to-amber-100 rounded-lg shadow-lg flex items-center justify-center">
            <div class="text-center">
              <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon
                  name="mdi:calendar-check"
                  class="text-white text-2xl"
                />
              </div>
              <p class="text-gray-600 text-lg font-medium">
                Visite gratuite
              </p>
              <p class="text-gray-500 text-sm">
                Accompagnement personnalisé
              </p>
            </div>
          </div>
        </div>
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
