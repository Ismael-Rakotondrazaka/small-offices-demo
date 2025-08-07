import type { HelloRequest } from '~~/server/utils';

import { EventHandlerBuilder, helloEventHandlerFn } from '~~/server/utils';

export default defineEventHandler(
  new EventHandlerBuilder<HelloRequest>()
    .query(HelloRequestQuerySchema)
    .handle(helloEventHandlerFn),
);
