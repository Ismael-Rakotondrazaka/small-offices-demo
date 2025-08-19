import type { UserSession } from '~~/server/utils/types/user';

import { RepositoryProvider } from '../repositories/repositoryProvider';

export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE';

export class AuditLogService {
  static async logAction(params: {
    action: AuditAction;
    actorId: string;
    targetTable: string;
    targetId: string;
    meta?: Record<string, unknown>;
  }): Promise<void> {
    await RepositoryProvider.auditLogRepository.addOne({
      action: params.action,
      actorId: params.actorId,
      targetTable: params.targetTable,
      targetId: params.targetId,
      meta: params.meta,
    });
  }

  static async logCreate(params: {
    userSession: UserSession;
    targetTable: string;
    targetId: string;
    meta?: Record<string, unknown>;
  }): Promise<void> {
    await this.logAction({
      action: 'CREATE',
      actorId: params.userSession.id,
      targetTable: params.targetTable,
      targetId: params.targetId,
      meta: params.meta,
    });
  }

  static async logUpdate(params: {
    userSession: UserSession;
    targetTable: string;
    targetId: string;
    meta?: Record<string, unknown>;
  }): Promise<void> {
    await this.logAction({
      action: 'UPDATE',
      actorId: params.userSession.id,
      targetTable: params.targetTable,
      targetId: params.targetId,
      meta: params.meta,
    });
  }

  static async logDelete(params: {
    userSession: UserSession;
    targetTable: string;
    targetId: string;
    meta?: Record<string, unknown>;
  }): Promise<void> {
    await this.logAction({
      action: 'DELETE',
      actorId: params.userSession.id,
      targetTable: params.targetTable,
      targetId: params.targetId,
      meta: params.meta,
    });
  }
} 