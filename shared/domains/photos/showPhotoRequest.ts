import { z } from 'zod';

import type { Request } from '../../../shared/requests/request';
import type { PhotoDTO } from './photoDTO';

import { StringIdentifierSchema } from '../../../shared/schemas/identifierSchema';

export const ShowPhotoRequestParamsSchema = z.object({ id: StringIdentifierSchema }); ;

export type ShowPhotoRequest = Request<ShowPhotoRequestData, Record<string, never>, ShowPhotoRequestParams>;
export type ShowPhotoRequestData = {
  data: PhotoDTO;
};
export type ShowPhotoRequestParams = z.infer<typeof ShowPhotoRequestParamsSchema>;
