import type { ShowPhotoRequest } from '~~/server/utils';

import { ShowPhotoRequestParamsSchema } from '~~/server/utils';

export default defineEventHandler(new EventHandlerBuilder<ShowPhotoRequest>().params(ShowPhotoRequestParamsSchema).handle(ShowPhotoEventHandlerFn));
