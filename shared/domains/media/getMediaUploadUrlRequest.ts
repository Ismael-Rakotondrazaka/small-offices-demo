import type { MediaType } from '~~/shared/domains/media/mediaType';
import type { Request } from '~~/shared/requests/request';

import { FileLikeSchema } from '~~/shared/schemas/fileLikeSchema';
import { z } from 'zod';

import type { FileMetaDataDTO } from './mediaDTO';

export const GetMediaUploadUrlRequestBodySchema = z.object({
  file: FileLikeSchema,
});

export type GetMediaUploadUrlRequest = Request<
  GetMediaUploadUrlRequestData,
  GetMediaUploadUrlRequestBody,
  Record<string, never>,
  Record<string, never>
>;

export type GetMediaUploadUrlRequestBody = z.infer<
  typeof GetMediaUploadUrlRequestBodySchema
>;

export type GetMediaUploadUrlRequestData = {
  fileMetaData: {
    type: MediaType;
  } & FileMetaDataDTO;
  uploadUrl: string;
};
