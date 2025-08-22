import type { UserSession } from '~~/server/utils/types/user';

import { RepositoryProvider } from '../repositories/repositoryProvider';

export type AuditAction = 'CREATE' | 'DELETE' | 'UPDATE';

export class AuditLogService {
  static async logAction(params: {
    action: AuditAction;
    actorId: string;
    meta?: Record<string, unknown>;
    targetId: string;
    targetTable: string;
  }): Promise<void> {
    await RepositoryProvider.auditLogRepository.addOne({
      action: params.action,
      actorId: params.actorId,
      // @ts-expect-error - Prisma doesn't support null for JSON fields
      meta: params.meta,
      targetId: params.targetId,
      targetTable: params.targetTable,
    });
  }

  static async logCreate(params: {
    meta?: Record<string, unknown>;
    targetId: string;
    targetTable: string;
    userSession: UserSession;
  }): Promise<void> {
    await this.logAction({
      action: 'CREATE',
      actorId: params.userSession.id,
      meta: params.meta,
      targetId: params.targetId,
      targetTable: params.targetTable,
    });
  }

  static async logDelete(params: {
    meta?: Record<string, unknown>;
    targetId: string;
    targetTable: string;
    userSession: UserSession;
  }): Promise<void> {
    await this.logAction({
      action: 'DELETE',
      actorId: params.userSession.id,
      meta: params.meta,
      targetId: params.targetId,
      targetTable: params.targetTable,
    });
  }

  static async logUpdate(params: {
    meta?: Record<string, unknown>;
    targetId: string;
    targetTable: string;
    userSession: UserSession;
  }): Promise<void> {
    await this.logAction({
      action: 'UPDATE',
      actorId: params.userSession.id,
      meta: params.meta,
      targetId: params.targetId,
      targetTable: params.targetTable,
    });
  }
}
