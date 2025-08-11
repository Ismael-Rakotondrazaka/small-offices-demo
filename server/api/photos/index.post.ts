import type { StorePhotoRequest } from '~~/server/utils';

import { StorePhotoRequestBodySchema } from '~~/server/utils';

export default defineEventHandler(new EventHandlerBuilder<StorePhotoRequest>().body(StorePhotoRequestBodySchema).handle(StorePhotoEventHandlerFn));
