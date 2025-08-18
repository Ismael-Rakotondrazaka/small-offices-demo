import { z } from 'zod';

import type { Request } from '../../../shared/requests/request';
import type { LeadDTO } from './leadDTO';

import { StringIdentifierSchema } from '../../../shared/schemas/identifierSchema';

export const DestroyLeadRequestParamsSchema = z.object({ id: StringIdentifierSchema }); ;

export type DestroyLeadRequest = Request<DestroyLeadRequestData, Record<string, never>, DestroyLeadRequestParams>;
export type DestroyLeadRequestData = {
  data: LeadDTO;
};
export type DestroyLeadRequestParams = z.infer<typeof DestroyLeadRequestParamsSchema>;
