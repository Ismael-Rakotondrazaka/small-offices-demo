import type { DestroyPhotoRequest } from '~~/server/utils';

import { DestroyPhotoRequestParamsSchema } from '~~/server/utils';

export default defineEventHandler(new EventHandlerBuilder<DestroyPhotoRequest>().params(DestroyPhotoRequestParamsSchema).handle(DestroyPhotoEventHandlerFn));
