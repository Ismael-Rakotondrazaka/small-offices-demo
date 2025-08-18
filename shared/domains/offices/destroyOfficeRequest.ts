import { z } from 'zod';

import type { Request } from '../../../shared/requests/request';
import type { OfficeDTO } from './officeDTO';

export const DestroyOfficeRequestParamsSchema = z.object({ slug: z.string() }); ;

export type DestroyOfficeRequest = Request<DestroyOfficeRequestData, Record<string, never>, DestroyOfficeRequestParams>;
export type DestroyOfficeRequestData = {
  data: OfficeDTO;
};
export type DestroyOfficeRequestParams = z.infer<typeof DestroyOfficeRequestParamsSchema>;
