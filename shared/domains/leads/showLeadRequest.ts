import { z } from 'zod';

import type { Request } from '../../../shared/requests/request';
import type { LeadDTO } from './leadDTO';

import { StringIdentifierSchema } from '../../../shared/schemas/identifierSchema';

export const ShowLeadRequestParamsSchema = z.object({ id: StringIdentifierSchema }); ;

export type ShowLeadRequest = Request<ShowLeadRequestData, Record<string, never>, ShowLeadRequestParams>;
export type ShowLeadRequestData = {
  data: LeadDTO;
};
export type ShowLeadRequestParams = z.infer<typeof ShowLeadRequestParamsSchema>;
