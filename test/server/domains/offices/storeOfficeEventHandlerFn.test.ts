import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { EventHandlerArg } from '../../../../server/core/requests/requestToEventHandler';
import type { StoreOfficeRequest } from '../../../../shared/domains/offices/storeOfficeRequest';

import { StoreOfficeEventHandlerFn } from '../../../../server/domains/offices/storeOfficeEventHandlerFn';
import { PrismaProvider } from '../../../../server/services/prisma/prismaProvider';

vi.mock('../../../../server/services/auditLog/auditLogService', () => ({
  AuditLogService: {
    logCreate: vi.fn(),
  },
}));

describe('StoreOfficeEventHandlerFn', () => {
  beforeEach(async () => {
    await PrismaProvider.instance.office.deleteMany();
    await PrismaProvider.instance.service.deleteMany();
    vi.clearAllMocks();
  });

  it('should create office with provided slug', async () => {
    const mockUser = { id: 'test-user-id' };

    const service = await PrismaProvider.instance.service.create({
      data: {
        icon: 'wifi',
        name: 'WiFi',
      },
    });

    const request: EventHandlerArg<StoreOfficeRequest> = {
      body: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        photoUrls: ['https://example.com/photo1.jpg'],
        posts: 5,
        price: 1000,
        serviceIds: [service.id],
        slug: 'test-office',
        title: 'Test Office',
        type: 'OPEN_SPACE',
      },
      params: {},
      path: '/api/offices',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn().mockResolvedValue(mockUser),
      },
    };

    const result = await StoreOfficeEventHandlerFn(request);

    expect(result.data.title).toBe('Test Office');
    expect(result.data.slug).toBe('test-office');
    expect(result.data.price).toBe(1000);
    expect(result.data.posts).toBe(5);
    expect(result.data.arr).toBe(1);
    expect(result.data.type).toBe('OPEN_SPACE');
    expect(result.data.isFake).toBe(false);

    const createdOffice = await PrismaProvider.instance.office.findUnique({
      include: { photos: true, services: true },
      where: { id: result.data.id },
    });

    expect(createdOffice).toBeTruthy();
    expect(createdOffice?.photos).toHaveLength(1);
    expect(createdOffice?.services).toHaveLength(1);
  });

  it('should generate slug from title when not provided', async () => {
    const mockUser = { id: 'test-user-id' };

    const service = await PrismaProvider.instance.service.create({
      data: {
        icon: 'wifi',
        name: 'WiFi',
      },
    });

    const request: EventHandlerArg<StoreOfficeRequest> = {
      body: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        photoUrls: ['https://example.com/photo1.jpg'],
        posts: 5,
        price: 1000,
        serviceIds: [service.id],
        title: 'Modern Coworking Space',
        type: 'OPEN_SPACE',
      },
      params: {},
      path: '/api/offices',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn().mockResolvedValue(mockUser),
      },
    };

    const result = await StoreOfficeEventHandlerFn(request);

    expect(result.data.slug).toBe('modern-coworking-space');
  });

  it('should generate unique slug when slug already exists', async () => {
    const mockUser = { id: 'test-user-id' };

    const service = await PrismaProvider.instance.service.create({
      data: {
        icon: 'wifi',
        name: 'WiFi',
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
        slug: 'test-office',
        title: 'Existing Office',
        type: 'OPEN_SPACE',
      },
    });

    const request: EventHandlerArg<StoreOfficeRequest> = {
      body: {
        arr: 2,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        photoUrls: ['https://example.com/photo1.jpg'],
        posts: 10,
        price: 2000,
        serviceIds: [service.id],
        slug: 'test-office',
        title: 'Test Office',
        type: 'PRIVATE_OFFICE',
      },
      params: {},
      path: '/api/offices',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn().mockResolvedValue(mockUser),
      },
    };

    const result = await StoreOfficeEventHandlerFn(request);

    expect(result.data.slug).toBe('test-office-1');
  });

  it('should handle multiple photo URLs', async () => {
    const mockUser = { id: 'test-user-id' };

    const service = await PrismaProvider.instance.service.create({
      data: {
        icon: 'wifi',
        name: 'WiFi',
      },
    });

    const request: EventHandlerArg<StoreOfficeRequest> = {
      body: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        photoUrls: [
          'https://example.com/photo1.jpg',
          'https://example.com/photo2.jpg',
          'https://example.com/photo3.jpg',
        ],
        posts: 5,
        price: 1000,
        serviceIds: [service.id],
        slug: 'test-office',
        title: 'Test Office',
        type: 'OPEN_SPACE',
      },
      params: {},
      path: '/api/offices',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn().mockResolvedValue(mockUser),
      },
    };

    const result = await StoreOfficeEventHandlerFn(request);

    const createdOffice = await PrismaProvider.instance.office.findUnique({
      include: { photos: true },
      where: { id: result.data.id },
    });

    expect(createdOffice?.photos).toHaveLength(3);
    expect(createdOffice?.photos.map(p => p.url)).toEqual([
      'https://example.com/photo1.jpg',
      'https://example.com/photo2.jpg',
      'https://example.com/photo3.jpg',
    ]);
  });

  it('should handle multiple services', async () => {
    const mockUser = { id: 'test-user-id' };

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

    const request: EventHandlerArg<StoreOfficeRequest> = {
      body: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        photoUrls: ['https://example.com/photo1.jpg'],
        posts: 5,
        price: 1000,
        serviceIds: [service1.id, service2.id],
        slug: 'test-office',
        title: 'Test Office',
        type: 'OPEN_SPACE',
      },
      params: {},
      path: '/api/offices',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn().mockResolvedValue(mockUser),
      },
    };

    const result = await StoreOfficeEventHandlerFn(request);

    const createdOffice = await PrismaProvider.instance.office.findUnique({
      include: { services: true },
      where: { id: result.data.id },
    });

    expect(createdOffice?.services).toHaveLength(2);
    expect(createdOffice?.services.map(s => s.id)).toEqual(
      expect.arrayContaining([service1.id, service2.id]),
    );
  });

  it('should remove duplicate photo URLs', async () => {
    const mockUser = { id: 'test-user-id' };

    const service = await PrismaProvider.instance.service.create({
      data: {
        icon: 'wifi',
        name: 'WiFi',
      },
    });

    const request: EventHandlerArg<StoreOfficeRequest> = {
      body: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        photoUrls: [
          'https://example.com/photo1.jpg',
          'https://example.com/photo1.jpg',
          'https://example.com/photo2.jpg',
        ],
        posts: 5,
        price: 1000,
        serviceIds: [service.id],
        slug: 'test-office',
        title: 'Test Office',
        type: 'OPEN_SPACE',
      },
      params: {},
      path: '/api/offices',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn().mockResolvedValue(mockUser),
      },
    };

    const result = await StoreOfficeEventHandlerFn(request);

    const createdOffice = await PrismaProvider.instance.office.findUnique({
      include: { photos: true },
      where: { id: result.data.id },
    });

    expect(createdOffice?.photos).toHaveLength(2);
    expect(createdOffice?.photos.map(p => p.url)).toEqual([
      'https://example.com/photo1.jpg',
      'https://example.com/photo2.jpg',
    ]);
  });

  it('should remove duplicate service IDs', async () => {
    const mockUser = { id: 'test-user-id' };

    const service = await PrismaProvider.instance.service.create({
      data: {
        icon: 'wifi',
        name: 'WiFi',
      },
    });

    const request: EventHandlerArg<StoreOfficeRequest> = {
      body: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        photoUrls: ['https://example.com/photo1.jpg'],
        posts: 5,
        price: 1000,
        serviceIds: [service.id, service.id],
        slug: 'test-office',
        title: 'Test Office',
        type: 'OPEN_SPACE',
      },
      params: {},
      path: '/api/offices',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn().mockResolvedValue(mockUser),
      },
    };

    const result = await StoreOfficeEventHandlerFn(request);

    const createdOffice = await PrismaProvider.instance.office.findUnique({
      include: { services: true },
      where: { id: result.data.id },
    });

    expect(createdOffice?.services).toHaveLength(1);
    expect(createdOffice?.services[0].id).toBe(service.id);
  });

  it('should create fake office when isFake is true', async () => {
    const mockUser = { id: 'test-user-id' };

    const service = await PrismaProvider.instance.service.create({
      data: {
        icon: 'wifi',
        name: 'WiFi',
      },
    });

    const request: EventHandlerArg<StoreOfficeRequest> = {
      body: {
        arr: 1,
        isFake: true,
        lat: 48.8566,
        lng: 2.3522,
        photoUrls: ['https://example.com/photo1.jpg'],
        posts: 5,
        price: 1000,
        serviceIds: [service.id],
        slug: 'fake-office',
        title: 'Fake Office',
        type: 'OPEN_SPACE',
      },
      params: {},
      path: '/api/offices',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn().mockResolvedValue(mockUser),
      },
    };

    const result = await StoreOfficeEventHandlerFn(request);

    expect(result.data.isFake).toBe(true);
  });

  it('should handle office with no photos and no services', async () => {
    const mockUser = { id: 'test-user-id' };

    const request: EventHandlerArg<StoreOfficeRequest> = {
      body: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        photoUrls: [],
        posts: 5,
        price: 1000,
        serviceIds: [],
        slug: 'minimal-office',
        title: 'Minimal Office',
        type: 'OPEN_SPACE',
      },
      params: {},
      path: '/api/offices',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn().mockResolvedValue(mockUser),
      },
    };

    const result = await StoreOfficeEventHandlerFn(request);

    const createdOffice = await PrismaProvider.instance.office.findUnique({
      include: { photos: true, services: true },
      where: { id: result.data.id },
    });

    expect(createdOffice?.photos).toHaveLength(0);
    expect(createdOffice?.services).toHaveLength(0);
  });
});
