import type { Request } from '~~/shared/requests/request';

import { StringIdentifierSchema } from '~~/shared/schemas/identifierSchema';
import { z } from 'zod';

import type { OfficeServiceDTO } from './officeServiceDTO';

export const UpdateOfficeServiceRequestParamsSchema = z.object({ id: StringIdentifierSchema }); ;

export type UpdateOfficeServiceRequestParams = z.infer<typeof UpdateOfficeServiceRequestParamsSchema>;

export const UpdateOfficeServiceRequestBodySchema = z.object({ officeId: z.string().optional(), serviceId: z.string().optional() });

export type UpdateOfficeServiceRequest = Request<UpdateOfficeServiceRequestData, UpdateOfficeServiceRequestBody, UpdateOfficeServiceRequestParams>;
export type UpdateOfficeServiceRequestBody = z.infer<typeof UpdateOfficeServiceRequestBodySchema>;
export type UpdateOfficeServiceRequestData = { data: OfficeServiceDTO };
