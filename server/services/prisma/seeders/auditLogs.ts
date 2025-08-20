import type {
  AuditLog,
  Prisma,
  PrismaClient,
} from '../../../../generated/prisma/client';

import { faker } from '@faker-js/faker';

import { createStringIdentifier } from './identifiers';

type AuditLogTarget = {
  id: string;
  type: 'lead' | 'office' | 'service' | 'userRole';
};

const createAuditLogData = (arg: {
  actorId: string;
  target: AuditLogTarget;
  years?: number;
}): Prisma.AuditLogCreateInput => {
  const actions = ['CREATE', 'UPDATE', 'DELETE'] as const;
  const action = faker.helpers.arrayElement(actions);
  const createdAt = faker.date.past({ years: arg.years || 1 });

  // Create realistic meta data based on the action and target type
  const meta: Record<string, unknown> = {};

  switch (arg.target.type) {
    case 'lead':
      meta.changes = action === 'UPDATE'
        ? {
            email: faker.internet.email(),
            status: faker.helpers.arrayElement(['PENDING', 'CONTACTED', 'CONVERTED', 'LOST']),
          }
        : undefined;
      break;
    case 'office':
      meta.changes = action === 'UPDATE'
        ? {
            isFake: faker.datatype.boolean(),
            posts: faker.number.int({ max: 500, min: 1 }),
            price: faker.number.float({ fractionDigits: 2, max: 2000, min: 200 }),
          }
        : undefined;
      break;
    case 'service':
      meta.changes = action === 'UPDATE'
        ? {
            icon: faker.helpers.arrayElement(['wifi', 'coffee', 'meeting-room', 'parking']),
            name: faker.commerce.productName(),
          }
        : undefined;
      break;
    case 'userRole':
      meta.changes = action === 'UPDATE'
        ? {
            role: faker.helpers.arrayElement(['ADMIN', 'EDITOR']),
          }
        : undefined;
      break;
  }

  return {
    action,
    actorId: arg.actorId,
    createdAt,
    id: createStringIdentifier(),
    meta: Object.keys(meta).length > 0 ? (meta as Prisma.InputJsonValue) : undefined,
    targetId: arg.target.id,
    targetTable: arg.target.type === 'userRole' ? 'UserRole' : arg.target.type.charAt(0).toUpperCase() + arg.target.type.slice(1),
  };
};

export const createAuditLogs = async (arg: {
  auditLogsPerEntity?: number;
  leads: { id: string }[];
  offices: { id: string }[];
  prisma: PrismaClient;
  services: { id: string }[];
  userRoles: { id: string }[];
  years?: number;
}): Promise<AuditLog[]> => {
  const auditLogsData: Prisma.AuditLogCreateInput[] = [];
  const auditLogsPerEntity = arg.auditLogsPerEntity || 3; // Default to 3 audit logs per entity

  // Create audit logs for offices
  for (const office of arg.offices) {
    for (let i = 0; i < auditLogsPerEntity; i++) {
      const actorId = faker.helpers.arrayElement(arg.userRoles).id;
      auditLogsData.push(createAuditLogData({
        actorId,
        target: { id: office.id, type: 'office' },
        years: arg.years,
      }));
    }
  }

  // Create audit logs for leads
  for (const lead of arg.leads) {
    for (let i = 0; i < auditLogsPerEntity; i++) {
      const actorId = faker.helpers.arrayElement(arg.userRoles).id;
      auditLogsData.push(createAuditLogData({
        actorId,
        target: { id: lead.id, type: 'lead' },
        years: arg.years,
      }));
    }
  }

  // Create audit logs for services
  for (const service of arg.services) {
    for (let i = 0; i < auditLogsPerEntity; i++) {
      const actorId = faker.helpers.arrayElement(arg.userRoles).id;
      auditLogsData.push(createAuditLogData({
        actorId,
        target: { id: service.id, type: 'service' },
        years: arg.years,
      }));
    }
  }

  // Create audit logs for user roles (fewer since there are fewer user roles)
  for (const userRole of arg.userRoles) {
    for (let i = 0; i < Math.min(auditLogsPerEntity, 2); i++) {
      const actorId = faker.helpers.arrayElement(arg.userRoles).id;
      auditLogsData.push(createAuditLogData({
        actorId,
        target: { id: userRole.id, type: 'userRole' },
        years: arg.years,
      }));
    }
  }

  return Promise.all(
    auditLogsData.map(auditLogData =>
      arg.prisma.auditLog.create({
        data: auditLogData,
      }),
    ),
  );
};
