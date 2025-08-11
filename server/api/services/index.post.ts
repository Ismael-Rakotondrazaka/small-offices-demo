import type { StoreServiceRequest } from '~~/server/utils';

import { StoreServiceRequestBodySchema } from '~~/server/utils';

export default defineEventHandler(new EventHandlerBuilder<StoreServiceRequest>().body(StoreServiceRequestBodySchema).handle(StoreServiceEventHandlerFn));
