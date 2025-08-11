import type { IndexOfficeRequest } from '~~/server/utils';

import { IndexOfficeRequestQuerySchema } from '~~/server/utils';

export default defineEventHandler(new EventHandlerBuilder<IndexOfficeRequest>().query(IndexOfficeRequestQuerySchema).handle(IndexOfficeEventHandlerFn));
