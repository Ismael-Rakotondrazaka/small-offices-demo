import type { RouterConfig } from '@nuxt/schema';

import { staticPageLinks } from '~~/static-pages';

export default {
  routes(_routes) {
    const staticRoutes = staticPageLinks.map(link => ({
      component: () => import('~/pages/search.vue'),
      name: link.name,
      path: link.path,
      props: link.props,
    }));

    return _routes.concat(staticRoutes);
  },
} satisfies RouterConfig;
