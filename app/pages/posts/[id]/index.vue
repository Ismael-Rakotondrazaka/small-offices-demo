<template>
  <div class="mx-auto w-full max-w-2xl p-3">
    <div v-if="data">
      <n-h1>
        <i18n-t
          keypath="posts.show.title"
          scope="global"
        >
          <template #fullName>
            <span class="font-bold">{{ data.data.author.firstName }}</span>
          </template>
        </i18n-t>
      </n-h1>

      <PostListItem :post="data.data" />
    </div>
    <div v-else-if="status === 'error'">
      <n-empty
        size="huge"
        :description="error?.message ?? $t('errors.default')"
      />
    </div>
    <ShowPostSkeleton
      v-else
      class="w-full"
    />
  </div>
</template>

<script lang="ts" setup>
defineOgImageComponent('DefaultOgImage');

const route = useRoute('posts-id');

const params = computed<{ id: string }>(() => route.params as { id: string });

const { locale } = useI18n({
  useScope: 'global',
});
const headers = computed(() => ({
  'accept-language': locale.value,
}));

const { data, error, status }: Awaited<RequestToAsyncData<ShowPostRequest>>
  = await useFetch(() => `/api/posts/${params.value.id}`, {
    headers,
    immediate: true,
    lazy: true,
    method: 'GET',
  });
</script>

<style scoped></style>
