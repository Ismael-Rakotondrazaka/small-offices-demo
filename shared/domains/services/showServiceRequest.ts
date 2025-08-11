import type { Request } from '~~/shared/requests/request';

import { StringIdentifierSchema } from '~~/shared/schemas/identifierSchema';
import { z } from 'zod';

import type { ServiceDTO } from './serviceDTO';

export const ShowServiceRequestParamsSchema = z.object({ id: StringIdentifierSchema }); ;

export type ShowServiceRequest = Request<ShowServiceRequestData, Record<string, never>, ShowServiceRequestParams>;
export type ShowServiceRequestData = {
  data: ServiceDTO;
};
export type ShowServiceRequestParams = z.infer<typeof ShowServiceRequestParamsSchema>;
