import type { GetMediaUploadUrlRequest } from '~~/server/utils';

import { GetMediaUploadUrlRequestBodySchema } from '~~/server/utils';

export default defineEventHandler(
  new EventHandlerBuilder<GetMediaUploadUrlRequest>()
    .body(GetMediaUploadUrlRequestBodySchema)
    .handle(getMediaUploadUrlEventHandlerFn),
);
