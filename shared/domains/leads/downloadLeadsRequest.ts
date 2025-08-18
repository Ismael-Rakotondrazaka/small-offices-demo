import { z } from 'zod';

import type { Request } from '../../../shared/requests/request';

import { LeadStatusSchema } from './leadStatus';

export const DownloadLeadsRequestQuerySchema = z.object({
  'createdAt[gte]': z.string().optional(),
  'createdAt[lte]': z.string().optional(),
  'orderBy[createdAt]': z.enum(['asc', 'desc']).optional(),
  'orderBy[price]': z.enum(['asc', 'desc']).optional(),
  'price[gte]': z.number().optional(),
  'price[lte]': z.number().optional(),
  'search': z.string().optional(),
  'status[equals]': LeadStatusSchema.optional(),
});

export type DownloadLeadsRequest = Request<
  DownloadLeadsRequestData,
  Record<string, never>,
  Record<string, never>,
  DownloadLeadsRequestQuery
>;

export type DownloadLeadsRequestData = string;

export type DownloadLeadsRequestQuery = z.infer<typeof DownloadLeadsRequestQuerySchema>;
