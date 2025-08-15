<template>
  <section class="py-20 bg-gray-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <n-h2 class="font-roslindale-bold">
        Nos derniers bureaux
      </n-h2>

      <n-grid
        v-if="data !== undefined"
        cols="4"
        x-gap="8"
        y-gap="8"
        class="mb-5"
        item-responsive
        responsive="screen"
      >
        <n-grid-item
          v-for="office in data.data"
          :key="office.id"
          span="4 m:2 l:1 xl:1 2xl:1"
        >
          <OfficeListItem :office="office" />
        </n-grid-item>
      </n-grid>

      <div class="flex justify-end">
        <NuxtLink :to="{ name: 'search' }">
          <n-button
            type="primary"
            size="large"
            tag="span"
          >
            Explorer les bureaux
          </n-button>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const query: IndexOfficeRequestQuery = {
  'orderBy[createdAt]': 'desc',
  'page': 1,
  'pageSize': 4,
};

const { data }: Awaited<RequestToAsyncData<IndexOfficeRequest>> = useFetch('/api/offices', {
  query,
});
</script>
