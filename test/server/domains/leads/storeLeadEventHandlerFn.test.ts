import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { EventHandlerArg } from '../../../../server/core/requests/requestToEventHandler';
import type { StoreLeadRequest } from '../../../../shared/domains/leads/storeLeadRequest';

import { StoreLeadEventHandlerFn } from '../../../../server/domains/leads/storeLeadEventHandlerFn';
import { PrismaProvider } from '../../../../server/services/prisma/prismaProvider';

vi.mock('../../../../server/services/mail/lead/leadNotificationMailSender', () => ({
  LeadNotificationMailSender: {
    send: vi.fn(),
  },
}));

describe('StoreLeadEventHandlerFn', () => {
  beforeEach(async () => {
    await PrismaProvider.instance.lead.deleteMany();
    await PrismaProvider.instance.office.deleteMany();
    vi.clearAllMocks();
  });

  it('should create lead successfully when office exists', async () => {
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

    const request: EventHandlerArg<StoreLeadRequest> = {
      body: {
        email: 'john@example.com',
        name: 'John Doe',
        officeSlug: 'test-office',
        phone: '+33123456789',
      },
      params: {},
      path: '/api/leads',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const result = await StoreLeadEventHandlerFn(request);

    expect(result.data.name).toBe('John Doe');
    expect(result.data.email).toBe('john@example.com');
    expect(result.data.phone).toBe('+33123456789');
    expect(result.data.office.id).toBe(office.id);

    const createdLead = await PrismaProvider.instance.lead.findUnique({
      include: { office: true },
      where: { id: result.data.id },
    });

    expect(createdLead).toBeTruthy();
    expect(createdLead?.office.title).toBe('Test Office');
  });

  it('should throw error when office does not exist', async () => {
    const request: EventHandlerArg<StoreLeadRequest> = {
      body: {
        email: 'john@example.com',
        name: 'John Doe',
        officeSlug: 'non-existent-office',
        phone: '+33123456789',
      },
      params: {},
      path: '/api/leads',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    await expect(StoreLeadEventHandlerFn(request)).rejects.toThrow('Bureau non trouvé');
  });

  it('should create lead with minimal required data', async () => {
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

    const request: EventHandlerArg<StoreLeadRequest> = {
      body: {
        email: 'jane@example.com',
        name: 'Jane Smith',
        officeSlug: 'test-office',
        phone: '',
      },
      params: {},
      path: '/api/leads',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const result = await StoreLeadEventHandlerFn(request);

    expect(result.data.name).toBe('Jane Smith');
    expect(result.data.email).toBe('jane@example.com');
    expect(result.data.phone).toBe('');
    expect(result.data.office.id).toBe(office.id);
  });

  it('should create multiple leads for the same office', async () => {
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

    const request1: EventHandlerArg<StoreLeadRequest> = {
      body: {
        email: 'john@example.com',
        name: 'John Doe',
        officeSlug: 'test-office',
        phone: '+33123456789',
      },
      params: {},
      path: '/api/leads',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const request2: EventHandlerArg<StoreLeadRequest> = {
      body: {
        email: 'jane@example.com',
        name: 'Jane Smith',
        officeSlug: 'test-office',
        phone: '+33987654321',
      },
      params: {},
      path: '/api/leads',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const result1 = await StoreLeadEventHandlerFn(request1);
    const result2 = await StoreLeadEventHandlerFn(request2);

    expect(result1.data.id).not.toBe(result2.data.id);
    expect(result1.data.office.id).toBe(office.id);
    expect(result2.data.office.id).toBe(office.id);

    const leads = await PrismaProvider.instance.lead.findMany({
      where: { officeId: office.id },
    });

    expect(leads).toHaveLength(2);
  });

  it('should create leads for different offices', async () => {
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

    const request1: EventHandlerArg<StoreLeadRequest> = {
      body: {
        email: 'john@example.com',
        name: 'John Doe',
        officeSlug: 'office-1',
        phone: '+33123456789',
      },
      params: {},
      path: '/api/leads',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const request2: EventHandlerArg<StoreLeadRequest> = {
      body: {
        email: 'jane@example.com',
        name: 'Jane Smith',
        officeSlug: 'office-2',
        phone: '+33987654321',
      },
      params: {},
      path: '/api/leads',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const result1 = await StoreLeadEventHandlerFn(request1);
    const result2 = await StoreLeadEventHandlerFn(request2);

    expect(result1.data.office.id).toBe(office1.id);
    expect(result2.data.office.id).toBe(office2.id);

    const leads = await PrismaProvider.instance.lead.findMany({
      include: { office: true },
    });

    expect(leads).toHaveLength(2);
    expect(leads[0].office.title).toBe('Office 1');
    expect(leads[1].office.title).toBe('Office 2');
  });

  it('should handle lead with special characters in name', async () => {
    await PrismaProvider.instance.office.create({
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

    const request: EventHandlerArg<StoreLeadRequest> = {
      body: {
        email: 'jose@example.com',
        name: 'José María García-López',
        officeSlug: 'test-office',
        phone: '+33123456789',
      },
      params: {},
      path: '/api/leads',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const result = await StoreLeadEventHandlerFn(request);

    expect(result.data.name).toBe('José María García-López');
    expect(result.data.email).toBe('jose@example.com');
  });

  it('should handle lead with international phone number', async () => {
    await PrismaProvider.instance.office.create({
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

    const request: EventHandlerArg<StoreLeadRequest> = {
      body: {
        email: 'john@example.com',
        name: 'John Doe',
        officeSlug: 'test-office',
        phone: '+1-555-123-4567',
      },
      params: {},
      path: '/api/leads',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const result = await StoreLeadEventHandlerFn(request);

    expect(result.data.phone).toBe('+1-555-123-4567');
  });

  it('should create lead for fake office', async () => {
    const office = await PrismaProvider.instance.office.create({
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

    const request: EventHandlerArg<StoreLeadRequest> = {
      body: {
        email: 'john@example.com',
        name: 'John Doe',
        officeSlug: 'fake-office',
        phone: '+33123456789',
      },
      params: {},
      path: '/api/leads',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const result = await StoreLeadEventHandlerFn(request);

    expect(result.data.office.id).toBe(office.id);
    expect(result.data.name).toBe('John Doe');
  });

  it('should handle case insensitive office slug search', async () => {
    await PrismaProvider.instance.office.create({
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

    const request: EventHandlerArg<StoreLeadRequest> = {
      body: {
        email: 'john@example.com',
        name: 'John Doe',
        officeSlug: 'TEST-OFFICE',
        phone: '+33123456789',
      },
      params: {},
      path: '/api/leads',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    await expect(StoreLeadEventHandlerFn(request)).rejects.toThrow('Bureau non trouvé');
  });

  it('should handle empty phone number', async () => {
    await PrismaProvider.instance.office.create({
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

    const request: EventHandlerArg<StoreLeadRequest> = {
      body: {
        email: 'john@example.com',
        name: 'John Doe',
        officeSlug: 'test-office',
        phone: '',
      },
      params: {},
      path: '/api/leads',
      query: {},
      setHeaders: () => {},
      userSession: {
        get: vi.fn(),
        require: vi.fn(),
      },
    };

    const result = await StoreLeadEventHandlerFn(request);

    expect(result.data.phone).toBe('');
    expect(result.data.name).toBe('John Doe');
    expect(result.data.email).toBe('john@example.com');
  });
});
