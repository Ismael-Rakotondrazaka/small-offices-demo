import type { Request } from '~~/shared/requests/request';

import { StringIdentifierSchema } from '~~/shared/schemas/identifierSchema';
import { z } from 'zod';

import type { PhotoDTO } from './photoDTO';

export const ShowPhotoRequestParamsSchema = z.object({ id: StringIdentifierSchema }); ;

export type ShowPhotoRequest = Request<ShowPhotoRequestData, Record<string, never>, ShowPhotoRequestParams>;
export type ShowPhotoRequestData = {
  data: PhotoDTO;
};
export type ShowPhotoRequestParams = z.infer<typeof ShowPhotoRequestParamsSchema>;
