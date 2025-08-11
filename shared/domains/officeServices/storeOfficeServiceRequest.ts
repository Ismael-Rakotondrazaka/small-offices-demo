import type { Request } from '~~/shared/requests/request';

import { z } from 'zod';

import type { OfficeServiceDTO } from './officeServiceDTO';

export const StoreOfficeServiceRequestBodySchema = z.object({ officeId: z.string(), serviceId: z.string() });

export type StoreOfficeServiceRequest = Request<StoreOfficeServiceRequestData, StoreOfficeServiceRequestBody>;
export type StoreOfficeServiceRequestBody = z.infer<typeof StoreOfficeServiceRequestBodySchema>;
export type StoreOfficeServiceRequestData = {
  data: OfficeServiceDTO;
};
