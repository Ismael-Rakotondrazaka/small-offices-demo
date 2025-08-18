import { z } from 'zod';

import type { Request } from '../../../shared/requests/request';

import { LeadStatusSchema } from './leadStatus';

export type CountLeadsRequestData = number;

export const CountLeadsRequestQuerySchema = z.object({
  'createdAt[gte]': z.coerce.date().optional(),
  'createdAt[lte]': z.coerce.date().optional(),
  'price[gte]': z.coerce.number().optional(),
  'price[lte]': z.coerce.number().optional(),
  'search': z.string().optional(),
  'status[equals]': LeadStatusSchema,
}).partial();

export type CountLeadsRequest = Request<CountLeadsRequestData, Record<string, never>, Record<string, never>, CountLeadsRequestQuery>;
export type CountLeadsRequestQuery = z.infer<typeof CountLeadsRequestQuerySchema>;
