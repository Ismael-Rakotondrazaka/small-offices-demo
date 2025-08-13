import type { Request } from '~~/shared/requests/request';

import { StringIdentifierSchema } from '~~/shared/schemas/identifierSchema';
import { z } from 'zod';

import type { OfficeServiceDTO } from './officeServiceDTO';

export const ShowOfficeServiceRequestParamsSchema = z.object({ id: StringIdentifierSchema }); ;

export type ShowOfficeServiceRequest = Request<ShowOfficeServiceRequestData, Record<string, never>, ShowOfficeServiceRequestParams>;
export type ShowOfficeServiceRequestData = {
  data: OfficeServiceDTO;
};
export type ShowOfficeServiceRequestParams = z.infer<typeof ShowOfficeServiceRequestParamsSchema>;
