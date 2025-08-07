<template>
  <NuxtLinkLocale
    :to="{
      name: 'posts-id',
      params: {
        id: post.id,
      },
    }"
  >
    <n-card embedded>
      <template #header>
        <div class="flex items-center gap-5">
          <n-avatar
            size="large"
            circle
            :src="post.author.image ?? undefined"
          >
            <template #fallback>
              <span class="flex h-full w-full items-center justify-center">
                <n-text>{{ post.author.firstName[0] }}</n-text>
              </span>
            </template>
          </n-avatar>

          <div class="flex-col justify-start gap-3">
            <n-h3 class="!mb-0">
              {{ fullname }}
            </n-h3>

            <n-p
              depth="3"
              class="!mt-0"
            >
              {{ $d(post.createdAt) }}
            </n-p>
          </div>
        </div>
      </template>

      <template #default>
        <n-p class="whitespace-pre-wrap">
          {{ post.content }}
        </n-p>

        <NuxtImg
          v-if="post.image"
          :src="post.image.url"
          class="mt-5 aspect-video w-full object-cover"
        />
      </template>
    </n-card>
  </NuxtLinkLocale>
</template>

<script lang="ts" setup>
interface Props {
  post: PostDTO;
}

const props = defineProps<Props>();
const fullname = useFullname(() => props.post.author);
</script>

<style scoped></style>
