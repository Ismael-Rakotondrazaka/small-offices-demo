import {
  type MediaDTO,
  MediaDTOSchema,
} from '~~/shared/domains/media/mediaDTO';
import { type UserRoleDTO, UserRoleDTOSchema } from '~~/shared/domains/users/userRoleDTO';
import { z } from 'zod';

export interface PostDTO {
  author: UserRoleDTO;
  content: string;
  createdAt: Date;
  deletedAt: Date | null;
  id: string;
  image: MediaDTO | null;
  updatedAt: Date;
}

export const PostSchema = z.object({
  content: z.string(),
  createdAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
  id: z.string(),
  updatedAt: z.coerce.date(),
});

export const PostDTOSchema: z.ZodType<PostDTO> = PostSchema.extend({
  author: UserRoleDTOSchema,
  image: MediaDTOSchema.nullable(),
});
