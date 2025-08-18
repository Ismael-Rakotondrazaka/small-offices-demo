import { z } from 'zod';

import type { Request } from '../../../shared/requests/request';
import type { LeadDTO } from './leadDTO';

import { StringIdentifierSchema } from '../../../shared/schemas/identifierSchema';
import { LeadStatusSchema } from './leadStatus';

export const UpdateLeadRequestParamsSchema = z.object({ id: StringIdentifierSchema });

export type UpdateLeadRequestParams = z.infer<typeof UpdateLeadRequestParamsSchema>;

export const UpdateLeadRequestBodySchema = z.object({
  status: LeadStatusSchema,
});

export type UpdateLeadRequest = Request<UpdateLeadRequestData, UpdateLeadRequestBody, UpdateLeadRequestParams>;
export type UpdateLeadRequestBody = z.infer<typeof UpdateLeadRequestBodySchema>;
export type UpdateLeadRequestData = { data: LeadDTO };
