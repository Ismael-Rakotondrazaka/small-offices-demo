import type { ConfirmMediaUploadRequest } from '~~/server/utils';

import {
  confirmMediaUploadEventHandlerFn,
  ConfirmMediaUploadRequestBodySchema,
} from '~~/server/utils';

export default defineEventHandler(
  new EventHandlerBuilder<ConfirmMediaUploadRequest>()
    .body(ConfirmMediaUploadRequestBodySchema)
    .handle(confirmMediaUploadEventHandlerFn),
);
