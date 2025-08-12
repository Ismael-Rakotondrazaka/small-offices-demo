<template>
  <section class="py-20 bg-[#e5fbda] dark:bg-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <n-h2 class="font-roslindale-bold">
        5 000 entreprises ont trouvé leurs bureaux avec Petits Bureaux
      </n-h2>

      <n-carousel
        :slides-per-view="slidesPerView"
        :space-between="20"
        :loop="false"
        :show-arrow="true"
        :show-dots="true"
        :autoplay="false"
        draggable
      >
        <template #arrow="{ prev, next }">
          <n-flex justify="flex-end">
            <n-button
              type="primary"
              tertiary
              @click="prev"
            >
              <Icon
                name="mdi:arrow-left"
              />
            </n-button>
            <n-button
              type="primary"
              tertiary
              @click="next"
            >
              <Icon
                name="mdi:arrow-right"
              />
            </n-button>
          </n-flex>
        </template>

        <n-carousel-item
          v-for="testimonial in testimonials"
          :key="testimonial.id"
        >
          <n-card
            :title="testimonial.type"
            class="w-full max-w-sm"
          >
            <n-tag
              size="small"
              type="info"
            >
              <template #icon>
                <Icon
                  name="mdi:account-group"
                />
              </template>
              {{ testimonial.capacity }}
            </n-tag>
            <n-p>
              {{ testimonial.quote }}
            </n-p>
            <n-p
              class="mb-0"
            >
              {{ testimonial.author }}
            </n-p>
            <n-p depth="3">
              {{ testimonial.position }} @ {{ testimonial.company }}
            </n-p>
          </n-card>
        </n-carousel-item>
      </n-carousel>

      <n-h3 class="text-center">
        Ils nous font confiance
      </n-h3>

      <HomePartnerMarquee />

      <div class="flex items-center justify-center">
        <ScriptYouTubePlayer
          ref="video"
          video-id="mY827LBxRWg"
          class="w-full md:max-w-3xl"
        >
          <template #awaitingLoad>
            <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[48px] w-[68px]">
              <svg
                height="100%"
                version="1.1"
                viewBox="0 0 68 48"
                width="100%"
              ><path
                d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                fill="#f00"
              /><path
                d="M 45,24 27,14 27,34"
                fill="#fff"
              /></svg>
            </div>
          </template>
        </ScriptYouTubePlayer>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const { isDesktop, isLaptop, isLargeDesktop } = useCustomWindowSize();

const slidesPerView = computed(() => {
  if (isDesktop.value || isLargeDesktop.value) {
    return 3;
  }

  if (isLaptop.value) {
    return 2;
  }

  return 1;
});

type Testimonial = {
  author: string;
  capacity: string;
  company: string;
  icon: string;
  id: number;
  position: string;
  quote: string;
  type: string;
};

const testimonials: Testimonial[] = [
  {
    author: 'Quentin',
    capacity: '6 postes',
    company: 'Sunlight Solutions',
    icon: 'mdi:door-closed',
    id: 1,
    position: 'COO',
    quote: 'Nous avons fait appel à Petits Bureaux pour trouver de nouveaux bureaux en moins d\'une semaine. Noémie a su nous accompagner et a pris en compte notre urgence, pour un résultat dans les temps et 100% raccord avec nos besoins. Merci !',
    type: 'Bureau fermé',
  },
  {
    author: 'Mads',
    capacity: '200 postes',
    company: 'Flatpay',
    icon: 'mdi:floor-plan',
    id: 2,
    position: 'Managing Director',
    quote: 'Paul is a beast',
    type: 'Espace indépendant',
  },
  {
    author: 'Andrea',
    capacity: '15 postes',
    company: 'Price Hubble',
    icon: 'mdi:door-closed',
    id: 3,
    position: 'Manager',
    quote: 'Nous avons dû trouver de nouveaux bureaux en urgence et Victorien a été extrêmement réactif. Il a rapidement proposé des lieux qui correspondaient parfaitement à nos besoins et à notre budget.',
    type: 'Bureau fermé',
  },
  {
    author: 'Bruno',
    capacity: '36 postes',
    company: 'Yusco',
    icon: 'mdi:floor-plan',
    id: 4,
    position: 'CEO',
    quote: 'Relation très fluide avec Petits Bureaux et Vincent qui a été mon interlocuteur patient et efficace et nous a aidé à trouver les bureaux qu\'il nous faut pour nous développer.',
    type: 'Espace indépendant',
  },
  {
    author: 'Jérôme',
    capacity: '14 postes',
    company: 'Allday',
    icon: 'mdi:floor-plan',
    id: 5,
    position: 'CEO',
    quote: 'Solution idéale pour CEO débordé :) Interlocuteur disponible et réactif. Le changement de locaux était important mais non prioritaire, et grâce à Paul, cela m\'a pris moins de 3 semaines pour tout finaliser.',
    type: 'Espace indépendant',
  },
  {
    author: 'Clémentine',
    capacity: '75 postes',
    company: 'Cap4 Lab',
    icon: 'mdi:floor-plan',
    id: 6,
    position: 'Directrice relations clients',
    quote: 'Réactivité et professionnalisme : un accompagnement sans faille, très à l\'écoute et réactifs! Merci encore à toute l\'équipe de Petits Bureaux 🙏',
    type: 'Espace indépendant',
  },
];
</script>
