import { z } from 'zod';

import type { Request } from '../../../shared/requests/request';

import { OfficeTypeSchema } from './officeType';

export type CountOfficesRequestData = number;

export const CountOfficesRequestQuerySchema = z.object({
  'arr[equals]': z.coerce.number().max(20).optional(),
  'arr[in]': z.array(z.coerce.number().max(20)).optional(),
  'posts[gte]': z.coerce.number().min(0).optional(),
  'posts[lte]': z.coerce.number().min(0).optional(),
  'price[gte]': z.coerce.number().min(0).optional(),
  'price[lte]': z.coerce.number().min(0).optional(),
  'search': z.string().optional(),
  'type[equals]': OfficeTypeSchema.optional(),
}).partial();

export type CountOfficesRequest = Request<CountOfficesRequestData, Record<string, never>, Record<string, never>, CountOfficesRequestQuery>;
export type CountOfficesRequestQuery = z.infer<typeof CountOfficesRequestQuerySchema>;
