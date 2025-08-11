import type { UpdateServiceRequest } from '~~/server/utils';

import { UpdateServiceRequestBodySchema, UpdateServiceRequestParamsSchema } from '~~/server/utils';

export default defineEventHandler(new EventHandlerBuilder<UpdateServiceRequest>().body(UpdateServiceRequestBodySchema).params(UpdateServiceRequestParamsSchema).handle(UpdateServiceEventHandlerFn));
