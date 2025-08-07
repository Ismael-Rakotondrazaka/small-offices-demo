import type { Media, PrismaClient, User } from '~~/generated/prisma/client';

import { faker } from '@faker-js/faker';
import mime from 'mime';

export const createProfileImages = async (arg: {
  prisma: PrismaClient;
  users: User[];
}): Promise<Media[]> => {
  const { prisma, users } = arg;

  const medias: Media[] = await Promise.all(
    users.map((user) => {
      const url = new URL(faker.image.urlPicsumPhotos());
      const relativePath: string = url.pathname;
      const name: string = relativePath.split('/').at(-1)!;
      const mimeType: null | string = mime.getType(name);
      const ext: null | string = name.split('.').at(-1)!;

      return prisma.media.create({
        data: {
          authorId: user.id,
          createdAt: faker.date.soon({
            refDate: user.createdAt,
          }),
          ext,
          mimeType,
          name,
          originalName: name,
          profiledBy: {
            connect: {
              id: user.id,
            },
          },
          relativePath,
          type: 'IMAGE',
        },
      });
    }),
  );

  return medias;
};
