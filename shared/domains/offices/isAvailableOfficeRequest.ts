import type { Request } from '~~/shared/requests/request';

import { z } from 'zod';

export type IsAvailableOfficeRequestData = { data: boolean };

export const IsAvailableOfficeRequestQuerySchema = z.object({
  slug: z.string().min(1),
});

export type IsAvailableOfficeRequest = Request<IsAvailableOfficeRequestData, Record<string, never>, Record<string, never>, IsAvailableOfficeRequestQuery>;

export type IsAvailableOfficeRequestQuery = z.infer<typeof IsAvailableOfficeRequestQuerySchema>;
