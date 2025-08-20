export type AuditLogDTO = {
  action: string;
  actorId: string;
  createdAt: string;
  id: string;
  meta: null | Record<string, unknown>;
  targetId: string;
  targetTable: string;
};
