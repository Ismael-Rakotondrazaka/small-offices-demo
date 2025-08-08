import type { Post } from '~~/generated/prisma/client';
import type { MediaBaseModel } from '~~/server/domains/media/mediaBaseModel';
import type { UserRoleModel } from '~~/server/domains/users/userRoleModel';

export interface PostModel extends Post {
  author: UserRoleModel;
  image: MediaBaseModel | null;
}
