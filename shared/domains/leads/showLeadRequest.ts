import type { Request } from '#shared/requests/request';

import { StringIdentifierSchema } from '#shared/schemas/identifierSchema';
import { z } from 'zod';

import type { LeadDTO } from './leadDTO';

export const ShowLeadRequestParamsSchema = z.object({ id: StringIdentifierSchema }); ;

export type ShowLeadRequest = Request<ShowLeadRequestData, Record<string, never>, ShowLeadRequestParams>;
export type ShowLeadRequestData = {
  data: LeadDTO;
};
export type ShowLeadRequestParams = z.infer<typeof ShowLeadRequestParamsSchema>;
