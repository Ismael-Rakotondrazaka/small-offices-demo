import type { Request } from '~~/shared/requests/request';

import { z } from 'zod';

import type { PostDTO } from './postDTO';

export const StorePostRequestBodySchema = z.object({
  authorId: z.string(),
  content: z.string(),
  imageId: z.string().nullable(),
});

export type StorePostRequest = Request<
  StorePostRequestData,
  StorePostRequestBody
>;
export type StorePostRequestBody = z.infer<typeof StorePostRequestBodySchema>;
export type StorePostRequestData = {
  data: PostDTO;
};
