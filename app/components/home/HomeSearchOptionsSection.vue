<template>
  <section class="py-20 bg-[#ffeee5] ">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <n-h2 class="font-roslindale-bold">
        Comment voulez-vous lancer votre recherche ?
      </n-h2>

      <n-grid
        cols="2"
        x-gap="8"
        y-gap="8"
        responsive="screen"
      >
        <n-grid-item>
          <div class="text-center space-y-6">
            <n-h3>
              J'explore, je filtre et je trouve !
            </n-h3>
            <n-p class="">
              Parcourez tous les bureaux disponibles et filtrez selon vos critères.
            </n-p>
            <n-card class="w-full max-w-sm mx-auto">
              <img :src="budgetRange">
            </n-card>
            <div class="space-y-4">
              <NuxtLink to="search">
                <n-button
                  type="primary"
                  class="w-full"
                  tag="span"
                >
                  <template #icon>
                    <Icon name="mdi:search" />
                  </template>
                  Voir 8 283 annonces
                </n-button>
              </NuxtLink>
            </div>
          </div>
        </n-grid-item>

        <n-grid-item>
          <div class="text-center space-y-6">
            <n-h3>
              Je demande conseil !
            </n-h3>

            <n-p class="">
              Envoyez-nous vos critères : nous les revaliderons ensemble.
            </n-p>

            <n-flex
              vertical
              justify="center"
              align="center"
            >
              <n-avatar-group
                :options="options.slice(0, 5)"
                :size="40"
              />
              <n-avatar-group
                :options="options.slice(5, 9)"
                :size="40"
              />
            </n-flex>

            <n-button
              type="primary"
              secondary
              class="w-full"
              @click="scrollToContact"
            >
              Confier ma recherche
            </n-button>
          </div>
        </n-grid-item>
      </n-grid>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { AvatarGroupOption } from 'naive-ui';

import staff1 from '~/assets/images/avatars/staffs/staff_1.webp';
import staff2 from '~/assets/images/avatars/staffs/staff_2.webp';
import staff3 from '~/assets/images/avatars/staffs/staff_3.webp';
import staff4 from '~/assets/images/avatars/staffs/staff_4.webp';
import staff5 from '~/assets/images/avatars/staffs/staff_5.webp';
import staff6 from '~/assets/images/avatars/staffs/staff_6.webp';
import staff7 from '~/assets/images/avatars/staffs/staff_7.webp';
import staff8 from '~/assets/images/avatars/staffs/staff_8.webp';
import staff9 from '~/assets/images/avatars/staffs/staff_9.webp';
import budgetRange from '~/assets/images/illustrations/features/budget-range.png';

const options: AvatarGroupOption[] = [
  {
    src: staff1,
  },
  {
    src: staff2,
  },
  {
    src: staff3,
  },
  {
    src: staff4,
  },
  {
    src: staff5,
  },
  {
    src: staff6,
  },
  {
    src: staff7,
  },
  {
    src: staff8,
  },
  {
    src: staff9,
  },
];

const emit = defineEmits<{
  scrollToContact: [];
}>();

const scrollToContact = () => {
  emit('scrollToContact');
};
</script>
