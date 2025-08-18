import { z } from 'zod';

import type { Request } from '../../../shared/requests/request';
import type { OfficeDTO } from './officeDTO';

import { OfficeTypeSchema } from './officeType';

export const StoreOfficeRequestBodySchema = z.object({
  arr: z.number().int().min(1).max(20),
  isFake: z.boolean(),
  lat: z.number(),
  lng: z.number(),
  photoUrls: z.array(z.string().min(1)),
  posts: z.number().min(1),
  price: z.number().nonnegative(),
  serviceIds: z.array(z.string()),
  slug: z.string().min(1),
  title: z.string().min(1),
  type: OfficeTypeSchema,
});

export type StoreOfficeRequest = Request<StoreOfficeRequestData,
 StoreOfficeRequestBody>;
export type StoreOfficeRequestBody = z.infer<typeof StoreOfficeRequestBodySchema>;
export type StoreOfficeRequestData = {
  data: OfficeDTO;
};
