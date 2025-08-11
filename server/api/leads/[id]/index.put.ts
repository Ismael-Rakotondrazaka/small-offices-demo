import type { UpdateLeadRequest } from '~~/server/utils';

import { UpdateLeadRequestBodySchema, UpdateLeadRequestParamsSchema } from '~~/server/utils';

export default defineEventHandler(new EventHandlerBuilder<UpdateLeadRequest>().body(UpdateLeadRequestBodySchema).params(UpdateLeadRequestParamsSchema).handle(UpdateLeadEventHandlerFn));
