import type { IndexLeadRequest } from '~~/server/utils';

import { IndexLeadRequestQuerySchema } from '~~/server/utils';

export default defineEventHandler(new EventHandlerBuilder<IndexLeadRequest>().query(IndexLeadRequestQuerySchema).handle(IndexLeadEventHandlerFn));
