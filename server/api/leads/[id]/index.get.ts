import type { ShowLeadRequest } from '~~/server/utils';

import { ShowLeadRequestParamsSchema } from '~~/server/utils';

export default defineEventHandler(new EventHandlerBuilder<ShowLeadRequest>().params(ShowLeadRequestParamsSchema).handle(ShowLeadEventHandlerFn));
