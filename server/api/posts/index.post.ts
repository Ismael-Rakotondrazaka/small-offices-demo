import type { StorePostRequest } from '~~/server/utils';

import { StorePostRequestBodySchema } from '~~/server/utils';

export default defineEventHandler(
  new EventHandlerBuilder<StorePostRequest>()
    .body(StorePostRequestBodySchema)
    .handle(StorePostEventHandlerFn),
);
