import type { DestroyServiceRequest } from '~~/server/utils';

import { DestroyServiceRequestParamsSchema } from '~~/server/utils';

export default defineEventHandler(new EventHandlerBuilder<DestroyServiceRequest>().params(DestroyServiceRequestParamsSchema).handle(DestroyServiceEventHandlerFn));
