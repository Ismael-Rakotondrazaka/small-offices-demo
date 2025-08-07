import type { Request } from '~~/shared/requests/request';

import { StringIdentifierSchema } from '~~/shared/schemas/identifierSchema';
import { z } from 'zod';

import type { PostDTO } from './postDTO';

export const UpdatePostRequestParamsSchema = z.object({
  id: StringIdentifierSchema,
});

export type UpdatePostRequestParams = z.infer<
  typeof UpdatePostRequestParamsSchema
>;

export const UpdatePostRequestBodySchema = z.object({
  authorId: z.string().optional(),
  content: z.string().optional(),
  imageId: z.string().nullable().optional(),
});

export type UpdatePostRequest = Request<
  UpdatePostRequestData,
  UpdatePostRequestBody,
  UpdatePostRequestParams
>;
export type UpdatePostRequestBody = z.infer<typeof UpdatePostRequestBodySchema>;
export type UpdatePostRequestData = { data: PostDTO };
