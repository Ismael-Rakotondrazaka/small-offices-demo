import type { UpdatePostRequest } from '~~/server/utils';

import {
  UpdatePostRequestBodySchema,
  UpdatePostRequestParamsSchema,
} from '~~/server/utils';

export default defineEventHandler(
  new EventHandlerBuilder<UpdatePostRequest>()
    .body(UpdatePostRequestBodySchema)
    .params(UpdatePostRequestParamsSchema)
    .handle(UpdatePostEventHandlerFn),
);
