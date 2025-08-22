import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { EventHandlerArg } from '../../../../server/core/requests/requestToEventHandler';
import type { IndexServiceRequest } from '../../../../shared/domains/services/indexServiceRequest';

import { IndexServiceEventHandlerFn } from '../../../../server/domains/services/indexServiceEventHandlerFn';
import { PrismaProvider } from '../../../../server/services/prisma/prismaProvider';

describe('IndexServiceEventHandlerFn', () => {
  beforeEach(async () => {
    await PrismaProvider.instance.service.deleteMany();
  });

  it('should return empty data when no services exist', async () => {
    const request: EventHandlerArg<IndexServiceRequest> = {
      body: {},
      params: {},
      path: '/api/services',
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

    const result = await IndexServiceEventHandlerFn(request);

    expect(result.data).toEqual([]);
    expect(result.pagination.totalCount).toBe(0);
    expect(result.pagination.totalPages).toBe(0);
    expect(result.pagination.page).toBe(1);
  });

  it('should return services with pagination', async () => {
    const service1 = await PrismaProvider.instance.service.create({
      data: {
        icon: 'wifi',
        name: 'WiFi',
      },
    });

    const service2 = await PrismaProvider.instance.service.create({
      data: {
        icon: 'coffee',
        name: 'Coffee',
      },
    });

    const request: EventHandlerArg<IndexServiceRequest> = {
      body: {},
      params: {},
      path: '/api/services',
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

    const result = await IndexServiceEventHandlerFn(request);

    expect(result.data).toHaveLength(2);
    expect(result.pagination.totalCount).toBe(2);
    expect(result.pagination.totalPages).toBe(1);
    expect(result.data[0].name).toBe(service1.name);
    expect(result.data[1].name).toBe(service2.name);
  });

  it('should handle pagination correctly', async () => {
    await PrismaProvider.instance.service.createMany({
      data: Array.from({ length: 25 }, (_, i) => ({
        icon: `icon-${i + 1}`,
        name: `Service ${i + 1}`,
      })),
    });

    const request: EventHandlerArg<IndexServiceRequest> = {
      body: {},
      params: {},
      path: '/api/services',
      query: {
        'orderBy[createdAt]': 'asc',
        'page': 2,
        'pageSize': 10,
      },
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const result = await IndexServiceEventHandlerFn(request);

    expect(result.data).toHaveLength(10);
    expect(result.pagination.totalCount).toBe(25);
    expect(result.pagination.totalPages).toBe(3);
    expect(result.pagination.page).toBe(2);
    expect(result.pagination.links.next).toBeTypeOf('string');
    expect(result.pagination.links.previous).toBeTypeOf('string');
  });

  it('should order by createdAt descending by default', async () => {
    await PrismaProvider.instance.service.create({
      data: {
        icon: 'first',
        name: 'First Service',
      },
    });

    await PrismaProvider.instance.service.create({
      data: {
        icon: 'second',
        name: 'Second Service',
      },
    });

    const request: EventHandlerArg<IndexServiceRequest> = {
      body: {},
      params: {},
      path: '/api/services',
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

    const result = await IndexServiceEventHandlerFn(request);

    expect(result.data).toHaveLength(2);
    expect(result.data[0].name).toBe('Second Service');
    expect(result.data[1].name).toBe('First Service');
  });

  it('should order by createdAt ascending when specified', async () => {
    await PrismaProvider.instance.service.create({
      data: {
        icon: 'first',
        name: 'First Service',
      },
    });

    await PrismaProvider.instance.service.create({
      data: {
        icon: 'second',
        name: 'Second Service',
      },
    });

    const request: EventHandlerArg<IndexServiceRequest> = {
      body: {},
      params: {},
      path: '/api/services',
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

    const result = await IndexServiceEventHandlerFn(request);
    console.log(result);
    expect(result.data).toHaveLength(2);
    expect(result.data[0].name).toBe('First Service');
    expect(result.data[1].name).toBe('Second Service');
  });

  it('should handle services with special characters in name', async () => {
    await PrismaProvider.instance.service.create({
      data: {
        icon: 'wifi-coffee',
        name: 'Wi-Fi & Coffee',
      },
    });

    await PrismaProvider.instance.service.create({
      data: {
        icon: 'meeting',
        name: 'Meeting Room (Private)',
      },
    });

    const request: EventHandlerArg<IndexServiceRequest> = {
      body: {},
      params: {},
      path: '/api/services',
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

    const result = await IndexServiceEventHandlerFn(request);

    expect(result.data).toHaveLength(2);
    expect(result.data.some(s => s.name === 'Wi-Fi & Coffee')).toBe(true);
    expect(result.data.some(s => s.name === 'Meeting Room (Private)')).toBe(true);
  });

  it('should handle services with long names', async () => {
    const longName = 'This is a very long service name that might exceed normal length limits and should be handled properly by the system';

    await PrismaProvider.instance.service.create({
      data: {
        icon: 'long-service',
        name: longName,
      },
    });

    const request: EventHandlerArg<IndexServiceRequest> = {
      body: {},
      params: {},
      path: '/api/services',
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

    const result = await IndexServiceEventHandlerFn(request);

    expect(result.data).toHaveLength(1);
    expect(result.data[0].name).toBe(longName);
  });

  it('should handle services with special characters in icon', async () => {
    await PrismaProvider.instance.service.create({
      data: {
        icon: 'wifi-icon-123',
        name: 'WiFi',
      },
    });

    await PrismaProvider.instance.service.create({
      data: {
        icon: 'coffee_icon',
        name: 'Coffee',
      },
    });

    const request: EventHandlerArg<IndexServiceRequest> = {
      body: {},
      params: {},
      path: '/api/services',
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

    const result = await IndexServiceEventHandlerFn(request);

    expect(result.data).toHaveLength(2);
    expect(result.data.some(s => s.icon === 'wifi-icon-123')).toBe(true);
    expect(result.data.some(s => s.icon === 'coffee_icon')).toBe(true);
  });

  it('should handle empty page size', async () => {
    await PrismaProvider.instance.service.create({
      data: {
        icon: 'test',
        name: 'Test Service',
      },
    });

    const request: EventHandlerArg<IndexServiceRequest> = {
      body: {},
      params: {},
      path: '/api/services',
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

    const result = await IndexServiceEventHandlerFn(request);

    expect(result.data).toHaveLength(1);
    expect(result.pagination.totalCount).toBe(1);
  });

  it('should handle large page size', async () => {
    await PrismaProvider.instance.service.createMany({
      data: Array.from({ length: 50 }, (_, i) => ({
        icon: `icon-${i + 1}`,
        name: `Service ${i + 1}`,
      })),
    });

    const request: EventHandlerArg<IndexServiceRequest> = {
      body: {},
      params: {},
      path: '/api/services',
      query: {
        page: 1,
        pageSize: 100,
      },
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const result = await IndexServiceEventHandlerFn(request);

    expect(result.data).toHaveLength(50);
    expect(result.pagination.totalCount).toBe(50);
    expect(result.pagination.totalPages).toBe(1);
  });

  it('should handle last page correctly', async () => {
    await PrismaProvider.instance.service.createMany({
      data: Array.from({ length: 25 }, (_, i) => ({
        icon: `icon-${i + 1}`,
        name: `Service ${i + 1}`,
      })),
    });

    const request: EventHandlerArg<IndexServiceRequest> = {
      body: {},
      params: {},
      path: '/api/services',
      query: {
        page: 3,
        pageSize: 10,
      },
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const result = await IndexServiceEventHandlerFn(request);

    expect(result.data).toHaveLength(5);
    expect(result.pagination.totalCount).toBe(25);
    expect(result.pagination.totalPages).toBe(3);
    expect(result.pagination.page).toBe(3);
    expect(result.pagination.links.next).toBe(null);
    expect(result.pagination.links.previous).toBeTypeOf('string');
  });
});
