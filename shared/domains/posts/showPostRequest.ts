import type { Request } from '~~/shared/requests/request';

import { StringIdentifierSchema } from '~~/shared/schemas/identifierSchema';
import { z } from 'zod';

import type { PostDTO } from './postDTO';

export const ShowPostRequestParamsSchema = z.object({
  id: StringIdentifierSchema,
});

export type ShowPostRequest = Request<
  ShowPostRequestData,
  Record<string, never>,
  ShowPostRequestParams
>;
export type ShowPostRequestData = {
  data: PostDTO;
};
export type ShowPostRequestParams = z.infer<typeof ShowPostRequestParamsSchema>;
