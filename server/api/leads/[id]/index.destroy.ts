import type { DestroyLeadRequest } from '~~/server/utils';

import { DestroyLeadRequestParamsSchema } from '~~/server/utils';

export default defineEventHandler(new EventHandlerBuilder<DestroyLeadRequest>().params(DestroyLeadRequestParamsSchema).handle(DestroyLeadEventHandlerFn));
