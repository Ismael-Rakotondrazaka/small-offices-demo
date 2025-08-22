import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { EventHandlerArg } from '../../../../server/core/requests/requestToEventHandler';
import type { IndexAuditLogsRequest } from '../../../../shared/domains/auditLogs/indexAuditLogsRequest';

import { IndexAuditLogsEventHandlerFn } from '../../../../server/domains/auditLogs/indexAuditLogsEventHandlerFn';
import { PrismaProvider } from '../../../../server/services/prisma/prismaProvider';

describe('IndexAuditLogsEventHandlerFn', () => {
  beforeEach(async () => {
    await PrismaProvider.instance.auditLog.deleteMany();
    vi.clearAllMocks();
  });

  it('should return empty data when no audit logs exist', async () => {
    const userSession = { id: 'test-user' };

    const request: EventHandlerArg<IndexAuditLogsRequest> = {
      body: {},
      params: {},
      path: '/api/audit-logs',
      query: {
        page: 1,
        pageSize: 10,
      },
      setHeaders: vi.fn(),
      userSession: {
        get: vi.fn().mockResolvedValue(userSession),
        require: vi.fn().mockResolvedValue(userSession),
      },
    };

    const result = await IndexAuditLogsEventHandlerFn(request);

    expect(result.data).toEqual([]);
    expect(result.pagination.totalCount).toBe(0);
    expect(result.pagination.totalPages).toBe(0);
    expect(result.pagination.page).toBe(1);
  });

  it('should return audit logs with pagination', async () => {
    const userSession = { id: 'test-user' };

    await PrismaProvider.instance.auditLog.create({
      data: {
        action: 'CREATE',
        actorId: userSession.id,
        meta: { title: 'Test Office' },
        targetId: 'office-1',
        targetTable: 'Office',
      },
    });

    await PrismaProvider.instance.auditLog.create({
      data: {
        action: 'UPDATE',
        actorId: userSession.id,
        meta: { price: 1000 },
        targetId: 'office-1',
        targetTable: 'Office',
      },
    });

    const request: EventHandlerArg<IndexAuditLogsRequest> = {
      body: {},
      params: {},
      path: '/api/audit-logs',
      query: {
        page: 1,
        pageSize: 10,
      },
      setHeaders: vi.fn(),
      userSession: {
        get: vi.fn().mockResolvedValue(userSession),
        require: vi.fn().mockResolvedValue(userSession),
      },
    };

    const result = await IndexAuditLogsEventHandlerFn(request);

    expect(result.data).toHaveLength(2);
    expect(result.pagination.totalCount).toBe(2);
    expect(result.pagination.totalPages).toBe(1);
    expect(result.data[0].action).toBe('UPDATE');
    expect(result.data[1].action).toBe('CREATE');
  });

  it('should filter by action', async () => {
    const userSession = { id: 'test-user' };

    await PrismaProvider.instance.auditLog.create({
      data: {
        action: 'CREATE',
        actorId: userSession.id,
        meta: { title: 'Test Office' },
        targetId: 'office-1',
        targetTable: 'Office',
      },
    });

    await PrismaProvider.instance.auditLog.create({
      data: {
        action: 'UPDATE',
        actorId: userSession.id,
        meta: { price: 1000 },
        targetId: 'office-1',
        targetTable: 'Office',
      },
    });

    const request: EventHandlerArg<IndexAuditLogsRequest> = {
      body: {},
      params: {},
      path: '/api/audit-logs',
      query: {
        'action[equals]': 'CREATE',
        'page': 1,
        'pageSize': 10,
      },
      setHeaders: vi.fn(),
      userSession: {
        get: vi.fn().mockResolvedValue(userSession),
        require: vi.fn().mockResolvedValue(userSession),
      },
    };

    const result = await IndexAuditLogsEventHandlerFn(request);

    expect(result.data).toHaveLength(1);
    expect(result.data[0].action).toBe('CREATE');
    expect(result.pagination.totalCount).toBe(1);
  });

  it('should filter by target table', async () => {
    const userSession = { id: 'test-user' };

    await PrismaProvider.instance.auditLog.create({
      data: {
        action: 'CREATE',
        actorId: userSession.id,
        meta: { title: 'Test Office' },
        targetId: 'office-1',
        targetTable: 'Office',
      },
    });

    await PrismaProvider.instance.auditLog.create({
      data: {
        action: 'CREATE',
        actorId: userSession.id,
        meta: { name: 'John Doe' },
        targetId: 'lead-1',
        targetTable: 'Lead',
      },
    });

    const request: EventHandlerArg<IndexAuditLogsRequest> = {
      body: {},
      params: {},
      path: '/api/audit-logs',
      query: {
        'page': 1,
        'pageSize': 10,
        'targetTable[equals]': 'Office',
      },
      setHeaders: vi.fn(),
      userSession: {
        get: vi.fn().mockResolvedValue(userSession),
        require: vi.fn().mockResolvedValue(userSession),
      },
    };

    const result = await IndexAuditLogsEventHandlerFn(request);

    expect(result.data).toHaveLength(1);
    expect(result.data[0].targetTable).toBe('Office');
    expect(result.pagination.totalCount).toBe(1);
  });

  it('should filter by actor ID', async () => {
    const userSession1 = { id: 'test-user-1' };
    const userSession2 = { id: 'test-user-2' };

    await PrismaProvider.instance.auditLog.create({
      data: {
        action: 'CREATE',
        actorId: userSession1.id,
        meta: { title: 'Test Office' },
        targetId: 'office-1',
        targetTable: 'Office',
      },
    });

    await PrismaProvider.instance.auditLog.create({
      data: {
        action: 'UPDATE',
        actorId: userSession2.id,
        meta: { price: 1000 },
        targetId: 'office-1',
        targetTable: 'Office',
      },
    });

    const request: EventHandlerArg<IndexAuditLogsRequest> = {
      body: {},
      params: {},
      path: '/api/audit-logs',
      query: {
        'actorId[equals]': userSession1.id,
        'page': 1,
        'pageSize': 10,
      },
      setHeaders: vi.fn(),
      userSession: {
        get: vi.fn().mockResolvedValue(userSession1),
        require: vi.fn().mockResolvedValue(userSession1),
      },
    };

    const result = await IndexAuditLogsEventHandlerFn(request);

    expect(result.data).toHaveLength(1);
    expect(result.data[0].actorId).toBe(userSession1.id);
    expect(result.pagination.totalCount).toBe(1);
  });

  it('should filter by date range', async () => {
    const userSession = { id: 'test-user' };

    const pastDate = new Date('2023-01-01T00:00:00Z');
    const currentDate = new Date('2024-01-01T00:00:00Z');
    const futureDate = new Date('2025-01-01T00:00:00Z');

    await PrismaProvider.instance.auditLog.create({
      data: {
        action: 'CREATE',
        actorId: userSession.id,
        createdAt: pastDate,
        meta: { title: 'Test Office' },
        targetId: 'office-1',
        targetTable: 'Office',
      },
    });

    await PrismaProvider.instance.auditLog.create({
      data: {
        action: 'UPDATE',
        actorId: userSession.id,
        createdAt: currentDate,
        meta: { price: 1000 },
        targetId: 'office-1',
        targetTable: 'Office',
      },
    });

    await PrismaProvider.instance.auditLog.create({
      data: {
        action: 'DELETE',
        actorId: userSession.id,
        createdAt: futureDate,
        meta: {},
        targetId: 'office-1',
        targetTable: 'Office',
      },
    });

    const request: EventHandlerArg<IndexAuditLogsRequest> = {
      body: {},
      params: {},
      path: '/api/audit-logs',
      query: {
        'createdAt[gte]': '2024-01-01T00:00:00Z',
        'createdAt[lte]': '2024-12-31T23:59:59Z',
        'page': 1,
        'pageSize': 10,
      },
      setHeaders: vi.fn(),
      userSession: {
        get: vi.fn().mockResolvedValue(userSession),
        require: vi.fn().mockResolvedValue(userSession),
      },
    };

    const result = await IndexAuditLogsEventHandlerFn(request);

    expect(result.data).toHaveLength(1);
    expect(result.data[0].action).toBe('UPDATE');
    expect(result.pagination.totalCount).toBe(1);
  });

  it('should handle pagination correctly', async () => {
    const userSession = { id: 'test-user' };

    await PrismaProvider.instance.auditLog.createMany({
      data: Array.from({ length: 25 }, (_, i) => ({
        action: 'CREATE',
        actorId: userSession.id,
        meta: { title: `Office ${i + 1}` },
        targetId: `office-${i + 1}`,
        targetTable: 'Office',
      })),
    });

    const request: EventHandlerArg<IndexAuditLogsRequest> = {
      body: {},
      params: {},
      path: '/api/audit-logs',
      query: {
        page: 2,
        pageSize: 10,
      },
      setHeaders: vi.fn(),
      userSession: {
        get: vi.fn().mockResolvedValue(userSession),
        require: vi.fn().mockResolvedValue(userSession),
      },
    };

    const result = await IndexAuditLogsEventHandlerFn(request);

    expect(result.data).toHaveLength(10);
    expect(result.pagination.totalCount).toBe(25);
    expect(result.pagination.totalPages).toBe(3);
    expect(result.pagination.page).toBe(2);
    expect(result.pagination.links.next).toBeTypeOf('string');
    expect(result.pagination.links.previous).toBeTypeOf('string');
  });

  it('should order by createdAt descending by default', async () => {
    const userSession = { id: 'test-user' };

    await PrismaProvider.instance.auditLog.create({
      data: {
        action: 'CREATE',
        actorId: userSession.id,
        meta: { title: 'First Office' },
        targetId: 'office-1',
        targetTable: 'Office',
      },
    });

    await new Promise(resolve => setTimeout(resolve, 10));

    await PrismaProvider.instance.auditLog.create({
      data: {
        action: 'UPDATE',
        actorId: userSession.id,
        meta: { price: 1000 },
        targetId: 'office-1',
        targetTable: 'Office',
      },
    });

    const request: EventHandlerArg<IndexAuditLogsRequest> = {
      body: {},
      params: {},
      path: '/api/audit-logs',
      query: {
        page: 1,
        pageSize: 10,
      },
      setHeaders: vi.fn(),
      userSession: {
        get: vi.fn().mockResolvedValue(userSession),
        require: vi.fn().mockResolvedValue(userSession),
      },
    };

    const result = await IndexAuditLogsEventHandlerFn(request);

    expect(result.data).toHaveLength(2);
    expect(result.data[0].action).toBe('UPDATE');
    expect(result.data[1].action).toBe('CREATE');
  });

  it('should order by createdAt ascending when specified', async () => {
    const userSession = { id: 'test-user' };

    await PrismaProvider.instance.auditLog.create({
      data: {
        action: 'CREATE',
        actorId: userSession.id,
        meta: { title: 'First Office' },
        targetId: 'office-1',
        targetTable: 'Office',
      },
    });

    await new Promise(resolve => setTimeout(resolve, 10));

    await PrismaProvider.instance.auditLog.create({
      data: {
        action: 'UPDATE',
        actorId: userSession.id,
        meta: { price: 1000 },
        targetId: 'office-1',
        targetTable: 'Office',
      },
    });

    const request: EventHandlerArg<IndexAuditLogsRequest> = {
      body: {},
      params: {},
      path: '/api/audit-logs',
      query: {
        'orderBy[createdAt]': 'asc',
        'page': 1,
        'pageSize': 10,
      },
      setHeaders: vi.fn(),
      userSession: {
        get: vi.fn().mockResolvedValue(userSession),
        require: vi.fn().mockResolvedValue(userSession),
      },
    };

    const result = await IndexAuditLogsEventHandlerFn(request);

    expect(result.data).toHaveLength(2);
    expect(result.data[0].action).toBe('CREATE');
    expect(result.data[1].action).toBe('UPDATE');
  });

  it('should combine multiple filters', async () => {
    const userSession = { id: 'test-user' };

    await PrismaProvider.instance.auditLog.create({
      data: {
        action: 'CREATE',
        actorId: userSession.id,
        meta: { title: 'Test Office' },
        targetId: 'office-1',
        targetTable: 'Office',
      },
    });

    await PrismaProvider.instance.auditLog.create({
      data: {
        action: 'UPDATE',
        actorId: userSession.id,
        meta: { price: 1000 },
        targetId: 'office-1',
        targetTable: 'Office',
      },
    });

    await PrismaProvider.instance.auditLog.create({
      data: {
        action: 'CREATE',
        actorId: userSession.id,
        meta: { name: 'John Doe' },
        targetId: 'lead-1',
        targetTable: 'Lead',
      },
    });

    const request: EventHandlerArg<IndexAuditLogsRequest> = {
      body: {},
      params: {},
      path: '/api/audit-logs',
      query: {
        'action[equals]': 'CREATE',
        'page': 1,
        'pageSize': 10,
        'targetTable[equals]': 'Office',
      },
      setHeaders: vi.fn(),
      userSession: {
        get: vi.fn().mockResolvedValue(userSession),
        require: vi.fn().mockResolvedValue(userSession),
      },
    };

    const result = await IndexAuditLogsEventHandlerFn(request);

    expect(result.data).toHaveLength(1);
    expect(result.data[0].action).toBe('CREATE');
    expect(result.data[0].targetTable).toBe('Office');
    expect(result.pagination.totalCount).toBe(1);
  });

  it('should handle audit logs with complex meta data', async () => {
    const userSession = { id: 'test-user' };

    const complexMeta = {
      features: {
        capacity: 50,
        meetingRooms: 3,
        parking: true,
      },
      location: {
        arr: 1,
        lat: 48.8566,
        lng: 2.3522,
      },
      price: 1500,
      services: ['WiFi', 'Coffee'],
      title: 'Complex Office',
    };

    await PrismaProvider.instance.auditLog.create({
      data: {
        action: 'CREATE',
        actorId: userSession.id,
        meta: complexMeta,
        targetId: 'office-1',
        targetTable: 'Office',
      },
    });

    const request: EventHandlerArg<IndexAuditLogsRequest> = {
      body: {},
      params: {},
      path: '/api/audit-logs',
      query: {
        page: 1,
        pageSize: 10,
      },
      setHeaders: vi.fn(),
      userSession: {
        get: vi.fn().mockResolvedValue(userSession),
        require: vi.fn().mockResolvedValue(userSession),
      },
    };

    const result = await IndexAuditLogsEventHandlerFn(request);

    expect(result.data).toHaveLength(1);
    expect(result.data[0].meta).toEqual(complexMeta);
  });
});
