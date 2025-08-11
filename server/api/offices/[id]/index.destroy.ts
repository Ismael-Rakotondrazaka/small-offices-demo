import type { DestroyOfficeRequest } from '~~/server/utils';

import { DestroyOfficeRequestParamsSchema } from '~~/server/utils';

export default defineEventHandler(new EventHandlerBuilder<DestroyOfficeRequest>().params(DestroyOfficeRequestParamsSchema).handle(DestroyOfficeEventHandlerFn));
