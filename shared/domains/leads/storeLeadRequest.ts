import type { Request } from '~~/shared/requests/request';

import { z } from 'zod';

import type { LeadDTO } from './leadDTO';

export const StoreLeadRequestBodySchema = z.object({ email: z.string(), name: z.string(), officeId: z.string(), phone: z.string().nullable() });

export type StoreLeadRequest = Request<StoreLeadRequestData, StoreLeadRequestBody>;
export type StoreLeadRequestBody = z.infer<typeof StoreLeadRequestBodySchema>;
export type StoreLeadRequestData = {
  data: LeadDTO;
};
