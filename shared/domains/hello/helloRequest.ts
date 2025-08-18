import { z } from 'zod';

import type { Request } from '../../../shared/requests/request';

export const HelloRequestQuerySchema = z.object({
  name: z.string().min(3).optional(),
});

export type HelloRequest = Request<
  HelloRequestData,
  Record<string, never>,
  Record<string, never>,
  HelloRequestQuery
>;

export type HelloRequestData = {
  message: string;
};

export type HelloRequestQuery = z.infer<typeof HelloRequestQuerySchema>;
