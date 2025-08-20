import { defineVitestProject } from '@nuxt/test-utils/config';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        // @see https://vitest.dev/config/#coverage-exclude
        'coverage/**',
        'dist/**',
        '**/node_modules/**',
        '**/[.]**',
        'packages/*/test?(s)/**',
        '**/*.d.ts',
        '**/virtual:*',
        '**/__x00__*',
        '**/\x00*',
        'cypress/**',
        'test?(s)/**',
        'test?(-*).?(c|m)[jt]s?(x)',
        '**/*{.,-}{test,spec,bench,benchmark}?(-d).?(c|m)[jt]s?(x)',
        '**/__tests__/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
        '**/vitest.{workspace,projects}.[jt]s?(on)',
        '**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}',

        // custom
        'scripts/**',
      ],

      provider: 'v8',
    },
    projects: [
      await defineVitestProject({
        test: {
          environment: 'node',
          include: ['test/server/**/*.{test,spec}.ts'],
          name: 'unit',
        },
      }),
      await defineVitestProject({
        test: {
          environment: 'node',
          include: ['test/shared/**/*.{test,spec}.ts'],
          name: 'shared',
        },
      }),
      await defineVitestProject({
        test: {
          environment: 'node',
          include: ['test/server/core/**/*.{test,spec}.ts'],
          name: 'server-core',
        },
      }),
      await defineVitestProject({
        test: {
          environment: 'node',
          include: ['test/server/api/**/*.{test,spec}.ts'],
          name: 'server-api',
        },
      }),
      await defineVitestProject({
        test: {
          environment: 'nuxt',
          include: ['test/app/**/*.{test,spec}.ts'],
          name: 'nuxt',
        },
      }),
      await defineVitestProject({
        test: {
          environment: 'nuxt',
          include: ['test/app/components/**/*.{test,spec}.ts'],
          name: 'app-components',
        },
      }),
      await defineVitestProject({
        test: {
          environment: 'nuxt',
          include: ['test/app/pages/**/*.{test,spec}.ts'],
          name: 'app-pages',
        },
      }),
      await defineVitestProject({
        test: {
          environment: 'nuxt',
          include: ['test/app/components/button/**/*.{test,spec}.ts'],
          name: 'app-components-button',
        },
      }),
    ],
  },
});
