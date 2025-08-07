<template>
  <n-card
    embedded
    class="mb-7 last:mb-0"
  >
    <template #header>
      <n-space items="center">
        <n-skeleton
          size="large"
          circle
        />

        <n-space vertical>
          <n-skeleton
            width="7rem"
            height="1rem"
          />
          <n-skeleton
            width="7rem"
            height="0.5rem"
          />
        </n-space>
      </n-space>
    </template>

    <template #default>
      <n-skeleton
        text
        :repeat="3"
        class=""
      />

      <n-skeleton class="mt-5 aspect-video h-full w-full" />
    </template>
  </n-card>
</template>

<script lang="ts" setup></script>

<style scoped></style>
