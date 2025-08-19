import type { ExtendedPrismaClient } from '~~/server/services/prisma/prismaProvider';
import type { Prisma } from '~~/generated/prisma/client';

import type { AuditLogModel, CreateAuditLogModel } from './auditLogModel';

export class AuditLogRepository {
  constructor(private readonly prisma: ExtendedPrismaClient) {}

  async addOne(data: CreateAuditLogModel): Promise<AuditLogModel> {
    const auditLog = await this.prisma.auditLog.create({
      data: {
        action: data.action,
        actorId: data.actorId,
        targetTable: data.targetTable,
        targetId: data.targetId,
        meta: data.meta || null,
      },
    });

    return {
      id: auditLog.id,
      action: auditLog.action,
      actorId: auditLog.actorId,
      targetTable: auditLog.targetTable,
      targetId: auditLog.targetId,
      createdAt: auditLog.createdAt,
      meta: auditLog.meta as Record<string, unknown> | null,
    };
  }

  async findMany(params: {
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithRelationInput[];
    take?: number;
    skip?: number;
  }): Promise<AuditLogModel[]> {
    const auditLogs = await this.prisma.auditLog.findMany({
      where: params.where,
      orderBy: params.orderBy,
      take: params.take,
      skip: params.skip,
    });

    return auditLogs.map(auditLog => ({
      id: auditLog.id,
      action: auditLog.action,
      actorId: auditLog.actorId,
      targetTable: auditLog.targetTable,
      targetId: auditLog.targetId,
      createdAt: auditLog.createdAt,
      meta: auditLog.meta as Record<string, unknown> | null,
    }));
  }

  async count(params: {
    where?: Prisma.AuditLogWhereInput;
  }): Promise<number> {
    return await this.prisma.auditLog.count({
      where: params.where,
    });
  }
} 