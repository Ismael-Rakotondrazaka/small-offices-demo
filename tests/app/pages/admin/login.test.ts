import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';

import AdminLogin from '~/pages/admin/login.vue';

vi.mock('~/composables/useUserSession', () => ({
  useUserSession: () => ({
    user: {
      value: null,
    },
  }),
}));

describe('AdminLogin', () => {
  it('renders admin login page', async () => {
    const wrapper = await mountSuspended(AdminLogin);

    expect(wrapper.text()).toContain('Connexion Administration');
    expect(wrapper.text()).toContain('Accédez à votre espace d\'administration');
  });

  it('displays admin login form', async () => {
    const wrapper = await mountSuspended(AdminLogin);

    expect(wrapper.text()).toContain('Identifiants d\'administration');
    expect(wrapper.text()).toContain('Connectez-vous avec vos identifiants d\'administration');
  });

  it('shows back to site link', async () => {
    const wrapper = await mountSuspended(AdminLogin);

    expect(wrapper.text()).toContain('Retourner au site');
    expect(wrapper.text()).toContain('Accueil');
  });

  it('displays logo and branding', async () => {
    const wrapper = await mountSuspended(AdminLogin);

    const logo = wrapper.find('img[alt="Petits Bureaux"]');
    expect(logo.exists()).toBe(true);
  });
});
