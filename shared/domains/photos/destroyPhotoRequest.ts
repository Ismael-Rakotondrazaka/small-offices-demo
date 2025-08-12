import type { PhotoDTO } from '#shared/domains/photos/photoDTO';
import type { Request } from '#shared/requests/request';

import { StringIdentifierSchema } from '#shared/schemas/identifierSchema';
import { z } from 'zod';

export const DestroyPhotoRequestParamsSchema = z.object({ id: StringIdentifierSchema }); ;

export type DestroyPhotoRequest = Request<DestroyPhotoRequestData, Record<string, never>, DestroyPhotoRequestParams>;
export type DestroyPhotoRequestData = {
  data: PhotoDTO;
};
export type DestroyPhotoRequestParams = z.infer<typeof DestroyPhotoRequestParamsSchema>;
