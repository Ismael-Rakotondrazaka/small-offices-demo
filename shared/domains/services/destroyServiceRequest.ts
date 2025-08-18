import { z } from 'zod';

import type { Request } from '../../../shared/requests/request';
import type { ServiceDTO } from './serviceDTO';

import { StringIdentifierSchema } from '../../../shared/schemas/identifierSchema';

export const DestroyServiceRequestParamsSchema = z.object({ id: StringIdentifierSchema }); ;

export type DestroyServiceRequest = Request<DestroyServiceRequestData, Record<string, never>, DestroyServiceRequestParams>;
export type DestroyServiceRequestData = {
  data: ServiceDTO;
};
export type DestroyServiceRequestParams = z.infer<typeof DestroyServiceRequestParamsSchema>;
