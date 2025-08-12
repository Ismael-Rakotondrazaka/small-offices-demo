import type { Request } from '#shared/requests/request';

import { StringIdentifierSchema } from '#shared/schemas/identifierSchema';
import { z } from 'zod';

import type { OfficeServiceDTO } from './officeServiceDTO';

export const DestroyOfficeServiceRequestParamsSchema = z.object({ id: StringIdentifierSchema }); ;

export type DestroyOfficeServiceRequest = Request<DestroyOfficeServiceRequestData, Record<string, never>, DestroyOfficeServiceRequestParams>;
export type DestroyOfficeServiceRequestData = {
  data: OfficeServiceDTO;
};
export type DestroyOfficeServiceRequestParams = z.infer<typeof DestroyOfficeServiceRequestParamsSchema>;
