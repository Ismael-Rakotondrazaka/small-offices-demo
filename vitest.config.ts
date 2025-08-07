import { defineVitestConfig } from '@nuxt/test-utils/config';

/**
 * @see https://nuxt.com/docs/getting-started/testing
 * @see https://vitest.dev/guide/
 */
export default defineVitestConfig({
  test: {
    coverage: {
      provider: 'v8',
    },
  },
});
