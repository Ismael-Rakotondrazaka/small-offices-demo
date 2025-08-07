import { createPage, setup } from '@nuxt/test-utils/e2e';
import { describe, expect, it } from 'vitest';

await setup({
  host: import.meta.env.VITE_PUBLIC_APP_URL,
});

describe('GET /', () => {
  it('should render welcome page with correct title', async () => {
    const page = await createPage('/');

    const h1Locator = page.locator('h1');

    expect(await h1Locator.isVisible()).toBe(true);
    expect(await h1Locator.innerText()).toContain('Nuxt Fusion');
  });
});
