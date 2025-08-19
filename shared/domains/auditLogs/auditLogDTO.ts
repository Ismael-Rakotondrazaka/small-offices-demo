export type AuditLogDTO = {
  id: string;
  action: string;
  actorId: string;
  targetTable: string;
  targetId: string;
  createdAt: string;
  meta: Record<string, unknown> | null;
}; 