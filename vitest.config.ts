import { defineVitestProject } from '@nuxt/test-utils/config';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
    },
    projects: [
      {
        test: {
          environment: 'node',
          include: ['test/server/**/*.{test,spec}.ts'],
          name: 'unit',
        },
      },
      {
        test: {
          environment: 'node',
          include: ['test/shared/**/*.{test,spec}.ts'],
          name: 'shared',
        },
      },
      await defineVitestProject({
        test: {
          environment: 'nuxt',
          include: ['test/app/*.{test,spec}.ts'],
          name: 'nuxt',
        },
      }),
    ],
  },
});
