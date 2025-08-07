import type { RegisterRequest } from '~~/server/utils';

import {
  registerEventHandlerFn,
  RegisterRequestBodySchema,
} from '~~/server/utils';

export default defineEventHandler(
  new EventHandlerBuilder<RegisterRequest>()
    .body(RegisterRequestBodySchema)
    .handle(registerEventHandlerFn),
);
