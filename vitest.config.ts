import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
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
    environment: 'nuxt',
    globalSetup: ['./test/setup/global/dbInitSQLSetup.ts'],
    setupFiles: ['./test/setup/dbMemorySetup.ts'],
  },
});
