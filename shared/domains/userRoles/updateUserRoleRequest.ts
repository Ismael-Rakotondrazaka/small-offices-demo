import { z } from 'zod';

import type { Request } from '../../../shared/requests/request';
import type { UserRoleDTO } from './userRoleDTO';

import { RoleSchema } from '../../../shared/domains/roles/role';
import { StringIdentifierSchema } from '../../../shared/schemas/identifierSchema';

export const UpdateUserRoleRequestParamsSchema = z.object({ id: StringIdentifierSchema }); ;

export type UpdateUserRoleRequestParams = z.infer<typeof UpdateUserRoleRequestParamsSchema>;

export const UpdateUserRoleRequestBodySchema = z.object({
  role: RoleSchema,
});

export type UpdateUserRoleRequest = Request<UpdateUserRoleRequestData, UpdateUserRoleRequestBody, UpdateUserRoleRequestParams>;
export type UpdateUserRoleRequestBody = z.infer<typeof UpdateUserRoleRequestBodySchema>;
export type UpdateUserRoleRequestData = { data: UserRoleDTO };
