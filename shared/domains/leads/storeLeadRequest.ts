import type { Request } from '~~/shared/requests/request';

import { z } from 'zod';

import type { LeadDTO } from './leadDTO';

const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

export const StoreLeadRequestBodySchema = z.object({
  email: z.string().email(),
  name: z.string(),
  officeSlug: z.string(),
  phone: z.string()
    .regex(phoneRegex, 'Veuillez entrer un numéro de téléphone français valide'),
});

export type StoreLeadRequest = Request<StoreLeadRequestData, StoreLeadRequestBody>;
export type StoreLeadRequestBody = z.infer<typeof StoreLeadRequestBodySchema>;
export type StoreLeadRequestData = {
  data: LeadDTO;
};
