import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { EventHandlerArg } from '../../../../server/core/requests/requestToEventHandler';
import type { IndexOfficeRequest } from '../../../../shared/domains/offices/indexOfficeRequest';

import { IndexOfficeEventHandlerFn } from '../../../../server/domains/offices/indexOfficeEventHandlerFn';
import { PrismaProvider } from '../../../../server/services/prisma/prismaProvider';

describe('IndexOfficeEventHandlerFn', () => {
  beforeEach(async () => {
    // Clean up any existing data before each test
    await PrismaProvider.instance.office.deleteMany({});
    await PrismaProvider.instance.service.deleteMany({});
  });

  it('should return empty data when no offices exist', async () => {
    const request: EventHandlerArg<IndexOfficeRequest> = {
      body: {},
      params: {},
      path: '/api/offices',
      query: {
        page: 1,
        pageSize: 10,
      },
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const result = await IndexOfficeEventHandlerFn(request);

    expect(result.data).toEqual([]);
    expect(result.pagination.count).toBe(0);
    expect(result.pagination.totalPages).toBe(0);
    expect(result.pagination.page).toBe(1);
  });

  it('should return offices with pagination', async () => {
    const office1 = await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 5,
        price: 1000,
        slug: 'office-1',
        title: 'Office 1',
        type: 'OPEN_SPACE',
      },
    });

    const office2 = await PrismaProvider.instance.office.create({
      data: {
        arr: 2,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 10,
        price: 2000,
        slug: 'office-2',
        title: 'Office 2',
        type: 'PRIVATE_OFFICE',
      },
    });

    const request: EventHandlerArg<IndexOfficeRequest> = {
      body: {},
      params: {},
      path: '/api/offices',
      query: {
        'orderBy[createdAt]': 'asc',
        'page': 1,
        'pageSize': 10,
      },
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const result = await IndexOfficeEventHandlerFn(request);

    expect(result.data).toHaveLength(2);
    expect(result.pagination.count).toBe(2);
    expect(result.pagination.totalPages).toBe(1);
    expect(result.data[0].title).toBe(office1.title);
    expect(result.data[1].title).toBe(office2.title);
  });

  it('should filter by arrondissement', async () => {
    await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 5,
        price: 1000,
        slug: 'office-1',
        title: 'Office 1',
        type: 'OPEN_SPACE',
      },
    });

    await PrismaProvider.instance.office.create({
      data: {
        arr: 2,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 10,
        price: 2000,
        slug: 'office-2',
        title: 'Office 2',
        type: 'PRIVATE_OFFICE',
      },
    });

    const request: EventHandlerArg<IndexOfficeRequest> = {
      body: {},
      params: {},
      path: '/api/offices',
      query: {
        'arr[equals]': 1,
        'page': 1,
        'pageSize': 10,
      },
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const result = await IndexOfficeEventHandlerFn(request);

    expect(result.data).toHaveLength(1);
    expect(result.data[0].arr).toBe(1);
    expect(result.pagination.count).toBe(1);
  });

  it('should filter by multiple arrondissements', async () => {
    await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 5,
        price: 1000,
        slug: 'office-1',
        title: 'Office 1',
        type: 'OPEN_SPACE',
      },
    });

    await PrismaProvider.instance.office.create({
      data: {
        arr: 2,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 10,
        price: 2000,
        slug: 'office-2',
        title: 'Office 2',
        type: 'PRIVATE_OFFICE',
      },
    });

    await PrismaProvider.instance.office.create({
      data: {
        arr: 3,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 15,
        price: 3000,
        slug: 'office-3',
        title: 'Office 3',
        type: 'OPEN_SPACE',
      },
    });

    const request: EventHandlerArg<IndexOfficeRequest> = {
      body: {},
      params: {},
      path: '/api/offices',
      query: {
        'arr[in]': [1, 2],
        'page': 1,
        'pageSize': 10,
      },
      setHeaders: () => {},
      userSession: {
        get: vi.fn().mockResolvedValue(null),
        require: vi.fn().mockResolvedValue({ email: 'test@example.com', id: 'user-1' }),
      },
    };

    const result = await IndexOfficeEventHandlerFn(request);

    expect(result.data).toHaveLength(2);
    expect(result.data.map(o => o.arr)).toEqual(expect.arrayContaining([1, 2]));
    expect(result.pagination.count).toBe(2);
  });

  it('should filter by price range', async () => {
    await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 5,
        price: 1000,
        slug: 'office-1',
        title: 'Office 1',
        type: 'OPEN_SPACE',
      },
    });

    await PrismaProvider.instance.office.create({
      data: {
        arr: 2,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 10,
        price: 2000,
        slug: 'office-2',
        title: 'Office 2',
        type: 'PRIVATE_OFFICE',
      },
    });

    await PrismaProvider.instance.office.create({
      data: {
        arr: 3,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 15,
        price: 3000,
        slug: 'office-3',
        title: 'Office 3',
        type: 'OPEN_SPACE',
      },
    });

    const request: EventHandlerArg<IndexOfficeRequest> = {
      body: {},
      params: {},
      path: '/api/offices',
      query: {
        'page': 1,
        'pageSize': 10,
        'price[gte]': 1500,
        'price[lte]': 2500,
      },
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const result = await IndexOfficeEventHandlerFn(request);

    expect(result.data).toHaveLength(1);
    expect(result.data[0].price).toBe(2000);
    expect(result.pagination.count).toBe(1);
  });

  it('should filter by posts range', async () => {
    await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 5,
        price: 1000,
        slug: 'office-1',
        title: 'Office 1',
        type: 'OPEN_SPACE',
      },
    });

    await PrismaProvider.instance.office.create({
      data: {
        arr: 2,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 10,
        price: 2000,
        slug: 'office-2',
        title: 'Office 2',
        type: 'PRIVATE_OFFICE',
      },
    });

    await PrismaProvider.instance.office.create({
      data: {
        arr: 3,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 15,
        price: 3000,
        slug: 'office-3',
        title: 'Office 3',
        type: 'OPEN_SPACE',
      },
    });

    const request: EventHandlerArg<IndexOfficeRequest> = {
      body: {},
      params: {},
      path: '/api/offices',
      query: {
        'page': 1,
        'pageSize': 10,
        'posts[gte]': 8,
        'posts[lte]': 12,
      },
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const result = await IndexOfficeEventHandlerFn(request);

    expect(result.data).toHaveLength(1);
    expect(result.data[0].posts).toBe(10);
    expect(result.pagination.count).toBe(1);
  });

  it('should filter by office type', async () => {
    await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 5,
        price: 1000,
        slug: 'office-1',
        title: 'Office 1',
        type: 'OPEN_SPACE',
      },
    });

    await PrismaProvider.instance.office.create({
      data: {
        arr: 2,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 10,
        price: 2000,
        slug: 'office-2',
        title: 'Office 2',
        type: 'PRIVATE_OFFICE',
      },
    });

    const request: EventHandlerArg<IndexOfficeRequest> = {
      body: {},
      params: {},
      path: '/api/offices',
      query: {
        'page': 1,
        'pageSize': 10,
        'type[equals]': 'OPEN_SPACE',
      },
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const result = await IndexOfficeEventHandlerFn(request);

    expect(result.data).toHaveLength(1);
    expect(result.data[0].type).toBe('OPEN_SPACE');
    expect(result.pagination.count).toBe(1);
  });

  it('should search by title or slug', async () => {
    await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 5,
        price: 1000,
        slug: 'modern-coworking',
        title: 'Modern Coworking Space',
        type: 'OPEN_SPACE',
      },
    });

    await PrismaProvider.instance.office.create({
      data: {
        arr: 2,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 10,
        price: 2000,
        slug: 'private-office',
        title: 'Private Office Suite',
        type: 'PRIVATE_OFFICE',
      },
    });

    const request: EventHandlerArg<IndexOfficeRequest> = {
      body: {},
      params: {},
      path: '/api/offices',
      query: {
        page: 1,
        pageSize: 10,
        search: 'coworking',
      },
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const result = await IndexOfficeEventHandlerFn(request);

    expect(result.data).toHaveLength(1);
    expect(result.data[0].title).toContain('Coworking');
    expect(result.pagination.count).toBe(1);
  });

  it('should handle pagination correctly', async () => {
    await PrismaProvider.instance.office.createMany({
      data: Array.from({ length: 25 }, (_, i) => ({
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 5 + (i + 1),
        price: 1000 + (i + 1) * 100,
        slug: `office-${i + 1}`,
        title: `Office ${i + 1}`,
        type: 'OPEN_SPACE',
      })),
    });

    const request: EventHandlerArg<IndexOfficeRequest> = {
      body: {},
      params: {},
      path: '/api/offices',
      query: {
        page: 2,
        pageSize: 10,
      },
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const result = await IndexOfficeEventHandlerFn(request);

    expect(result.data).toHaveLength(10);
    expect(result.pagination.totalCount).toBe(25);
    expect(result.pagination.totalPages).toBe(3);
    expect(result.pagination.page).toBe(2);
    expect(result.pagination.links.next).toBeTypeOf('string');
    expect(result.pagination.links.previous).toBeTypeOf('string');
  });

  it('should order by price ascending', async () => {
    await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 15,
        price: 3000,
        slug: 'expensive-office',
        title: 'Expensive Office',
        type: 'PRIVATE_OFFICE',
      },
    });

    await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 5,
        price: 1000,
        slug: 'cheap-office',
        title: 'Cheap Office',
        type: 'OPEN_SPACE',
      },
    });

    const request: EventHandlerArg<IndexOfficeRequest> = {
      body: {},
      params: {},
      path: '/api/offices',
      query: {
        'orderBy[price]': 'asc',
        'page': 1,
        'pageSize': 10,
      },
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const result = await IndexOfficeEventHandlerFn(request);

    expect(result.data).toHaveLength(2);
    expect(result.data[0].price).toBe(1000);
    expect(result.data[1].price).toBe(3000);
  });

  it('should order by price descending', async () => {
    await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 15,
        price: 3000,
        slug: 'expensive-office',
        title: 'Expensive Office',
        type: 'PRIVATE_OFFICE',
      },
    });

    await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 5,
        price: 1000,
        slug: 'cheap-office',
        title: 'Cheap Office',
        type: 'OPEN_SPACE',
      },
    });

    const request: EventHandlerArg<IndexOfficeRequest> = {
      body: {},
      params: {},
      path: '/api/offices',
      query: {
        'orderBy[price]': 'desc',
        'page': 1,
        'pageSize': 10,
      },
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const result = await IndexOfficeEventHandlerFn(request);

    expect(result.data).toHaveLength(2);
    expect(result.data[0].price).toBe(3000);
    expect(result.data[1].price).toBe(1000);
  });

  it('should combine multiple filters', async () => {
    await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 5,
        price: 1000,
        slug: 'office-1',
        title: 'Office 1',
        type: 'OPEN_SPACE',
      },
    });

    await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 10,
        price: 2000,
        slug: 'office-2',
        title: 'Office 2',
        type: 'PRIVATE_OFFICE',
      },
    });

    await PrismaProvider.instance.office.create({
      data: {
        arr: 2,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 8,
        price: 1500,
        slug: 'office-3',
        title: 'Office 3',
        type: 'OPEN_SPACE',
      },
    });

    const request: EventHandlerArg<IndexOfficeRequest> = {
      body: {},
      params: {},
      path: '/api/offices',
      query: {
        'arr[equals]': 1,
        'page': 1,
        'pageSize': 10,
        'price[gte]': 1500,
        'type[equals]': 'PRIVATE_OFFICE',
      },
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const result = await IndexOfficeEventHandlerFn(request);

    expect(result.data).toHaveLength(1);
    expect(result.data[0].arr).toBe(1);
    expect(result.data[0].price).toBe(2000);
    expect(result.data[0].type).toBe('PRIVATE_OFFICE');
    expect(result.pagination.count).toBe(1);
  });
});
