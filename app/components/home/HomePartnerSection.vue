<template>
  <section class="py-20 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto">
      <n-h2 class="text-center">
        Petits Bureaux est partenaire de tous les acteurs du bureau flexible
      </n-h2>

      <n-flex
        justify="center"
        align="center"
        size="large"
      >
        <img
          v-for="partner in partners"
          :key="partner"
          :src="partner"
          class="w-24 h-24"
        >
      </n-flex>

      <n-p class="text-center">
        ... et bien d'autres que vous ne connaissez pas encore !
      </n-p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import partner1 from '~/assets/images/partners/partner-1.svg';
import partner10 from '~/assets/images/partners/partner-10.svg';
import partner11 from '~/assets/images/partners/partner-11.svg';
import partner12 from '~/assets/images/partners/partner-12.svg';
import partner2 from '~/assets/images/partners/partner-2.svg';
import partner3 from '~/assets/images/partners/partner-3.svg';
import partner4 from '~/assets/images/partners/partner-4.svg';
import partner5 from '~/assets/images/partners/partner-5.svg';
import partner6 from '~/assets/images/partners/partner-6.svg';
import partner7 from '~/assets/images/partners/partner-7.svg';
import partner8 from '~/assets/images/partners/partner-8.svg';
import partner9 from '~/assets/images/partners/partner-9.svg';

const partners = [
  partner1,
  partner2,
  partner3,
  partner4,
  partner5,
  partner6,
  partner7,
  partner8,
  partner9,
  partner10,
  partner11,
  partner12,
];
</script>

<style>

</style>
