<template>
  <div class="">
    <n-skeleton
      height="2rem"
      width="7rem"
      class="mb-7 mt-4"
    />
    <n-skeleton
      height="1.4rem"
      width="15rem"
      class="mb-5"
    />

    <PostListItemSkeleton
      v-for="i in 4"
      :key="i"
      class="b-5"
    />

    <n-space
      justify="center"
      align="center"
      class="!gap-2"
    >
      <n-skeleton
        v-for="i in 11"
        :key="i"
        width="2rem"
        height="2rem"
        class="inline-block"
      />

      <n-skeleton
        width="3rem"
        height="2rem"
        class="inline-block"
      />

      <n-skeleton
        width="3rem"
        height="1.5rem"
        class="inline-block"
      />

      <n-skeleton
        width="3rem"
        height="2rem"
        class="inline-block"
      />
    </n-space>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
