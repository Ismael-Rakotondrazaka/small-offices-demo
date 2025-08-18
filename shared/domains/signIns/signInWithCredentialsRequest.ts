import { z } from 'zod';

import type { Request } from '../../../shared/requests/request';

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

export type SignInWithCredentialsRequestData = Record<string, never>;
