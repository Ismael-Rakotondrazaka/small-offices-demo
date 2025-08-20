import { $fetch, setup } from '@nuxt/test-utils/e2e';
import { describe, expect, it } from 'vitest';

await setup({
  host: import.meta.env.NUXT_PUBLIC_APP_URL,
});

describe('GET /api/healthz', async () => {
  it('should return a 200', async () => {
    const response = await $fetch('/api/healthz');

    expect(Object.keys(response).sort()).toStrictEqual(
      ['status', 'startupTime', 'baseUrl', 'time', 'appVersion'].sort(),
    );
    expect(response.status).toString();
  });
});
