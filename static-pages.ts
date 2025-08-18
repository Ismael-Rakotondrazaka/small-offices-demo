import type { IndexOfficeRequestQuery } from './shared/domains/offices/indexOfficeRequest';

export type StaticPageLink = {
  path: string;
  pathName: string;
  props: {
    propsQuery: {
      arr?: number[];
    } & IndexOfficeRequestQuery;
  };
  textContent: string;
};

export const staticPageLinks: StaticPageLink[] = [
  {
    path: '/bureaux-paris',
    pathName: 'bureaux-paris',
    props: {
      propsQuery: {
        page: 1,
        pageSize: 15,
      },
    },
    textContent: 'Location de bureaux à Paris',
  },
  {
    path: '/bureaux-paris-1',
    pathName: 'bureaux-paris-1',
    props: {
      propsQuery: {
        arr: [1],
        page: 1,
        pageSize: 15,
      },
    } as const,
    textContent: 'Location de bureaux à Paris 1',
  },
  {
    path: '/bureaux-paris-2',
    pathName: 'bureaux-paris-2',
    props: {
      propsQuery: {
        arr: [2],
        page: 1,
        pageSize: 15,
      },
    } as const,
    textContent: 'Location de bureaux à Paris 2',
  },
  {
    path: '/bureaux-paris-3',
    pathName: 'bureaux-paris-3',
    props: {
      propsQuery: {
        arr: [3],
        page: 1,
        pageSize: 15,
      },
    } as const,
    textContent: 'Location de bureaux à Paris 3',
  },
  {
    path: '/bureaux-paris-4',
    pathName: 'bureaux-paris-4',
    props: {
      propsQuery: {
        arr: [4],
        page: 1,
        pageSize: 15,
      },
    } as const,
    textContent: 'Location de bureaux à Paris 4',
  },
  {
    path: '/bureaux-paris-5',
    pathName: 'bureaux-paris-5',
    props: {
      propsQuery: {
        arr: [5],
        page: 1,
        pageSize: 15,
      },
    } as const,
    textContent: 'Location de bureaux à Paris 5',
  },
  {
    path: '/bureaux-paris-6',
    pathName: 'bureaux-paris-6',
    props: {
      propsQuery: {
        arr: [6],
        page: 1,
        pageSize: 15,
      },
    } as const,
    textContent: 'Location de bureaux à Paris 6',
  },
  {
    path: '/bureaux-paris-7',
    pathName: 'bureaux-paris-7',
    props: {
      propsQuery: {
        arr: [7],
        page: 1,
        pageSize: 15,
      },
    } as const,
    textContent: 'Location de bureaux à Paris 7',
  },
  {
    path: '/bureaux-paris-8',
    pathName: 'bureaux-paris-8',
    props: {
      propsQuery: {
        arr: [8],
        page: 1,
        pageSize: 15,
      },
    } as const,
    textContent: 'Location de bureaux à Paris 8',
  },
  {
    path: '/bureaux-paris-9',
    pathName: 'bureaux-paris-9',
    props: {
      propsQuery: {
        arr: [9],
        page: 1,
        pageSize: 15,
      },
    } as const,
    textContent: 'Location de bureaux à Paris 9',
  },
  {
    path: '/bureaux-paris-10',
    pathName: 'bureaux-paris-10',
    props: {
      propsQuery: {
        arr: [10],
        page: 1,
        pageSize: 15,
      },
    } as const,
    textContent: 'Location de bureaux à Paris 10',
  },
  {
    path: '/bureaux-paris-11',
    pathName: 'bureaux-paris-11',
    props: {
      propsQuery: {
        arr: [11],
        page: 1,
        pageSize: 15,
      },
    } as const,
    textContent: 'Location de bureaux à Paris 11',
  },
  {
    path: '/bureaux-paris-12',
    pathName: 'bureaux-paris-12',
    props: {
      propsQuery: {
        arr: [12],
        page: 1,
        pageSize: 15,
      },
    } as const,
    textContent: 'Location de bureaux à Paris 12',
  },
  {
    path: '/bureaux-paris-13',
    pathName: 'bureaux-paris-13',
    props: {
      propsQuery: {
        arr: [13],
        page: 1,
        pageSize: 15,
      },
    } as const,
    textContent: 'Location de bureaux à Paris 13',
  },
  {
    path: '/bureaux-paris-14',
    pathName: 'bureaux-paris-14',
    props: {
      propsQuery: {
        arr: [14],
        page: 1,
        pageSize: 15,
      },
    } as const,
    textContent: 'Location de bureaux à Paris 14',
  },
  {
    path: '/bureaux-paris-15',
    pathName: 'bureaux-paris-15',
    props: {
      propsQuery: {
        arr: [15],
        page: 1,
        pageSize: 15,
      },
    } as const,
    textContent: 'Location de bureaux à Paris 15',
  },
  {
    path: '/bureaux-paris-16',
    pathName: 'bureaux-paris-16',
    props: {
      propsQuery: {
        arr: [16],
        page: 1,
        pageSize: 15,
      },
    } as const,
    textContent: 'Location de bureaux à Paris 16',
  },
  {
    path: '/bureaux-paris-17',
    pathName: 'bureaux-paris-17',
    props: {
      propsQuery: {
        arr: [17],
        page: 1,
        pageSize: 15,
      },
    } as const,
    textContent: 'Location de bureaux à Paris 17',
  },
  {
    path: '/bureaux-paris-18',
    pathName: 'bureaux-paris-18',
    props: {
      propsQuery: {
        arr: [18],
        page: 1,
        pageSize: 15,
      },
    } as const,
    textContent: 'Location de bureaux à Paris 18',
  },
  {
    path: '/bureaux-paris-19',
    pathName: 'bureaux-paris-19',
    props: {
      propsQuery: {
        arr: [19],
        page: 1,
        pageSize: 15,
      },
    } as const,
    textContent: 'Location de bureaux à Paris 19',
  },
  {
    path: '/bureaux-paris-20',
    pathName: 'bureaux-paris-20',
    props: {
      propsQuery: {
        arr: [20],
        page: 1,
        pageSize: 15,
      },
    } as const,
    textContent: 'Location de bureaux à Paris 20',
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
