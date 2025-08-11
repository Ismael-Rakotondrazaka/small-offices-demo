import type { ShowServiceRequest } from '~~/server/utils';

import { ShowServiceRequestParamsSchema } from '~~/server/utils';

export default defineEventHandler(new EventHandlerBuilder<ShowServiceRequest>().params(ShowServiceRequestParamsSchema).handle(ShowServiceEventHandlerFn));
