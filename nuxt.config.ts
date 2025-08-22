// https://nuxt.com/docs/api/configuration/nuxt-config
import { generateAntdColorThemes } from '@bg-dev/nuxt-naiveui/utils';
import tailwindcss from '@tailwindcss/vite';

import { staticPageLinks } from './static-pages';

const makeLocaleFiles = (locale: string) =>
  [
    'dates',
    'errors',
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

  experimental: {
    typedPages: true,
  },

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
    image: {
      domains: ['localhost', 'picsum.photos'],
    },
  },

  linkChecker: {
    enabled: true,
  },

  modules: [
    'nuxt-api-shield',
    '@nuxt/eslint',
    '@nuxtjs/seo',
    '@vee-validate/nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@bg-dev/nuxt-naiveui',
    'nuxt-zod-i18n',
    '@nuxtjs/i18n',
    'nuxt-gtag',
    '@nuxt/test-utils/module',
    '@nuxtjs/supabase',
    '@nuxt/scripts',
    '@nuxtjs/leaflet',
  ],

  naiveui: {
    themeConfig: {
      ...generateAntdColorThemes({
        primary: '#302aa7',
      }),
    },
  },

  nitro: {
    prerender: {
      routes: staticPageLinks.map(link => link.path),
    },
  },

  // @see https://github.com/rrd108/nuxt-api-shield
  nuxtApiShield: {
    delayOnBan: true,
    errorMessage: 'Trop de requêtes',
    limit: {
      ban: 3_600, // 1 hour
      duration: 3_600, // 1 hour
      max: process.env.NUXT_API_SHIELD_MAX_REQUESTS ? Number(process.env.NUXT_API_SHIELD_MAX_REQUESTS) : 100, // 100 requests per duration
    },
    log: {
      attempts: 0, // disable logging
      path: '', // disable logging
    },
  },

  ogImage: {

  },

  robots: {
    disallow: [
      '/admin/**',
    ],
  },

  routeRules: {
    '/api/__sitemap__/offices': {
      // isr: 86_400, Use to cache on CDN
      swr: 86_400, // 1 day
    },
  },

  runtimeConfig: {
    /* ---------------------------------- Security ---------------------------------- */
    apiShieldMaxRequests: 100,

    informationEmail: '',

    public: {
      appUrl: 'http://localhost:3000',
      appVersion: '1.0.0',

      /* ------------------------------ File Storage ------------------------------ */
      fileStorageBucketEntryPoint: '',
      fileStorageBucketName: '',
    },
    /* ---------------------------------- SMTP ---------------------------------- */
    smtpHost: '',
    smtpPassword: '',
    smtpPort: '',

    smtpUser: '',
  },

  schemaOrg: {
  },

  site: {
    defaultLocale: 'fr',
    description:
      'Accédez à tous les bureaux du marché. Votre conseiller vous accompagne en visite et vous aide à négocier. Le tout gratuitement.',
    indexable: true,
    name: 'Petits Bureaux',
  },

  sitemap: {
    sitemaps: {
      offices: {
        sources: [
          '/api/__sitemap__/offices',
        ],
      },
      pages: {
        include: [
          '/',
          '/contact',
          '/search',
        ],
        includeAppSources: true,
      },
      prerender: {
        include: [
          '/bureaux-*',
        ],
        includeAppSources: true,
      },
    },
  },

  supabase: {
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 365 * 10,
      sameSite: 'lax',
      secure: true,
    },

    redirect: false,
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
