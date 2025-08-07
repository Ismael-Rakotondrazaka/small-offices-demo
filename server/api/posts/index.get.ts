import type { IndexPostRequest } from '~~/server/utils';

import { IndexPostRequestQuerySchema } from '~~/server/utils';

export default defineEventHandler(
  new EventHandlerBuilder<IndexPostRequest>()
    .query(IndexPostRequestQuerySchema)
    .handle(IndexPostEventHandlerFn),
);
