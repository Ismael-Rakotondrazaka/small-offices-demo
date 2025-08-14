import type { Request } from '~~/shared/requests/request';

import { StringIdentifierSchema } from '~~/shared/schemas/identifierSchema';
import { z } from 'zod';

import type { LeadDTO } from './leadDTO';

const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

export const UpdateLeadRequestParamsSchema = z.object({ id: StringIdentifierSchema });

export type UpdateLeadRequestParams = z.infer<typeof UpdateLeadRequestParamsSchema>;

export const UpdateLeadRequestBodySchema = z.object({
  email: z.string().optional(),
  name: z.string().optional(),
  officeId: z.string().optional(),
  phone: z.string()
    .regex(phoneRegex, 'Veuillez entrer un numéro de téléphone français valide').optional(),
});

export type UpdateLeadRequest = Request<UpdateLeadRequestData, UpdateLeadRequestBody, UpdateLeadRequestParams>;
export type UpdateLeadRequestBody = z.infer<typeof UpdateLeadRequestBodySchema>;
export type UpdateLeadRequestData = { data: LeadDTO };
