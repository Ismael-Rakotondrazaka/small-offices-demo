import type { UserRoleDTO } from '~~/shared/domains/users/userRoleDTO';
import type { Request } from '~~/shared/requests/request';

import { userConfig } from '~~/shared/domains/users/userConfig';
import { z } from 'zod';

export const RegisterRequestBodySchema = z.object({
  email: z.string().email(),
  firstName: z
    .string()
    .min(userConfig.FIRST_NAME_MIN_LENGTH)
    .max(userConfig.FIRST_NAME_MAX_LENGTH),
  lastName: z
    .string()
    .min(userConfig.LAST_NAME_MIN_LENGTH)
    .max(userConfig.LAST_NAME_MAX_LENGTH),
  password: z.string().min(8),
});

export type RegisterRequest = Request<RegisterRequestData, RegisterRequestBody>;

export type RegisterRequestBody = z.infer<typeof RegisterRequestBodySchema>;

export type RegisterRequestData = {
  data: UserRoleDTO;
};
