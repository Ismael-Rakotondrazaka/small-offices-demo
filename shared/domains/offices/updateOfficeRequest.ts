import type { Request } from '~~/shared/requests/request';

import { z } from 'zod';

import type { OfficeDTO } from './officeDTO';

import { OfficeTypeSchema } from './officeType';

export const UpdateOfficeRequestParamsSchema = z.object({ slug: z.string() }); ;

export type UpdateOfficeRequestParams = z.infer<typeof UpdateOfficeRequestParamsSchema>;

export const UpdateOfficeRequestBodySchema = z.object({
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
}).partial();

export type UpdateOfficeRequest = Request<UpdateOfficeRequestData,
 UpdateOfficeRequestBody, UpdateOfficeRequestParams>;
export type UpdateOfficeRequestBody = z.infer<typeof UpdateOfficeRequestBodySchema>;
export type UpdateOfficeRequestData = { data: OfficeDTO };
