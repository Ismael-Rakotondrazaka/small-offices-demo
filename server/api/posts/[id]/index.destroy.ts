import type { DestroyPostRequest } from '~~/server/utils';

import { DestroyPostRequestParamsSchema } from '~~/server/utils';

export default defineEventHandler(
  new EventHandlerBuilder<DestroyPostRequest>()
    .params(DestroyPostRequestParamsSchema)
    .handle(DestroyPostEventHandlerFn),
);
