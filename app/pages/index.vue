<template>
  <div class="mx-auto w-full max-w-4xl p-3">
    <n-h1>Nuxt Fusion</n-h1>

    <n-p>{{ $t("app.description") }}</n-p>

    <n-p>{{ $t("home.introduction") }}</n-p>

    <n-grid
      :x-gap="12"
      :y-gap="12"
      cols="3 200:1 600:3 1200:4"
    >
      <n-grid-item
        v-for="(feature, i) in features"
        :key="i"
      >
        <n-card
          embedded
          class=""
        >
          <template #header>
            <n-flex
              :wrap="false"
              align="center"
            >
              <Icon
                :name="feature.icon"
                size="2rem"
                class="align-text-bottom"
              />

              <div>
                {{ feature.name }}
              </div>
            </n-flex>
          </template>

          <template #default>
            <n-text class="!mb-0">
              {{ feature.description }}
            </n-text>
          </template>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
defineOgImageComponent('DefaultOgImage');

const features = [
  {
    description:
      'Seamless authentication with multiple providers, powered by @sidebase/nuxt-auth.',
    icon: 'mdi:shield-key',
    name: 'Secure Authentication',
  },
  {
    description:
      'Create a multilingual web app with @nuxtjs/i18n, including translated error messages.',
    icon: 'mdi:translate',
    name: 'Internationalization',
  },
  {
    description: 'Switch effortlessly between dark and light modes.',
    icon: 'mdi:theme-light-dark',
    name: 'Dark/Light Mode',
  },
  {
    description: 'Enhance your site\'s SEO effortlessly with @nuxtjs/seo.',
    icon: 'mdi:search-web',
    name: 'SEO Optimization',
  },
  {
    description: 'Optimize code, images, and fonts for better performance.',
    icon: 'mdi:rocket',
    name: 'Performance Optimization',
  },
  {
    description: 'Integrate Google Analytics for comprehensive site metrics.',
    icon: 'mdi:google-analytics',
    name: 'Google Analytics Integration',
  },
  {
    description:
      'Utilize a wide array of components with Naive UI for a sleek and functional interface.',
    icon: 'mdi:view-dashboard-outline',
    name: 'Rich Components',
  },
  {
    description: 'Access over 100,000 icons with Iconify integration.',
    icon: 'mdi:image-filter',
    name: 'Extensive Icon Library',
  },
  {
    description: 'Manage application state efficiently with Pinia.',
    icon: 'mdi:store',
    name: 'State Management',
  },
  {
    description: 'Customize and manage file uploads with multiple providers.',
    icon: 'mdi:file-upload',
    name: 'File Upload',
  },
  {
    description: 'Send emails seamlessly using nodemailer.',
    icon: 'mdi:email',
    name: 'Email Sending',
  },
  {
    description: 'Simplify data fetching and management with Prisma.',
    icon: 'mdi:database-sync',
    name: 'Database ORM',
  },
  {
    description:
      'Ensure end-to-end type safety with robust validation using zod.',
    icon: 'mdi:code-tags',
    name: 'Typesafe APIs',
  },
  {
    description: 'Boost developer productivity with Eslint, and more.',
    icon: 'mdi:tools',
    name: 'Enhanced Developer Experience',
  },
  {
    description: 'Efficient error management with multilingual messages.',
    icon: 'mdi:alert',
    name: 'Error Handling',
  },
  {
    description: 'Nuxt 4 directory structure ready.',
    icon: 'mdi:folder-star',
    name: 'Well-Structured Project',
  },
  {
    description: 'Ensure code reliability with integrated testing frameworks.',
    icon: 'mdi:test-tube',
    name: 'Automated Testing',
  },
];
</script>

<style scoped></style>
