<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <n-h1>Modifier le bureau</n-h1>

    <OfficeEditForm
      v-if="data"
      :office="data.data"
      @update:office="handleUpdateOffice"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
});

const route = useRoute('admin-offices-slug-modifier');

const router = useRouter();

const { data }: Awaited<RequestToAsyncData<ShowOfficeRequest>> = await useFetch(`/api/offices/${route.params.slug}`);

const handleUpdateOffice = (office: Serialize<OfficeDTO>) => {
  if (data.value) {
    data.value.data = office;
  }
  else {
    data.value = {
      data: office,
    };
  }

  return router.back();
};
</script>

<style scoped></style>
