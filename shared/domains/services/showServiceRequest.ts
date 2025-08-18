import { z } from 'zod';

import type { Request } from '../../../shared/requests/request';
import type { ServiceDTO } from './serviceDTO';

import { StringIdentifierSchema } from '../../../shared/schemas/identifierSchema';

export const ShowServiceRequestParamsSchema = z.object({ id: StringIdentifierSchema }); ;

export type ShowServiceRequest = Request<ShowServiceRequestData, Record<string, never>, ShowServiceRequestParams>;
export type ShowServiceRequestData = {
  data: ServiceDTO;
};
export type ShowServiceRequestParams = z.infer<typeof ShowServiceRequestParamsSchema>;
