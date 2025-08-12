import type { Request } from '#shared/requests/request';

import { z } from 'zod';

import { FileMetaDataDTOSchema, type MediaDTO } from './mediaDTO';
import { MediaTypeSchema } from './mediaType';

export const ConfirmMediaUploadRequestBodySchema = z.object({
  fileMetaData: FileMetaDataDTOSchema.and(
    z.object({
      type: MediaTypeSchema,
    }),
  ),
});

export type ConfirmMediaUploadRequest = Request<
  ConfirmMediaUploadRequestData,
  ConfirmMediaUploadRequestBody,
  Record<string, never>,
  Record<string, never>
>;

export type ConfirmMediaUploadRequestBody = z.infer<
  typeof ConfirmMediaUploadRequestBodySchema
>;

export type ConfirmMediaUploadRequestData = {
  media: MediaDTO;
};
