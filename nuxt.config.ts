// https://nuxt.com/docs/api/configuration/nuxt-config
import { generateAntdColorThemes } from '@bg-dev/nuxt-naiveui/utils';
import tailwindcss from '@tailwindcss/vite';

const makeLocaleFiles = (locale: string) =>
  [
    'about',
    'app',
    'auth',
    'dashboard',
    'dates',
    'errors',
    'forms',
    'header',
    'home',
    'pinia',
    'posts',
    'sider',
    'users',
  ].map(name => `${locale}/${name}.json`);

/* eslint-disable nuxt/nuxt-config-keys-order */
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          charset: 'utf-8',
        },
      ],
    },
  },

  colorMode: {
    // * Without prefix nor suffix to meet tailwindcss color mode
    classPrefix: '',
    classSuffix: '',
    componentName: 'ColorScheme',
    fallback: 'light', // fallback value if not system preference found
    preference: 'system', // default value of $colorMode.preference
  },

  compatibilityDate: '2025-07-15',

  css: ['~/assets/styles/main.css', '~/assets/styles/tailwind.css'],

  devtools: {
    enabled: true,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  fonts: {},

  gtag: {
    config: {
      send_page_view: true,
    },
  },

  i18n: {
    defaultLocale: 'fr',
    experimental: {
      localeDetector: './localeDetector.ts',
    },
    langDir: 'locales',
    locales: [
      {
        code: 'fr',
        files: makeLocaleFiles('fr'),
        iso: 'fr-FR',
        name: 'Français',
      },
    ],
    strategy: 'no_prefix',
    vueI18n: './i18n.config.ts',
  },

  image: {
    format: ['webp', 'svg', 'png'],
  },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/seo',
    '@nuxt/fonts',
    '@vee-validate/nuxt',
    '@nuxt/image',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@bg-dev/nuxt-naiveui',
    'nuxt-zod-i18n',
    '@nuxtjs/i18n',
    'nuxt-auth-utils',
    'nuxt-authorization',
    'nuxt-gtag',
    '@nuxt/test-utils/module',
    '@nuxtjs/supabase',
  ],

  naiveui: {
    themeConfig: {
      ...generateAntdColorThemes({
        primary: '#302aa7',
      }),
    },
  },

  robots: {
    disallow: [],
  },

  routeRules: {},

  runtimeConfig: {
    /* ------------------------------ File Storage ------------------------------ */
    fileStorageBucketEntryPoint: '',
    fileStorageBucketName: '',
    fileStorageServiceAccountName: '',
    fileStorageSignedUrlExpiration: 60 * 60 * 24, // 1 day,

    informationEmail: '',
    public: {
      appUrl: 'http://localhost:3000',
      appVersion: '1.0.0',
    },
    /* ---------------------------------- SMTP ---------------------------------- */
    smtpHost: '',
    smtpPassword: '',

    smtpPort: '',

    smtpUser: '',
  },

  site: {
    defaultLocale: 'fr',
    description:
      'Accédez à tous les bureaux du marché. Votre conseiller vous accompagne en visite et vous aide à négocier. Le tout gratuitement.',
    indexable: true,
    name: 'Petit Bureaux',
  },

  typescript: {
    shim: false,
    strict: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  zodI18n: {
    /**
     * Since we choose to use 'fr' as locales' code,
     * we have to tell zodI18n to use those codes instead of the default ones.
     */
    localeCodesMapping: {
      'fr-FR': 'fr',
    },
  },
});
