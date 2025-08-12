<template>
  <section class="py-20 bg-gray-50 dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto">
      <n-h2 class="font-roslindale-bold">
        Petits Bureaux vous accompagne partout
      </n-h2>

      <n-grid
        cols="3"
        x-gap="8"
        item-responsive
        responsive="screen"
      >
        <n-grid-item span="3 m:2 l:1 xl:1 2xl:1">
          <NuxtLink
            v-for="link in links1"
            :key="link.text"
            :to="link.link"
            class="w-full mb-2 inline-block"
          >
            <n-button
              tag="span"
              type="primary"
              primary
              text
            >
              {{ link.text }}
            </n-button>
          </NuxtLink>
        </n-grid-item>

        <n-grid-item span="3 m:2 l:1 xl:1 2xl:1">
          <NuxtLink
            v-for="link in links2"
            :key="link.text"
            :to="link.link"
            class="w-full mb-2 inline-block"
          >
            <n-button
              tag="span"
              type="primary"
              primary
              text
            >
              {{ link.text }}
            </n-button>
          </NuxtLink>
        </n-grid-item>

        <n-grid-item span="3 m:2 l:1 xl:1 2xl:1">
          <NuxtLink
            v-for="link in links3"
            :key="link.text"
            :to="link.link"
            class="w-full mb-2 inline-block"
          >
            <n-button
              tag="span"
              type="primary"
              primary
              text
            >
              {{ link.text }}
            </n-button>
          </NuxtLink>
        </n-grid-item>
      </n-grid>
    </div>
  </section>
</template>

<script lang="ts" setup>
const links1 = [
  {
    link: '#',
    text: 'Espaces de coworking à Paris',
  },
  {
    link: '#',
    text: 'Location de bureaux à Paris',
  },
  {
    link: '#',
    text: 'Espaces de coworking à Paris 1',
  },
  {
    link: '#',
    text: 'Espaces de coworking à Paris 2',
  },
  {
    link: '#',
    text: 'Espaces de coworking à Paris 3',
  },
  {
    link: '#',
    text: 'Espaces de coworking à Paris 4',
  },
  {
    link: '#',
    text: 'Espaces de coworking à Paris 5',
  },
  {
    link: '#',
    text: 'Espaces de coworking à Paris 6',
  },
  {
    link: '#',
    text: 'Espaces de coworking à Paris 7',
  },
] as const;

const links2 = [
  {
    link: '#',
    text: 'Espaces de coworking à Paris 8',
  },
  {
    link: '#',
    text: 'Espaces de coworking à Paris 9',
  },
  {
    link: '#',
    text: 'Espaces de coworking à Paris 10',
  },
  {
    link: '#',
    text: 'Espaces de coworking à Paris 11',
  },
  {
    link: '#',
    text: 'Espaces de coworking à Paris 12',
  },
  {
    link: '#',
    text: 'Espaces de coworking à Paris 13',
  },
  {
    link: '#',
    text: 'Espaces de coworking à Paris 14',
  },
  {
    link: '#',
    text: 'Espaces de coworking à Paris 15',
  },
  {
    link: '#',
    text: 'Espaces de coworking à Paris 16',
  },
];

const links3 = [
  {
    link: '#',
    text: 'Espaces de coworking à Paris 17',
  },
  {
    link: '#',
    text: 'Espaces de coworking à Paris 18',
  },
  {
    link: '#',
    text: 'Espaces de coworking à Paris 19',
  },
  {
    link: '#',
    text: 'Espaces de coworking à Paris 20',
  },
];
</script>

<style>

</style>
