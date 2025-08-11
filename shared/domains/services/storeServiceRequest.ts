import type { Request } from '~~/shared/requests/request';

import { z } from 'zod';

import type { ServiceDTO } from './serviceDTO';

export const StoreServiceRequestBodySchema = z.object({ icon: z.string().nullable(), name: z.string() });

export type StoreServiceRequest = Request<StoreServiceRequestData, StoreServiceRequestBody>;
export type StoreServiceRequestBody = z.infer<typeof StoreServiceRequestBodySchema>;
export type StoreServiceRequestData = {
  data: ServiceDTO;
};
