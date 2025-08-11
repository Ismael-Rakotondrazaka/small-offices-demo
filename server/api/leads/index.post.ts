import type { StoreLeadRequest } from '~~/server/utils';

import { StoreLeadRequestBodySchema } from '~~/server/utils';

export default defineEventHandler(new EventHandlerBuilder<StoreLeadRequest>().body(StoreLeadRequestBodySchema).handle(StoreLeadEventHandlerFn));
