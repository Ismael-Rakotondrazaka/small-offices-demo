import type { IndexServiceRequest } from '~~/server/utils';

import { IndexServiceRequestQuerySchema } from '~~/server/utils';

export default defineEventHandler(new EventHandlerBuilder<IndexServiceRequest>().query(IndexServiceRequestQuerySchema).handle(IndexServiceEventHandlerFn));
