import { z } from 'zod';

import type { Request } from '../../../shared/requests/request';

export type CountAuditLogsRequestData = number;

export const CountAuditLogsRequestQuerySchema = z.object({
  'action[equals]': z.string().optional(),
  'actorId[equals]': z.string().optional(),
  'createdAt[gte]': z.coerce.date().optional(),
  'createdAt[lte]': z.coerce.date().optional(),
  'targetTable[equals]': z.string().optional(),
}).partial();

export type CountAuditLogsRequest = Request<CountAuditLogsRequestData, Record<string, never>, Record<string, never>, CountAuditLogsRequestQuery>;
export type CountAuditLogsRequestQuery = z.infer<typeof CountAuditLogsRequestQuerySchema>;
