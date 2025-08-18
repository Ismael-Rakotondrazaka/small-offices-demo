import type { Request } from '~~/shared/requests/request';

import { z } from 'zod';

import type { OfficeDTO } from './officeDTO';

export const DuplicateOfficeParamsSchema = z.object({
  slug: z.string().min(1),
});

export const DuplicateOfficeRequestBodySchema = z.object({});

export type DuplicateOfficeRequestData = z.infer<typeof DuplicateOfficeParamsSchema>;
export type DuplicateOfficeRequestBody = z.infer<typeof DuplicateOfficeRequestBodySchema>;

export type DuplicateOfficeRequest = Request<DuplicateOfficeRequestData, DuplicateOfficeRequestBody, OfficeDTO>; 