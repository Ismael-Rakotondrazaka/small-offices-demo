import type { Request } from '~~/shared/requests/request';

import { StringIdentifierSchema } from '~~/shared/schemas/identifierSchema';
import { z } from 'zod';

import type { ServiceDTO } from './serviceDTO';

export const DestroyServiceRequestParamsSchema = z.object({ id: StringIdentifierSchema }); ;

export type DestroyServiceRequest = Request<DestroyServiceRequestData, Record<string, never>, DestroyServiceRequestParams>;
export type DestroyServiceRequestData = {
  data: ServiceDTO;
};
export type DestroyServiceRequestParams = z.infer<typeof DestroyServiceRequestParamsSchema>;
