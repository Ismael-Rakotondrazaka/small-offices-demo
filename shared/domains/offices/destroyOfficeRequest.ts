import type { Request } from '~~/shared/requests/request';

import { StringIdentifierSchema } from '~~/shared/schemas/identifierSchema';
import { z } from 'zod';

import type { OfficeDTO } from './officeDTO';

export const DestroyOfficeRequestParamsSchema = z.object({ id: StringIdentifierSchema }); ;

export type DestroyOfficeRequest = Request<DestroyOfficeRequestData, Record<string, never>, DestroyOfficeRequestParams>;
export type DestroyOfficeRequestData = {
  data: OfficeDTO;
};
export type DestroyOfficeRequestParams = z.infer<typeof DestroyOfficeRequestParamsSchema>;
