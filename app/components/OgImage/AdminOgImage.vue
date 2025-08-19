<template>
  <div
    class="relative flex h-full w-full flex-nowrap justify-between bg-white p-10 text-gray-900"
  >
    <div class="flex items-center justify-center">
      <div class="w-full">
        <p class="mb-4 text-[24px] font-semibold uppercase text-primary">
          Administration
        </p>
        <h1
          class="m-0 mb-4 flex w-[600px] items-center text-[75px] font-semibold"
        >
          <span>{{ pageTitle || 'Back-office' }}</span>
        </h1>
        <p class="text-[32px] leading-tight text-slate-500">
          Gestion des bureaux et leads
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  pageTitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  pageTitle: '',
});
</script> 