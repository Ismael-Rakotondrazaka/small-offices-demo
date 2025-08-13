import type { IndexOfficeRequestQuery } from './shared/domains/offices/indexOfficeRequest';

export type StaticPageLink = {
  href: string;
  name: string;
  path: string;
  props: {
    propsQuery: {
      arr?: number[];
    } & IndexOfficeRequestQuery;
  };
};

export const staticPageLinks: StaticPageLink[] = [
  {
    href: '/coworking-paris',
    name: 'coworking-paris',
    path: '/coworking-paris',
    props: {
      propsQuery: {
        'page': 1,
        'pageSize': 15,
        'type[equals]': 'OPEN_SPACE',
      },
    } as const,
  },
  {
    href: '/bureaux-paris',
    name: 'bureaux-paris',
    path: '/bureaux-paris',
    props: {
      propsQuery: {
        page: 1,
        pageSize: 15,
      },
    },
  },
  {
    href: '/coworking-paris-1',
    name: 'coworking-paris-1',
    path: '/coworking-paris-1',
    props: {
      propsQuery: {
        'arr': [1],
        'page': 1,
        'pageSize': 15,
        'type[equals]': 'OPEN_SPACE',
      },
    } as const,
  },
  {
    href: '/coworking-paris-2',
    name: 'coworking-paris-2',
    path: '/coworking-paris-2',
    props: {
      propsQuery: {
        'arr': [2],
        'page': 1,
        'pageSize': 15,
        'type[equals]': 'OPEN_SPACE',
      },
    } as const,
  },
  {
    href: '/coworking-paris-3',
    name: 'coworking-paris-3',
    path: '/coworking-paris-3',
    props: {
      propsQuery: {
        'arr': [3],
        'page': 1,
        'pageSize': 15,
        'type[equals]': 'OPEN_SPACE',
      },
    } as const,
  },
  {
    href: '/coworking-paris-4',
    name: 'coworking-paris-4',
    path: '/coworking-paris-4',
    props: {
      propsQuery: {
        'arr': [4],
        'page': 1,
        'pageSize': 15,
        'type[equals]': 'OPEN_SPACE',
      },
    } as const,
  },
  {
    href: '/coworking-paris-5',
    name: 'coworking-paris-5',
    path: '/coworking-paris-5',
    props: {
      propsQuery: {
        'arr': [5],
        'page': 1,
        'pageSize': 15,
        'type[equals]': 'OPEN_SPACE',
      },
    } as const,
  },
  {
    href: '/coworking-paris-6',
    name: 'coworking-paris-6',
    path: '/coworking-paris-6',
    props: {
      propsQuery: {
        'arr': [6],
        'page': 1,
        'pageSize': 15,
        'type[equals]': 'OPEN_SPACE',
      },
    } as const,
  },
  {
    href: '/coworking-paris-7',
    name: 'coworking-paris-7',
    path: '/coworking-paris-7',
    props: {
      propsQuery: {
        'arr': [7],
        'page': 1,
        'pageSize': 15,
        'type[equals]': 'OPEN_SPACE',
      },
    } as const,
  },
  {
    href: '/coworking-paris-8',
    name: 'coworking-paris-8',
    path: '/coworking-paris-8',
    props: {
      propsQuery: {
        'arr': [8],
        'page': 1,
        'pageSize': 15,
        'type[equals]': 'OPEN_SPACE',
      },
    } as const,
  },
  {
    href: '/coworking-paris-9',
    name: 'coworking-paris-9',
    path: '/coworking-paris-9',
    props: {
      propsQuery: {
        'arr': [9],
        'page': 1,
        'pageSize': 15,
        'type[equals]': 'OPEN_SPACE',
      },
    } as const,
  },
  {
    href: '/coworking-paris-10',
    name: 'coworking-paris-10',
    path: '/coworking-paris-10',
    props: {
      propsQuery: {
        'arr': [10],
        'page': 1,
        'pageSize': 15,
        'type[equals]': 'OPEN_SPACE',
      },
    } as const,
  },
  {
    href: '/coworking-paris-11',
    name: 'coworking-paris-11',
    path: '/coworking-paris-11',
    props: {
      propsQuery: {
        'arr': [11],
        'page': 1,
        'pageSize': 15,
        'type[equals]': 'OPEN_SPACE',
      },
    } as const,
  },
  {
    href: '/coworking-paris-12',
    name: 'coworking-paris-12',
    path: '/coworking-paris-12',
    props: {
      propsQuery: {
        'arr': [12],
        'page': 1,
        'pageSize': 15,
        'type[equals]': 'OPEN_SPACE',
      },
    } as const,
  },
  {
    href: '/coworking-paris-13',
    name: 'coworking-paris-13',
    path: '/coworking-paris-13',
    props: {
      propsQuery: {
        'arr': [13],
        'page': 1,
        'pageSize': 15,
        'type[equals]': 'OPEN_SPACE',
      },
    } as const,
  },
  {
    href: '/coworking-paris-14',
    name: 'coworking-paris-14',
    path: '/coworking-paris-14',
    props: {
      propsQuery: {
        'arr': [14],
        'page': 1,
        'pageSize': 15,
        'type[equals]': 'OPEN_SPACE',
      },
    } as const,
  },
  {
    href: '/coworking-paris-15',
    name: 'coworking-paris-15',
    path: '/coworking-paris-15',
    props: {
      propsQuery: {
        'arr': [15],
        'page': 1,
        'pageSize': 15,
        'type[equals]': 'OPEN_SPACE',
      },
    } as const,
  },
  {
    href: '/coworking-paris-16',
    name: 'coworking-paris-16',
    path: '/coworking-paris-16',
    props: {
      propsQuery: {
        'arr': [16],
        'page': 1,
        'pageSize': 15,
        'type[equals]': 'OPEN_SPACE',
      },
    } as const,
  },
  {
    href: '/coworking-paris-17',
    name: 'coworking-paris-17',
    path: '/coworking-paris-17',
    props: {
      propsQuery: {
        'arr': [17],
        'page': 1,
        'pageSize': 15,
        'type[equals]': 'OPEN_SPACE',
      },
    } as const,
  },
  {
    href: '/coworking-paris-18',
    name: 'coworking-paris-18',
    path: '/coworking-paris-18',
    props: {
      propsQuery: {
        'arr': [18],
        'page': 1,
        'pageSize': 15,
        'type[equals]': 'OPEN_SPACE',
      },
    } as const,
  },
  {
    href: '/coworking-paris-19',
    name: 'coworking-paris-19',
    path: '/coworking-paris-19',
    props: {
      propsQuery: {
        'arr': [19],
        'page': 1,
        'pageSize': 15,
        'type[equals]': 'OPEN_SPACE',
      },
    } as const,
  },
  {
    href: '/coworking-paris-20',
    name: 'coworking-paris-20',
    path: '/coworking-paris-20',
    props: {
      propsQuery: {
        'arr': [20],
        'page': 1,
        'pageSize': 15,
        'type[equals]': 'OPEN_SPACE',
      },
    } as const,
  },
];

export const getStaticPageLinksByGroup = () => {
  const links1 = staticPageLinks.slice(0, 9);
  const links2 = staticPageLinks.slice(9, 18);
  const links3 = staticPageLinks.slice(18);

  return {
    links1,
    links2,
    links3,
  };
};
