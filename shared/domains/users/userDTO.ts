import { z } from 'zod';

export interface UserDTO {
  firstName: string;
  id: string;
  image: null | string;
  lastName: string;
}

export const UserDTOSchema: z.ZodType<UserDTO> = z.object({
  firstName: z.string(),
  id: z.string(),
  image: z.string().nullable(),
  lastName: z.string(),
});
