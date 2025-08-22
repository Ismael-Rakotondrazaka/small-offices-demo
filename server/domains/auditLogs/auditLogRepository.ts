import type { Prisma, PrismaClient } from '~~/generated/prisma/client';

import type { AuditLogModel } from './auditLogModel';

export class AuditLogRepository {
  #prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.#prismaClient = prismaClient;
  }

  async addOne(data: Prisma.AuditLogCreateArgs['data']): Promise<AuditLogModel> {
    return this.#prismaClient.auditLog.create({ data });
  }

  async count(params: {
    where?: Prisma.AuditLogWhereInput;
  }): Promise<number> {
    return this.#prismaClient.auditLog.count({
      where: params.where,
    });
  }

  async findMany(params: {
    orderBy?: Prisma.AuditLogOrderByWithRelationInput[];
    skip?: number;
    take?: number;
    where?: Prisma.AuditLogWhereInput;
  }): Promise<AuditLogModel[]> {
    return this.#prismaClient.auditLog.findMany({
      orderBy: params.orderBy,
      skip: params.skip,
      take: params.take,
      where: params.where,
    });
  }
}
