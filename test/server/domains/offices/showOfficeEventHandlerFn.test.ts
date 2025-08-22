import { beforeEach, describe, expect, it } from 'vitest';

import type { EventHandlerArg } from '../../../../server/core/requests/requestToEventHandler';
import type { ShowOfficeRequest } from '../../../../shared/domains/offices/showOfficeRequest';

import { ShowOfficeEventHandlerFn } from '../../../../server/domains/offices/showOfficeEventHandlerFn';
import { PrismaProvider } from '../../../../server/services/prisma/prismaProvider';

describe('ShowOfficeEventHandlerFn', () => {
  beforeEach(async () => {
    await PrismaProvider.instance.office.deleteMany();
    await PrismaProvider.instance.service.deleteMany();
  });

  it('should return office by slug', async () => {
    const service = await PrismaProvider.instance.service.create({
      data: {
        icon: 'wifi',
        name: 'WiFi',
      },
    });

    const office = await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        photos: {
          create: [
            { url: 'https://example.com/photo1.jpg' },
            { url: 'https://example.com/photo2.jpg' },
          ],
        },
        posts: 5,
        price: 1000,
        services: {
          connect: [{ id: service.id }],
        },
        slug: 'test-office',
        title: 'Test Office',
        type: 'OPEN_SPACE' as const,
      },
    });

    const request: EventHandlerArg<ShowOfficeRequest> = {
      body: {},
      params: { slug: 'test-office' },
      path: '/api/offices/test-office',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: async () => null,
        require: async () => ({ email: 'test@example.com', id: 'user-1' }),
      },
    };

    const result = await ShowOfficeEventHandlerFn(request);

    expect(result.data.id).toBe(office.id);
    expect(result.data.title).toBe('Test Office');
    expect(result.data.slug).toBe('test-office');
    expect(result.data.price).toBe(1000);
    expect(result.data.posts).toBe(5);
    expect(result.data.arr).toBe(1);
    expect(result.data.type).toBe('OPEN_SPACE');
    expect(result.data.isFake).toBe(false);
    expect(result.data.photos).toHaveLength(2);
    expect(result.data.services).toHaveLength(1);
  });

  it('should return office with multiple services', async () => {
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

    await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 5,
        price: 1000,
        services: {
          connect: [{ id: service1.id }, { id: service2.id }],
        },
        slug: 'test-office',
        title: 'Test Office',
        type: 'OPEN_SPACE',
      },
    });

    const request: EventHandlerArg<ShowOfficeRequest> = {
      body: {},
      params: { slug: 'test-office' },
      path: '/api/offices/test-office',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: async () => null,
        require: async () => ({ email: 'test@example.com', id: 'user-1' }),
      },
    };

    const result = await ShowOfficeEventHandlerFn(request);

    expect(result.data.services).toHaveLength(2);
    expect(result.data.services.map(s => s.name)).toEqual(['WiFi', 'Coffee']);
  });

  it('should return office with multiple photos', async () => {
    await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        photos: {
          create: [
            { url: 'https://example.com/photo1.jpg' },
            { url: 'https://example.com/photo2.jpg' },
            { url: 'https://example.com/photo3.jpg' },
          ],
        },
        posts: 5,
        price: 1000,
        slug: 'test-office',
        title: 'Test Office',
        type: 'OPEN_SPACE',
      },
    });

    const request: EventHandlerArg<ShowOfficeRequest> = {
      body: {},
      params: { slug: 'test-office' },
      path: '/api/offices/test-office',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: async () => null,
        require: async () => ({ email: 'test@example.com', id: 'user-1' }),
      },
    };

    const result = await ShowOfficeEventHandlerFn(request);

    expect(result.data.photos).toHaveLength(3);
    expect(result.data.photos.map(p => p.url)).toEqual([
      'https://example.com/photo1.jpg',
      'https://example.com/photo2.jpg',
      'https://example.com/photo3.jpg',
    ]);
  });

  it('should return office with no photos and no services', async () => {
    await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 5,
        price: 1000,
        slug: 'minimal-office',
        title: 'Minimal Office',
        type: 'OPEN_SPACE',
      },
    });

    const request: EventHandlerArg<ShowOfficeRequest> = {
      body: {},
      params: { slug: 'minimal-office' },
      path: '/api/offices/minimal-office',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: async () => null,
        require: async () => ({ email: 'test@example.com', id: 'user-1' }),
      },
    };

    const result = await ShowOfficeEventHandlerFn(request);

    expect(result.data.photos).toHaveLength(0);
    expect(result.data.services).toHaveLength(0);
  });

  it('should return fake office', async () => {
    await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: true,
        lat: 48.8566,
        lng: 2.3522,
        posts: 5,
        price: 1000,
        slug: 'fake-office',
        title: 'Fake Office',
        type: 'OPEN_SPACE',
      },
    });

    const request: EventHandlerArg<ShowOfficeRequest> = {
      body: {},
      params: { slug: 'fake-office' },
      path: '/api/offices/fake-office',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: async () => null,
        require: async () => ({ email: 'test@example.com', id: 'user-1' }),
      },
    };

    const result = await ShowOfficeEventHandlerFn(request);

    expect(result.data.isFake).toBe(true);
  });

  it('should return office with special characters in title', async () => {
    await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 5,
        price: 1000,
        slug: 'modern-coworking-cafe',
        title: 'Modern Coworking Space & Café',
        type: 'OPEN_SPACE',
      },
    });

    const request: EventHandlerArg<ShowOfficeRequest> = {
      body: {},
      params: { slug: 'modern-coworking-cafe' },
      path: '/api/offices/modern-coworking-cafe',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: async () => null,
        require: async () => ({ email: 'test@example.com', id: 'user-1' }),
      },
    };

    const result = await ShowOfficeEventHandlerFn(request);

    expect(result.data.title).toBe('Modern Coworking Space & Café');
  });

  it('should return office with decimal coordinates', async () => {
    await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.856614,
        lng: 2.3522219,
        posts: 5,
        price: 1000,
        slug: 'test-office',
        title: 'Test Office',
        type: 'OPEN_SPACE',
      },
    });

    const request: EventHandlerArg<ShowOfficeRequest> = {
      body: {},
      params: { slug: 'test-office' },
      path: '/api/offices/test-office',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: async () => null,
        require: async () => ({ email: 'test@example.com', id: 'user-1' }),
      },
    };

    const result = await ShowOfficeEventHandlerFn(request);

    expect(result.data.lat).toBe(48.856614);
    expect(result.data.lng).toBe(2.3522219);
  });

  it('should return office with high price', async () => {
    await PrismaProvider.instance.office.create({
      data: {
        arr: 8,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 20,
        price: 50000,
        slug: 'luxury-office',
        title: 'Luxury Office',
        type: 'PRIVATE_OFFICE',
      },
    });

    const request: EventHandlerArg<ShowOfficeRequest> = {
      body: {},
      params: { slug: 'luxury-office' },
      path: '/api/offices/luxury-office',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: async () => null,
        require: async () => ({ email: 'test@example.com', id: 'user-1' }),
      },
    };

    const result = await ShowOfficeEventHandlerFn(request);

    expect(result.data.price).toBe(50000);
    expect(result.data.posts).toBe(20);
    expect(result.data.arr).toBe(8);
    expect(result.data.type).toBe('PRIVATE_OFFICE');
  });

  it('should return office with long title', async () => {
    const longTitle = 'This is a very long office title that might exceed normal length limits and should be handled properly by the system';

    await PrismaProvider.instance.office.create({
      data: {
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 5,
        price: 1000,
        slug: 'long-title-office',
        title: longTitle,
        type: 'OPEN_SPACE',
      },
    });

    const request: EventHandlerArg<ShowOfficeRequest> = {
      body: {},
      params: { slug: 'long-title-office' },
      path: '/api/offices/long-title-office',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: async () => null,
        require: async () => ({ email: 'test@example.com', id: 'user-1' }),
      },
    };

    const result = await ShowOfficeEventHandlerFn(request);

    expect(result.data.title).toBe(longTitle);
  });
});
