import type { StoreOfficeRequest } from '~~/server/utils';

import { StoreOfficeRequestBodySchema } from '~~/server/utils';

export default defineEventHandler(new EventHandlerBuilder<StoreOfficeRequest>().body(StoreOfficeRequestBodySchema).handle(StoreOfficeEventHandlerFn));
