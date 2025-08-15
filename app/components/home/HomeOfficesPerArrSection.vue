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
            :key="link.name"
            :to="link.href"
            class="w-full mb-2 inline-block"
          >
            <n-button
              tag="span"
              type="primary"
              primary
              text
            >
              {{ getLinkText(link) }}
            </n-button>
          </NuxtLink>
        </n-grid-item>

        <n-grid-item span="3 m:2 l:1 xl:1 2xl:1">
          <NuxtLink
            v-for="link in links2"
            :key="link.name"
            :to="link.href"
            class="w-full mb-2 inline-block"
          >
            <n-button
              tag="span"
              type="primary"
              primary
              text
            >
              {{ getLinkText(link) }}
            </n-button>
          </NuxtLink>
        </n-grid-item>

        <n-grid-item span="3 m:2 l:1 xl:1 2xl:1">
          <NuxtLink
            v-for="link in links3"
            :key="link.name"
            :to="link.href"
            class="w-full mb-2 inline-block"
          >
            <n-button
              tag="span"
              type="primary"
              primary
              text
            >
              {{ getLinkText(link) }}
            </n-button>
          </NuxtLink>
        </n-grid-item>
      </n-grid>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { StaticPageLink } from '~~/static-pages';

import { getStaticPageLinksByGroup } from '~~/static-pages';

const { links1, links2, links3 } = getStaticPageLinksByGroup();

const getLinkText = (link: StaticPageLink): string => {
  if (link.name === 'coworking-paris') {
    return 'Espaces de coworking à Paris';
  }

  if (link.name === 'bureaux-paris') {
    return 'Location de bureaux à Paris';
  }

  const arrondissement = link.name.replace('coworking-paris-', '');
  return `Espaces de coworking à Paris ${arrondissement}`;
};
</script>

<style>

</style>
