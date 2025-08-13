import type { Request } from '~~/shared/requests/request';

import { z } from 'zod';

import type { OfficeDTO } from './officeDTO';

export const UpdateOfficeRequestParamsSchema = z.object({ slug: z.string() }); ;

export type UpdateOfficeRequestParams = z.infer<typeof UpdateOfficeRequestParamsSchema>;

export const UpdateOfficeRequestBodySchema = z.object({ arr: z.number().min(1).max(20).optional(), isFake: z.boolean().optional(), lat: z.number().optional(), lng: z.number().optional(), posts: z.number().optional(), price: z.number().optional(), services: z.any().optional(), slug: z.string().optional(), title: z.string().optional() });

export type UpdateOfficeRequest = Request<UpdateOfficeRequestData, UpdateOfficeRequestBody, UpdateOfficeRequestParams>;
export type UpdateOfficeRequestBody = z.infer<typeof UpdateOfficeRequestBodySchema>;
export type UpdateOfficeRequestData = { data: OfficeDTO };
