import type { SignInWithCredentialsRequest } from '~~/server/utils';

import {
  signInWithCredentialsEventHandlerFn,
  SignInWithCredentialsRequestBodySchema,
} from '~~/server/utils';

export default defineEventHandler(
  new EventHandlerBuilder<SignInWithCredentialsRequest>()
    .body(SignInWithCredentialsRequestBodySchema)
    .handle(signInWithCredentialsEventHandlerFn),
);
