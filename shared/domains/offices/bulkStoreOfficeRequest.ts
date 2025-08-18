import type { Request } from '~~/shared/requests/request';

import { z } from 'zod';

import { OfficeTypeSchema } from './officeType';

export const BulkStoreOfficeRequestBodySchema = z.object({
  offices: z.array(z.object(
    {
      arr: z.number().int().min(1).max(20),
      isFake: z.boolean(),
      lat: z.number(),
      lng: z.number(),
      posts: z.number().min(1),
      price: z.number().nonnegative(),
      title: z.string().min(1),
      type: OfficeTypeSchema,
    },
  )).min(1),
});

export type BulkStoreOfficeRequest = Request<BulkStoreOfficeRequestData, BulkStoreOfficeRequestBody>;
export type BulkStoreOfficeRequestBody = z.infer<typeof BulkStoreOfficeRequestBodySchema>;
export type BulkStoreOfficeRequestData = {
  count: number;
};
