<template>
  <n-card
    embedded
    class=""
  >
    <template #header>
      <n-h2>
        <NuxtLink
          :to="link"
          :alt="name"
          target="_blank"
          external
          class="text-lg font-bold"
        >{{ name }}</NuxtLink>
      </n-h2>

      <n-text>{{ description }}</n-text>
    </template>
  </n-card>
</template>

<script setup lang="ts">
interface Props {
  description: string;
  id: string;
  link: string;
  name: string;
}

defineProps<Props>();
</script>
