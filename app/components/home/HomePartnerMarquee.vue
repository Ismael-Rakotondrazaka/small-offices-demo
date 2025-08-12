<template>
  <n-marquee>
    <img
      v-for="(partner, index) in partners"
      :key="index"
      :src="partner"
      class="w-24 h-24 mr-20 inline-block"
      :alt="`Partner ${index + 1}`"
    >
  </n-marquee>
</template>

<script lang="ts" setup>
import partner1 from '~/assets/images/partners/partner-1.svg';
import partner10 from '~/assets/images/partners/partner-10.svg';
import partner11 from '~/assets/images/partners/partner-11.svg';
import partner12 from '~/assets/images/partners/partner-12.svg';
import partner13 from '~/assets/images/partners/partner-13.svg';
import partner14 from '~/assets/images/partners/partner-14.svg';
import partner15 from '~/assets/images/partners/partner-15.svg';
import partner16 from '~/assets/images/partners/partner-16.svg';
import partner17 from '~/assets/images/partners/partner-17.svg';
import partner18 from '~/assets/images/partners/partner-18.svg';
import partner19 from '~/assets/images/partners/partner-19.svg';
import partner2 from '~/assets/images/partners/partner-2.svg';
import partner20 from '~/assets/images/partners/partner-20.svg';
import partner21 from '~/assets/images/partners/partner-21.svg';
import partner22 from '~/assets/images/partners/partner-22.svg';
import partner23 from '~/assets/images/partners/partner-23.svg';
import partner24 from '~/assets/images/partners/partner-24.svg';
import partner25 from '~/assets/images/partners/partner-25.svg';
import partner26 from '~/assets/images/partners/partner-26.svg';
import partner27 from '~/assets/images/partners/partner-27.svg';
import partner28 from '~/assets/images/partners/partner-28.svg';
import partner29 from '~/assets/images/partners/partner-29.svg';
import partner3 from '~/assets/images/partners/partner-3.svg';
import partner30 from '~/assets/images/partners/partner-30.svg';
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
  partner13,
  partner14,
  partner15,
  partner16,
  partner17,
  partner18,
  partner19,
  partner20,
  partner21,
  partner22,
  partner23,
  partner24,
  partner25,
  partner26,
  partner27,
  partner28,
  partner29,
  partner30,
];
</script>

<style>

</style>
