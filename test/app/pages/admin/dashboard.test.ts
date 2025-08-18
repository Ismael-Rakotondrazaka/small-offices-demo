import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';

import AdminDashboard from '~/pages/admin/dashboard.vue';

vi.mock('~/composables/useUserSession', () => ({
  useUserSession: () => ({
    user: {
      value: {
        email: 'admin@example.com',
        firstName: 'Admin',
        id: 'test-user-id',
        lastName: 'User',
      },
    },
  }),
}));

describe('AdminDashboard', () => {
  it('renders dashboard with metrics', async () => {
    const wrapper = await mountSuspended(AdminDashboard);

    expect(wrapper.text()).toContain('Tableau de bord');
    expect(wrapper.text()).toContain('Vue d\'ensemble de votre activité');
  });

  it('displays metrics cards', async () => {
    const wrapper = await mountSuspended(AdminDashboard);

    expect(wrapper.text()).toContain('Total bureaux');
    expect(wrapper.text()).toContain('Total leads');
    expect(wrapper.text()).toContain('Leads en attente');
    expect(wrapper.text()).toContain('Taux de conversion');
  });

  it('shows quick actions', async () => {
    const wrapper = await mountSuspended(AdminDashboard);

    expect(wrapper.text()).toContain('Actions rapides');
    expect(wrapper.text()).toContain('Gérer les bureaux');
    expect(wrapper.text()).toContain('Gérer les leads');
    expect(wrapper.text()).toContain('Ajouter un bureau');
    expect(wrapper.text()).toContain('Analytics');
  });
});
