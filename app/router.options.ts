import type { RouterConfig } from '@nuxt/schema';
import type { RouteRecordRaw, RouteRecordRedirect } from 'vue-router';

import { staticPageLinks } from '~~/static-pages';

export default {
  routes(_routes) {
    const staticRoutes: RouteRecordRaw[] = staticPageLinks.map(link => ({
      component: () => import('~/pages/search.vue'),
      name: link.pathName,
      path: link.path,
      props: link.props,
    }));

    const soft404Routes: RouteRecordRedirect = {
      name: 'not-found',
      path: '/:pathMatch(.*)*',
      redirect: '/search',
    };

    return [
      ..._routes,
      ...staticRoutes,
      soft404Routes,
    ];
  },
} satisfies RouterConfig;
