import type { ShowOfficeRequest } from '~~/server/utils';

import { ShowOfficeRequestParamsSchema } from '~~/server/utils';

export default defineEventHandler(new EventHandlerBuilder<ShowOfficeRequest>().params(ShowOfficeRequestParamsSchema).handle(ShowOfficeEventHandlerFn));
