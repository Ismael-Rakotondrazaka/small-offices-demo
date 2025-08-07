<template>
  <div class="mx-auto w-full max-w-4xl p-3">
    <n-h1>Techs</n-h1>

    <n-h2 class="mb-3 text-lg font-bold">
      Backend :
    </n-h2>
    <TechList
      class="mb-7"
      :techs="backendTechs"
    />

    <n-h2 class="mb-3 text-lg font-bold">
      Frontend :
    </n-h2>
    <TechList
      class="mb-7"
      :techs="frontendTechs"
    />

    <n-h2 class="mb-3 text-lg font-bold">
      DX :
    </n-h2>
    <TechList
      class="mb-7"
      :techs="dxTechs"
    />

    <n-h2 class="mb-3 text-lg font-bold">
      Utilities :
    </n-h2>
    <TechList
      class="mb-7"
      :techs="utilityTechs"
    />
  </div>
</template>

<script lang="ts" setup>
const backendTechs = [
  {
    description: 'Next-generation ORM for Node.js & TypeScript.',
    id: 'prisma',
    link: 'https://www.prisma.io',
    name: 'Prisma',
  },
  {
    description: 'Node.js client for Google Cloud Storage.',
    id: '@google-cloud/storage',
    link: 'https://www.npmjs.com/package/@google-cloud/storage',
    name: '@google-cloud/storage',
  },
  {
    description: 'Send e-mails with Node.JS.',
    id: 'nodemailer',
    link: 'https://nodemailer.com',
    name: 'nodemailer',
  },
  {
    description: 'Authentication module for Nuxt 3.',
    id: 'sidebase-auth',
    link: 'https://sidebase.io',
    name: '@sidebase/auth',
  },
  {
    description: 'TypeScript-first schema declaration and validation library.',
    id: 'zod',
    link: 'https://zod.dev',
    name: 'zod',
  },
];

const frontendTechs = [
  {
    description: 'The Intuitive Vue Framework.',
    id: 'nuxt-3',
    link: 'https://nuxt.com',
    name: 'Nuxt 3',
  },
  {
    description: 'A Vue 3 Component Library.',
    id: 'naive-ui',
    link: 'https://www.naiveui.com',
    name: 'Naive UI',
  },
  {
    description: 'A utility-first CSS framework for rapid UI development.',
    id: 'tailwindcss',
    link: 'https://tailwindcss.com',
    name: 'TailwindCSS',
  },
  {
    description: 'The intuitive store for Vue.',
    id: 'pinia',
    link: 'https://pinia.vuejs.org',
    name: 'Pinia',
  },
  {
    description: 'Nuxt internationalization module.',
    id: 'nuxtjs-i18n',
    link: 'https://i18n.nuxtjs.org',
    name: '@nuxtjs/i18n',
  },
  {
    description: 'Optimized images module for Nuxt.',
    id: 'nuxt-image',
    link: 'https://image.nuxtjs.org',
    name: '@nuxt/image',
  },
  {
    description: 'Dark and Light mode with auto detection made easy with Nuxt.',
    id: 'nuxtjs-color-mode',
    link: 'https://color-mode.nuxtjs.org',
    name: '@nuxtjs/color-mode',
  },
  {
    description: 'Font management module for Nuxt.',
    id: 'nuxt-fonts',
    link: 'https://nuxt.com/modules/fonts',
    name: '@nuxt/fonts',
  },
  {
    description:
      'Icon module for Nuxt with 100,000+ ready to use icons from Iconify.',
    id: 'icon',
    link: 'https://nuxt.com/modules/icon',
    name: '@nuxt/icon',
  },
  {
    description: 'SEO module for Nuxt.',
    id: 'nuxtjs-seo',
    link: 'https://nuxtseo.com/',
    name: '@nuxtjs/seo',
  },
  {
    description: 'Google Analytics module for Nuxt.',
    id: 'nuxt-gtag',
    link: 'https://nuxt.com/modules/gtag',
    name: 'nuxt-gtag',
  },
];

const dxTechs = [
  {
    description: 'Find and fix problems in your JavaScript code.',
    id: 'eslint',
    link: 'https://eslint.org',
    name: 'ESLint',
  },
  {
    description: 'A logger for just about everything.',
    id: 'winston',
    link: 'https://github.com/winstonjs/winston',
    name: 'winston',
  },
  {
    description: 'A transport for winston which logs to a rotating file.',
    id: 'winston-daily-rotate-file',
    link: 'https://www.npmjs.com/package/winston-daily-rotate-file',
    name: 'winston-daily-rotate-file',
  },
];

const utilityTechs = [
  {
    description: 'VueUse integration for Nuxt.',
    id: 'vueuse-nuxt',
    link: 'https://vueuse.org',
    name: '@vueuse/nuxt',
  },
  {
    description: 'Form validation for Nuxt.',
    id: 'vee-validate-nuxt',
    link: 'https://vee-validate.logaretm.com/v4/integrations/nuxt/',
    name: '@vee-validate/nuxt',
  },
  {
    description:
      'Generate massive amounts of fake data in Node.js and the browser.',
    id: 'faker',
    link: 'https://fakerjs.dev',
    name: '@faker-js/faker',
  },
  {
    description:
      'Validation helpers for zod specifically for parsing FormData or URLSearchParams.',
    id: 'zod-form-data',
    link: 'https://www.npmjs.com/package/zod-form-data',
    name: 'zod-form-data',
  },
  {
    description: 'An API for MIME type information.',
    id: 'mime',
    link: 'https://www.npmjs.com/package/mime',
    name: 'mime',
  },
  {
    description: 'Constants enumerating the HTTP status codes.',
    id: 'http-status-codes',
    link: 'https://www.npmjs.com/package/http-status-codes',
    name: 'http-status-codes',
  },
  {
    description: 'URL utils for humans.',
    id: 'ufo',
    link: 'https://www.npmjs.com/package/ufo',
    name: 'ufo',
  },
  {
    description: 'Sanitize untrusted HTML to prevent XSS.',
    id: 'xss',
    link: 'https://www.npmjs.com/package/xss',
    name: 'xss',
  },
  {
    description:
      'Highly configurable, well-tested, JavaScript-based HTML minifier.',
    id: 'html-minifier-terser',
    link: 'https://www.npmjs.com/package/html-minifier-terser',
    name: 'html-minifier-terser',
  },
  {
    description: 'Logic-less {{mustache}} templates with JavaScript.',
    id: 'mustache',
    link: 'https://www.npmjs.com/package/mustache',
    name: 'mustache',
  },
  {
    description: 'Test utilities for Nuxt.',
    id: '@nuxt/test-utils',
    link: 'https://www.npmjs.com/package/@nuxt/test-utils',
    name: '@nuxt/test-utils',
  },
  {
    description: 'V8 coverage provider for Vitest.',
    id: '@vitest/coverage-v8',
    link: 'https://www.npmjs.com/package/@vitest/coverage-v8',
    name: '@vitest/coverage-v8',
  },
  {
    description: 'UI for Vitest.',
    id: '@vitest/ui',
    link: 'https://www.npmjs.com/package/@vitest/ui',
    name: '@vitest/ui',
  },
  {
    description:
      'A JavaScript implementation of a web browser without its graphical user interface.',
    id: 'happy-dom',
    link: 'https://www.npmjs.com/package/happy-dom',
    name: 'happy-dom',
  },
  {
    description: 'A high level API to automate web browsers.',
    id: 'playwright-core',
    link: 'https://www.npmjs.com/package/playwright-core',
    name: 'playwright-core',
  },
  {
    description: 'Next generation testing framework powered by Vite.',
    id: 'vitest',
    link: 'https://www.npmjs.com/package/vitest',
    name: 'vitest',
  },
];
</script>

<style scoped></style>
