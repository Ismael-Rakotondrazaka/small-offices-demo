export type AuditLogModel = {
  id: string;
  action: string;
  actorId: string;
  targetTable: string;
  targetId: string;
  createdAt: Date;
  meta: Record<string, unknown> | null;
};

export type CreateAuditLogModel = {
  action: string;
  actorId: string;
  targetTable: string;
  targetId: string;
  meta?: Record<string, unknown>;
}; 