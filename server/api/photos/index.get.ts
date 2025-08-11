import type { IndexPhotoRequest } from '~~/server/utils';

import { IndexPhotoRequestQuerySchema } from '~~/server/utils';

export default defineEventHandler(new EventHandlerBuilder<IndexPhotoRequest>().query(IndexPhotoRequestQuerySchema).handle(IndexPhotoEventHandlerFn));
