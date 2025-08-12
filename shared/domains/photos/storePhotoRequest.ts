import type { Request } from '#shared/requests/request';

import { z } from 'zod';

import type { PhotoDTO } from './photoDTO';

export const StorePhotoRequestBodySchema = z.object({ alt: z.string().nullable(), officeId: z.string(), url: z.string() });

export type StorePhotoRequest = Request<StorePhotoRequestData, StorePhotoRequestBody>;
export type StorePhotoRequestBody = z.infer<typeof StorePhotoRequestBodySchema>;
export type StorePhotoRequestData = {
  data: PhotoDTO;
};
