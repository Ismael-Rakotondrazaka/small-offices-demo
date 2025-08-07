import type { Request } from '~~/shared/requests/request';

import { StringIdentifierSchema } from '~~/shared/schemas/identifierSchema';
import { z } from 'zod';

import type { PostDTO } from './postDTO';

export const DestroyPostRequestParamsSchema = z.object({
  id: StringIdentifierSchema,
});

export type DestroyPostRequest = Request<
  DestroyPostRequestData,
  Record<string, never>,
  DestroyPostRequestParams
>;
export type DestroyPostRequestData = {
  data: PostDTO;
};
export type DestroyPostRequestParams = z.infer<
  typeof DestroyPostRequestParamsSchema
>;
