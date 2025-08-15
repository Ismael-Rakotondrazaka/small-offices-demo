import type { Request } from '~~/shared/requests/request';

import { StringIdentifierSchema } from '~~/shared/schemas/identifierSchema';
import { z } from 'zod';

import type { LeadDTO } from './leadDTO';

export const DestroyLeadRequestParamsSchema = z.object({ id: StringIdentifierSchema }); ;

export type DestroyLeadRequest = Request<DestroyLeadRequestData, Record<string, never>, DestroyLeadRequestParams>;
export type DestroyLeadRequestData = {
  data: LeadDTO;
};
export type DestroyLeadRequestParams = z.infer<typeof DestroyLeadRequestParamsSchema>;
