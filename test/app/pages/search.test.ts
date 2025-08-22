import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

describe('Search Page', () => {
  it('should handle posts[gte] parameter correctly', async () => {
    const mockRoute = {
      query: {
        'posts[gte]': '5',
      },
    };

    const mockRouter = {
      push: vi.fn(),
    };

    const wrapper = mount(await import('~/pages/search.vue'), {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.postsGte).toBe(5);
  });

  it('should handle posts[gte] parameter with 0 value', async () => {
    const mockRoute = {
      query: {
        'posts[gte]': '0',
      },
    };

    const mockRouter = {
      push: vi.fn(),
    };

    const wrapper = mount(await import('~/pages/search.vue'), {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.postsGte).toBe(0);
  });

  it('should handle posts range update correctly', async () => {
    const mockRoute = {
      query: {},
    };

    const mockRouter = {
      push: vi.fn(),
    };

    const wrapper = mount(await import('~/pages/search.vue'), {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    await wrapper.vm.$nextTick();

    await wrapper.vm.onUpdatePostsRangeHandler(5, 20);

    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'search',
      query: expect.objectContaining({
        'posts[gte]': 5,
        'posts[lte]': 20,
      }),
    });
  });
});
