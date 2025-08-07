import type { UserDTO } from '~~/shared/domains/users/userDTO';
import type { Request } from '~~/shared/requests/request';

import { z } from 'zod';

export const SignInWithCredentialsRequestBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignInWithCredentialsRequest = Request<
  SignInWithCredentialsRequestData,
  SignInWithCredentialsRequestBody
>;

export type SignInWithCredentialsRequestBody = z.infer<
  typeof SignInWithCredentialsRequestBodySchema
>;

export type SignInWithCredentialsRequestData = {
  data: UserDTO;
};
