import type {
  Post,
  Prisma,
  PrismaClient,
  User,
} from '~~/generated/prisma/client';

import { faker } from '@faker-js/faker';
import mime from 'mime';

export const createPosts = async (arg: {
  prisma: PrismaClient;
  users: User[];
}): Promise<Post[]> => {
  const { prisma, users } = arg;

  const posts: Post[] = await prisma.post.createManyAndReturn({
    data: users.flatMap((user) => {
      return faker.helpers.multiple(
        (): Prisma.PostCreateManyInput => {
          const createdAt = faker.date.soon({
            days: 30 * 3, // 3 months
            refDate: user.createdAt,
          });

          return {
            authorId: user.id,
            content: faker.lorem.paragraphs({
              max: 5,
              min: 1,
            }),
            createdAt,
            updatedAt: createdAt,
          };
        },
        {
          count: faker.number.int({
            max: 10,
            min: 5,
          }),
        },
      );
    }),
  });

  await Promise.all(
    posts.map((post) => {
      const url = new URL(faker.image.urlPicsumPhotos());
      const relativePath: string = url.pathname;
      const name: string = relativePath.split('/').at(-1)!;
      const mimeType: null | string = mime.getType(name);
      const ext: null | string = name.split('.').at(-1)!;

      return prisma.media.create({
        data: {
          authorId: post.authorId,
          createdAt: faker.date.recent({
            refDate: post.createdAt,
          }),
          ext,
          mimeType,
          name,
          originalName: name,
          posts: {
            connect: {
              id: post.id,
            },
          },
          relativePath,
          type: 'IMAGE',
        },
      });
    }),
  );

  return posts;
};
