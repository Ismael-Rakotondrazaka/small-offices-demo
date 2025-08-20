import type { AuditLogModel } from './auditLogModel';

export class AuditLogDTOMapper {
  static toDTO(auditLog: AuditLogModel): AuditLogDTO {
    return {
      action: auditLog.action,
      actorId: auditLog.actorId,
      createdAt: auditLog.createdAt.toISOString(),
      id: auditLog.id,
      meta: auditLog.meta as null | Record<string, unknown>,
      targetId: auditLog.targetId,
      targetTable: auditLog.targetTable,
    };
  }

  static toDTOList(auditLogs: AuditLogModel[]): AuditLogDTO[] {
    return auditLogs.map(auditLog => this.toDTO(auditLog));
  }
}
