import type { Request } from '~~/shared/requests/request';

import { StringIdentifierSchema } from '~~/shared/schemas/identifierSchema';
import { z } from 'zod';

import type { OfficeDTO } from './officeDTO';

export const ShowOfficeRequestParamsSchema = z.object({ id: StringIdentifierSchema }); ;

export type ShowOfficeRequest = Request<ShowOfficeRequestData, Record<string, never>, ShowOfficeRequestParams>;
export type ShowOfficeRequestData = {
  data: OfficeDTO;
};
export type ShowOfficeRequestParams = z.infer<typeof ShowOfficeRequestParamsSchema>;
