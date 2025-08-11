import type { UpdateUserRoleRequest } from '~~/server/utils';

import { UpdateUserRoleRequestBodySchema, UpdateUserRoleRequestParamsSchema } from '~~/server/utils';

export default defineEventHandler(new EventHandlerBuilder<UpdateUserRoleRequest>().body(UpdateUserRoleRequestBodySchema).params(UpdateUserRoleRequestParamsSchema).handle(UpdateUserRoleEventHandlerFn));
