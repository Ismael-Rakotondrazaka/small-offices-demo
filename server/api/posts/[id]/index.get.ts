import type { ShowPostRequest } from '~~/server/utils';

import { ShowPostRequestParamsSchema } from '~~/server/utils';

export default defineEventHandler(
  new EventHandlerBuilder<ShowPostRequest>()
    .params(ShowPostRequestParamsSchema)
    .handle(ShowPostEventHandlerFn),
);
