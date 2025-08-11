import type { UpdateOfficeRequest } from '~~/server/utils';

import { UpdateOfficeRequestBodySchema, UpdateOfficeRequestParamsSchema } from '~~/server/utils';

export default defineEventHandler(new EventHandlerBuilder<UpdateOfficeRequest>().body(UpdateOfficeRequestBodySchema).params(UpdateOfficeRequestParamsSchema).handle(UpdateOfficeEventHandlerFn));
