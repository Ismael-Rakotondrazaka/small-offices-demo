import { z } from 'zod';

import type { Request } from '../../../shared/requests/request';
import type { ServiceDTO } from './serviceDTO';

import { StringIdentifierSchema } from '../../../shared/schemas/identifierSchema';

export const UpdateServiceRequestParamsSchema = z.object({ id: StringIdentifierSchema }); ;

export type UpdateServiceRequestParams = z.infer<typeof UpdateServiceRequestParamsSchema>;

export const UpdateServiceRequestBodySchema = z.object({ icon: z.string().nullable().optional(), name: z.string().optional() });

export type UpdateServiceRequest = Request<UpdateServiceRequestData, UpdateServiceRequestBody, UpdateServiceRequestParams>;
export type UpdateServiceRequestBody = z.infer<typeof UpdateServiceRequestBodySchema>;
export type UpdateServiceRequestData = { data: ServiceDTO };
