import { z } from 'zod';

import type { Request } from '../../../shared/requests/request';
import type { LeadDTO } from './leadDTO';

import { PhoneNumberSchema } from '../../../shared/schemas';

export const StoreLeadRequestBodySchema = z.object({
  email: z.string().email(),
  name: z.string(),
  officeSlug: z.string(),
  phone: PhoneNumberSchema,
});

export type StoreLeadRequest = Request<StoreLeadRequestData, StoreLeadRequestBody>;
export type StoreLeadRequestBody = z.infer<typeof StoreLeadRequestBodySchema>;
export type StoreLeadRequestData = {
  data: LeadDTO;
};
