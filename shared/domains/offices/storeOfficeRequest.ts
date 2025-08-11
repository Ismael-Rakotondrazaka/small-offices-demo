import type { Request } from '~~/shared/requests/request';

import { z } from 'zod';

import type { OfficeDTO } from './officeDTO';

import { OfficeTypeSchema } from './officeType';

export const StoreOfficeRequestBodySchema = z.object({ arr: z.number().min(1).max(20), description: z.string(), isFake: z.boolean(), lat: z.number(), lng: z.number(), posts: z.number(), price: z.number(), services: z.any(), slug: z.string(), title: z.string(), type: OfficeTypeSchema });

export type StoreOfficeRequest = Request<StoreOfficeRequestData, StoreOfficeRequestBody>;
export type StoreOfficeRequestBody = z.infer<typeof StoreOfficeRequestBodySchema>;
export type StoreOfficeRequestData = {
  data: OfficeDTO;
};
