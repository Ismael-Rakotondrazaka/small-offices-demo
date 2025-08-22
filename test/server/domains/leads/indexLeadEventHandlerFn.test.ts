import { beforeEach, describe, expect, it } from 'vitest';

import type { EventHandlerArg } from '../../../../server/core/requests/requestToEventHandler';
import type { IndexLeadRequest } from '../../../../shared/domains/leads/indexLeadRequest';

import { IndexLeadEventHandlerFn } from '../../../../server/domains/leads/indexLeadEventHandlerFn';
import { PrismaProvider } from '../../../../server/services/prisma/prismaProvider';

describe('IndexLeadEventHandlerFn', () => {
  beforeEach(async () => {
    await PrismaProvider.instance.lead.deleteMany();
    await PrismaProvider.instance.office.deleteMany();
  });

  it('should return empty data when no leads exist', async () => {
    const request: EventHandlerArg<IndexLeadRequest> = {
      body: {},
      params: {},
      path: '/api/leads',
      query: {
        page: 1,
        pageSize: 10,
      },
      setHeaders: () => {},
      userSession: {
        get: async () => null,
        require: async () => ({ id: 'user-1' }),
      },
    };

    const result = await IndexLeadEventHandlerFn(request);

    expect(result.data).toEqual([]);
    expect(result.pagination.totalCount).toBe(0);
    expect(result.pagination.totalPages).toBe(0);
    expect(result.pagination.page).toBe(1);
  });

  it('should return leads with pagination', async () => {
    const office = await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 5,
        price: 1000,
        slug: 'test-office',
        title: 'Test Office',
        type: 'OPEN_SPACE',
      },
    });

    const lead1 = await PrismaProvider.instance.lead.create({
      data: {
        email: 'john@example.com',
        name: 'John Doe',
        officeId: office.id,
        phone: '+33123456789',
      },
    });

    const lead2 = await PrismaProvider.instance.lead.create({
      data: {
        email: 'jane@example.com',
        name: 'Jane Smith',
        officeId: office.id,
        phone: '+33987654321',
      },
    });

    const request: EventHandlerArg<IndexLeadRequest> = {
      body: {},
      params: {},
      path: '/api/leads',
      query: {
        page: 1,
        pageSize: 10,
      },
      setHeaders: () => {},
      userSession: {
        get: async () => null,
        require: async () => ({ id: 'user-1' }),
      },
    };

    const result = await IndexLeadEventHandlerFn(request);

    expect(result.data).toHaveLength(2);
    expect(result.pagination.totalCount).toBe(2);
    expect(result.pagination.totalPages).toBe(1);
    expect(result.data[0].name).toBe(lead1.name);
    expect(result.data[1].name).toBe(lead2.name);
  });

  it('should filter by office ID', async () => {
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

    await PrismaProvider.instance.lead.create({
      data: {
        email: 'john@example.com',
        name: 'John Doe',
        officeId: office1.id,
        phone: '+33123456789',
      },
    });

    await PrismaProvider.instance.lead.create({
      data: {
        email: 'jane@example.com',
        name: 'Jane Smith',
        officeId: office2.id,
        phone: '+33987654321',
      },
    });

    const request: EventHandlerArg<IndexLeadRequest> = {
      body: {},
      params: {},
      path: '/api/leads',
      query: {
        'officeId[equals]': office1.id,
        'page': 1,
        'pageSize': 10,
      },
      setHeaders: () => {},
      userSession: {
        get: async () => null,
        require: async () => ({ id: 'user-1' }),
      },
    };

    const result = await IndexLeadEventHandlerFn(request);

    expect(result.data).toHaveLength(1);
    expect(result.data[0].officeId).toBe(office1.id);
    expect(result.pagination.totalCount).toBe(1);
  });

  it('should filter by status', async () => {
    const office = await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 5,
        price: 1000,
        slug: 'test-office',
        title: 'Test Office',
        type: 'OPEN_SPACE',
      },
    });

    await PrismaProvider.instance.lead.create({
      data: {
        email: 'john@example.com',
        name: 'John Doe',
        officeId: office.id,
        phone: '+33123456789',
        status: 'PENDING',
      },
    });

    await PrismaProvider.instance.lead.create({
      data: {
        email: 'jane@example.com',
        name: 'Jane Smith',
        officeId: office.id,
        phone: '+33987654321',
        status: 'CONTACTED',
      },
    });

    const request: EventHandlerArg<IndexLeadRequest> = {
      body: {},
      params: {},
      path: '/api/leads',
      query: {
        'page': 1,
        'pageSize': 10,
        'status[equals]': 'PENDING',
      },
      setHeaders: () => {},
      userSession: {
        get: async () => null,
        require: async () => ({ id: 'user-1' }),
      },
    };

    const result = await IndexLeadEventHandlerFn(request);

    expect(result.data).toHaveLength(1);
    expect(result.data[0].status).toBe('PENDING');
    expect(result.pagination.totalCount).toBe(1);
  });

  it('should search by name or email', async () => {
    const office = await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 5,
        price: 1000,
        slug: 'test-office',
        title: 'Test Office',
        type: 'OPEN_SPACE',
      },
    });

    await PrismaProvider.instance.lead.create({
      data: {
        email: 'john@example.com',
        name: 'John Doe',
        officeId: office.id,
        phone: '+33123456789',
      },
    });

    await PrismaProvider.instance.lead.create({
      data: {
        email: 'jane@example.com',
        name: 'Jane Smith',
        officeId: office.id,
        phone: '+33987654321',
      },
    });

    const request: EventHandlerArg<IndexLeadRequest> = {
      body: {},
      params: {},
      path: '/api/leads',
      query: {
        page: 1,
        pageSize: 10,
        search: 'john',
      },
      setHeaders: () => {},
      userSession: {
        get: async () => null,
        require: async () => ({ id: 'user-1' }),
      },
    };

    const result = await IndexLeadEventHandlerFn(request);

    expect(result.data).toHaveLength(1);
    expect(result.data[0].name).toContain('John');
    expect(result.pagination.totalCount).toBe(1);
  });

  it('should handle pagination correctly', async () => {
    const office = await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 5,
        price: 1000,
        slug: 'test-office',
        title: 'Test Office',
        type: 'OPEN_SPACE',
      },
    });

    await PrismaProvider.instance.lead.createMany({
      data: Array.from({ length: 25 }, (_, i) => ({
        email: `lead${i + 1}@example.com`,
        name: `Lead ${i + 1}`,
        officeId: office.id,
        phone: `+3312345678${(i + 1).toString().padStart(2, '0')}`,
      })),
    });

    const request: EventHandlerArg<IndexLeadRequest> = {
      body: {},
      params: {},
      path: '/api/leads',
      query: {
        page: 2,
        pageSize: 10,
      },
      setHeaders: () => {},
      userSession: {
        get: async () => null,
        require: async () => ({ id: 'user-1' }),
      },
    };

    const result = await IndexLeadEventHandlerFn(request);

    expect(result.data).toHaveLength(10);
    expect(result.pagination.totalCount).toBe(25);
    expect(result.pagination.totalPages).toBe(3);
    expect(result.pagination.page).toBe(2);
    expect(result.pagination.links.next).toBeTypeOf('string');
    expect(result.pagination.links.previous).toBeTypeOf('string');
  });

  it('should order by createdAt descending by default', async () => {
    const office = await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 5,
        price: 1000,
        slug: 'test-office',
        title: 'Test Office',
        type: 'OPEN_SPACE',
      },
    });

    await PrismaProvider.instance.lead.create({
      data: {
        email: 'first@example.com',
        name: 'First Lead',
        officeId: office.id,
        phone: '+33123456789',
      },
    });

    await new Promise(resolve => setTimeout(resolve, 10));

    await PrismaProvider.instance.lead.create({
      data: {
        email: 'second@example.com',
        name: 'Second Lead',
        officeId: office.id,
        phone: '+33987654321',
      },
    });

    const request: EventHandlerArg<IndexLeadRequest> = {
      body: {},
      params: {},
      path: '/api/leads',
      query: {
        page: 1,
        pageSize: 10,
      },
      setHeaders: () => {},
      userSession: {
        get: async () => null,
        require: async () => ({ id: 'user-1' }),
      },
    };

    const result = await IndexLeadEventHandlerFn(request);

    expect(result.data).toHaveLength(2);
    expect(result.data[0].name).toBe('Second Lead');
    expect(result.data[1].name).toBe('First Lead');
  });

  it('should order by createdAt ascending when specified', async () => {
    const office = await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 5,
        price: 1000,
        slug: 'test-office',
        title: 'Test Office',
        type: 'OPEN_SPACE',
      },
    });

    await PrismaProvider.instance.lead.create({
      data: {
        email: 'first@example.com',
        name: 'First Lead',
        officeId: office.id,
        phone: '+33123456789',
      },
    });

    await new Promise(resolve => setTimeout(resolve, 10));

    await PrismaProvider.instance.lead.create({
      data: {
        email: 'second@example.com',
        name: 'Second Lead',
        officeId: office.id,
        phone: '+33987654321',
      },
    });

    const request: EventHandlerArg<IndexLeadRequest> = {
      body: {},
      params: {},
      path: '/api/leads',
      query: {
        'orderBy[createdAt]': 'asc',
        'page': 1,
        'pageSize': 10,
      },
      setHeaders: () => {},
      userSession: {
        get: async () => null,
        require: async () => ({ id: 'user-1' }),
      },
    };

    const result = await IndexLeadEventHandlerFn(request);

    expect(result.data).toHaveLength(2);
    expect(result.data[0].name).toBe('First Lead');
    expect(result.data[1].name).toBe('Second Lead');
  });

  it('should include office information in lead data', async () => {
    const office = await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 5,
        price: 1000,
        slug: 'test-office',
        title: 'Test Office',
        type: 'OPEN_SPACE',
      },
    });

    await PrismaProvider.instance.lead.create({
      data: {
        email: 'john@example.com',
        name: 'John Doe',
        officeId: office.id,
        phone: '+33123456789',
      },
    });

    const request: EventHandlerArg<IndexLeadRequest> = {
      body: {},
      params: {},
      path: '/api/leads',
      query: {
        page: 1,
        pageSize: 10,
      },
      setHeaders: () => {},
      userSession: {
        get: async () => null,
        require: async () => ({ id: 'user-1' }),
      },
    };

    const result = await IndexLeadEventHandlerFn(request);

    expect(result.data).toHaveLength(1);
    expect(result.data[0].office).toBeDefined();
    expect(result.data[0].office.title).toBe('Test Office');
    expect(result.data[0].office.slug).toBe('test-office');
  });
});
