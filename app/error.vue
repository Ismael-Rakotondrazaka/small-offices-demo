<template>
  <div>
    <NaiveConfig>
      <NMessageProvider
        placement="bottom-right"
        :duration="5000"
        :keep-alive-on-hover="true"
      >
        <NuxtLayout>
          <main class="w-full min-h-screen flex items-center justify-center p-3 max-w-7xl mx-auto">
            <div>
              <DevOnly>
                <div class="whitespace-pre-wrap">
                  {{ error?.message }}
                </div>
              </DevOnly>

              <!-- @vue-expect-error Property 'url' is missing in type 'NuxtError<unknown>' but required in type 'ResponseError<any>'. -->
              <ErrorPageContent :error="error" />
            </div>
          </main>
        </NuxtLayout>
      </NMessageProvider>
    </NaiveConfig>
  </div>
</template>

<script lang="ts" setup>
import type { NuxtError } from '#app';

interface Props {
  error: NuxtError;
}

defineProps<Props>();
</script>

<style scoped></style>
