import type { UpdatePhotoRequest } from '~~/server/utils';

import { UpdatePhotoRequestBodySchema, UpdatePhotoRequestParamsSchema } from '~~/server/utils';

export default defineEventHandler(new EventHandlerBuilder<UpdatePhotoRequest>().body(UpdatePhotoRequestBodySchema).params(UpdatePhotoRequestParamsSchema).handle(UpdatePhotoEventHandlerFn));
