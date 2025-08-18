import type { Request } from '~~/shared/requests/request';

import { PhoneNumberSchema } from '~~/shared/schemas';
import { z } from 'zod';

import type { LeadDTO } from './leadDTO';

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
