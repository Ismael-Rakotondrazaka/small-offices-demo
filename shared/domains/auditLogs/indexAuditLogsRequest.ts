import { z } from 'zod';

import type { PaginationDTO } from '../../../shared/domains/paginations/paginationDTO';
import type { Request } from '../../../shared/requests/request';
import type { AuditLogDTO } from './auditLogDTO';

import { makePaginatedSchema } from '../../../shared/schemas/paginationSchema';
import { SortOrderSchema } from '../../../shared/schemas/sortOrderSchema';
import { auditLogConfig } from './auditLogConfig';

export type IndexAuditLogsRequestData = { data: AuditLogDTO[]; pagination: PaginationDTO };

export const IndexAuditLogsRequestQuerySchema = z.object({
  'action[equals]': z.string().optional(),
  'actorId[equals]': z.string().optional(),
  'createdAt[gte]': z.union([z.date(), z.string()]).optional(),
  'createdAt[lte]': z.union([z.date(), z.string()]).optional(),
  'orderBy[createdAt]': SortOrderSchema,
  'targetTable[equals]': z.string().optional(),
}).partial().merge(makePaginatedSchema({ defaultPageSize: auditLogConfig.PAGE_SIZE_DEFAULT_VALUE }));

export type IndexAuditLogsRequest = Request<IndexAuditLogsRequestData, Record<string, never>, Record<string, never>, IndexAuditLogsRequestQuery>;
export type IndexAuditLogsRequestQuery = z.infer<typeof IndexAuditLogsRequestQuerySchema>;
