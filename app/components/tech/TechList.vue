<template>
  <n-grid
    :x-gap="12"
    :y-gap="12"
    cols="3 200:1 600:3"
  >
    <n-grid-item
      v-for="tech in techs"
      :key="tech.id"
    >
      <TechListItem
        v-bind="tech"
        class="w-full"
      />
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts" setup>
interface Props {
  techs?: {
    description: string;
    id: string;
    link: string;
    name: string;
  }[];
}

withDefaults(defineProps<Props>(), {
  techs: (): {
    description: string;
    id: string;
    link: string;
    name: string;
  }[] => [],
});
</script>

<style scoped></style>
