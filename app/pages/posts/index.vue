<template>
  <div class="mx-auto h-full w-full max-w-2xl p-3">
    <IndexPostSkeleton
      v-if="status === 'pending'"
      class="w-full"
    />

    <div
      v-else-if="data === undefined"
      class=""
    >
      <n-empty
        size="huge"
        :description="error?.message ?? $t('errors.default')"
      />
    </div>

    <div v-else>
      <n-h1>{{ $t("posts.index.title") }}</n-h1>
      <n-h2>
        <i18n-t
          keypath="posts.index.results"
          tag="span"
          scope="global"
        >
          <template #count>
            <span class="font-bold">{{ data.pagination.totalCount }} </span>
          </template>
        </i18n-t>
      </n-h2>

      <PostList
        :posts="data.data"
        class="mb-5"
      />

      <n-pagination
        v-model:page="newPage"
        v-model:page-size="newPageSize"
        :page-count="data.pagination.totalPages"
        size="large"
        show-quick-jumper
        show-size-picker
        :page-sizes="pageSizes"
        :on-update:page="onPageUpdateHandler"
        :on-update:page-size="onPageSizeUpdateHandler"
        class="justify-center"
      />

      <ClientOnly v-if="loggedIn">
        <Teleport to="body">
          <NuxtLinkLocale
            :to="{
              name: 'posts-create',
            }"
            class="animate-pulse"
          >
            <n-button
              type="primary"
              size="large"
              class="absolute bottom-20 right-4"
            >
              <template #icon>
                <Icon name="mdi:plus" />
              </template>

              <template #default>
                {{ $t("posts.index.newPost") }}
              </template>
            </n-button>
          </NuxtLinkLocale>
        </Teleport>
      </ClientOnly>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOgImageComponent('DefaultOgImage');

const route = useRoute('posts');

const { loggedIn } = useUserSession();

const localeRoute = useLocaleRoute();

const page = computed(() =>
  typeof route.query.page === 'string' ? Number.parseInt(route.query.page) : 1,
);
const newPage = ref<number>(page.value);

const PAGE_SIZE_DEFAULT_VALUE = 20;

const pageSize = computed(() =>
  typeof route.query.pageSize === 'string'
    ? Number.parseInt(route.query.pageSize)
    : PAGE_SIZE_DEFAULT_VALUE,
);
const newPageSize = ref(pageSize.value);

const pageSizes = Array.from(
  {
    length: 5,
  },
  (_, i) => PAGE_SIZE_DEFAULT_VALUE * (i + 1) * 2,
);

const { locale } = useI18n({
  useScope: 'global',
});
const headers = computed(() => ({
  'accept-language': locale.value,
}));

const query = computed(() => ({
  page: page.value,
  pageSize: pageSize.value,
}));

const { data, error, status }: Awaited<RequestToAsyncData<IndexPostRequest>>
  = await useFetch('/api/posts', {
    headers,
    immediate: true,
    lazy: true,
    method: 'GET',
    query,
  });

const onPageUpdateHandler = (newPageValue: number) => {
  newPage.value = newPageValue;

  navigateTo(
    localeRoute({
      name: 'posts',
      query: {
        page: newPageValue,
        pageSize: pageSize.value,
      },
    }),
  );
};
const onPageSizeUpdateHandler = (newPageSizeValue: number) => {
  newPageSize.value = newPageSizeValue;

  navigateTo(
    localeRoute({
      name: 'posts',
      query: {
        page: page.value,
        pageSize: newPageSizeValue,
      },
    }),
  );
};
</script>

<style scoped></style>
