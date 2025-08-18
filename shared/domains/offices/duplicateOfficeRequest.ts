import type { Request } from '~~/shared/requests/request';

import { z } from 'zod';

import type { OfficeDTO } from './officeDTO';

export const DuplicateOfficeParamsSchema = z.object({
  slug: z.string().min(1),
});

export type DuplicateOfficeRequest = Request<DuplicateOfficeRequestData, Record<string, never>, DuplicateOfficeRequestParams>;

export type DuplicateOfficeRequestData = {
  data: OfficeDTO;
};

export type DuplicateOfficeRequestParams = z.infer<typeof DuplicateOfficeParamsSchema>;
