import { z } from 'zod';

export interface UserRoleDTO {
  id: string;
  role: string;
}

export const UserRoleDTOSchema: z.ZodType<UserRoleDTO> = z.object({
  id: z.string(),
  role: z.string(),
});
