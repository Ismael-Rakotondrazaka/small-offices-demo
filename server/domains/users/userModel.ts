import type { Media, User } from '~~/generated/prisma/client';

export interface UserModel extends User {
  image: Media | null;
}
