import type { Post } from '~~/generated/prisma/client';
import type { MediaBaseModel } from '~~/server/domains/media/mediaBaseModel';
import type { UserModel } from '~~/server/domains/users/userModel';

export interface PostModel extends Post {
  author: UserModel;
  image: MediaBaseModel | null;
}
