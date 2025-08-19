import type { AuditLogModel } from './auditLogModel';
import type { AuditLogDTO } from '~~/shared/domains/auditLogs/auditLogDTO';

export class AuditLogDTOMapper {
  static toDTO(auditLog: AuditLogModel): AuditLogDTO {
    return {
      id: auditLog.id,
      action: auditLog.action,
      actorId: auditLog.actorId,
      targetTable: auditLog.targetTable,
      targetId: auditLog.targetId,
      createdAt: auditLog.createdAt.toISOString(),
      meta: auditLog.meta,
    };
  }

  static toDTOList(auditLogs: AuditLogModel[]): AuditLogDTO[] {
    return auditLogs.map(auditLog => this.toDTO(auditLog));
  }
} 