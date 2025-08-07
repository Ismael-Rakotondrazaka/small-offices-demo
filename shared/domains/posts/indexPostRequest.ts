import type { PaginationDTO } from '~~/shared/domains/paginations/paginationDTO';
import type { Request } from '~~/shared/requests/request';

import { postConfig } from '~~/shared/domains/posts/postConfig';
import { makePaginatedSchema } from '~~/shared/schemas/paginationSchema';
import { SortOrderSchema } from '~~/shared/schemas/sortOrderSchema';
import { z } from 'zod';

import type { PostDTO } from './postDTO';

export type IndexPostRequestData = {
  data: PostDTO[];
  pagination: PaginationDTO;
};

export const IndexPostRequestQuerySchema = z
  .object({
    'orderBy[createdAt]': SortOrderSchema,
    'orderBy[id]': SortOrderSchema,
  })
  .partial()
  .merge(
    makePaginatedSchema({
      defaultPageSize: postConfig.PAGE_SIZE_DEFAULT_VALUE,
    }),
  );

export type IndexPostRequest = Request<
  IndexPostRequestData,
  Record<string, never>,
  Record<string, never>,
  IndexPostRequestQuery
>;
export type IndexPostRequestQuery = z.infer<typeof IndexPostRequestQuerySchema>;
