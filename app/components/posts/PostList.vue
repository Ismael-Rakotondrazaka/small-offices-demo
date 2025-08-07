<template>
  <ul>
    <li
      v-for="post in posts"
      :key="post.id"
      class="mb-7 last:mb-0"
    >
      <PostListItem :post="post" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
interface Props {
  posts: PostDTO[];
}

defineProps<Props>();
</script>

<style scoped></style>
