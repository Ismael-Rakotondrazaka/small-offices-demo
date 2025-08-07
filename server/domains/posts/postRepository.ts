import type { Prisma } from '~~/generated/prisma/client';
import type { ExtendedPrismaClient } from '~~/server/services/prisma/prismaProvider';

import type { PostModel } from './postModel';

export class PostRepository {
  #prismaClient: ExtendedPrismaClient;

  constructor(prismaClient: ExtendedPrismaClient) {
    this.#prismaClient = prismaClient;
  }

  public async addOne(arg: {
    data: Prisma.PostCreateArgs['data'];
  }): Promise<PostModel> {
    const { data } = arg;

    const post = await this.#prismaClient.post.create({
      data,
      include: {
        author: {
          include: {
            image: true,
          },
        },
        image: true,
      },
    });

    return post;
  }

  public async count(arg: { where: Prisma.PostWhereInput }): Promise<number> {
    const { where } = arg;

    const count = await this.#prismaClient.post.count({
      where,
    });

    return count;
  }

  public async deleteOne(arg: { where: Prisma.PostWhereUniqueInput }) {
    const { where } = arg;

    await this.#prismaClient.post.delete({
      where,
    });
  }

  public async exist(arg: { where: Prisma.PostWhereUniqueInput }) {
    const { where } = arg;

    const count = await this.#prismaClient.post.count({
      take: 1,
      where,
    });

    return count > 0;
  }

  public async existMany(arg: { where: Prisma.PostWhereInput[] }) {
    const { where } = arg;

    const count = await this.#prismaClient.post.count({
      where: {
        AND: where,
      },
    });

    return count === where.length;
  }

  public async findMany(arg: {
    orderBy?:
      | Prisma.PostOrderByWithRelationInput
      | Prisma.PostOrderByWithRelationInput[];
    skip?: number;
    take?: number;
    where?: Prisma.PostWhereInput;
  }): Promise<PostModel[]> {
    const { orderBy, skip, take, where } = arg;

    const posts = await this.#prismaClient.post.findMany({
      include: {
        author: {
          include: {
            image: true,
          },
        },
        image: true,
      },
      orderBy,
      skip,
      take,
      where,
    });

    return posts;
  }

  public async findOne(arg: {
    orderBy?: Prisma.PostOrderByWithRelationInput;
    where?: Prisma.PostWhereInput;
  }): Promise<null | PostModel> {
    const { orderBy, where } = arg;

    const post = await this.#prismaClient.post.findFirst({
      include: {
        author: {
          include: {
            image: true,
          },
        },
        image: true,
      },
      orderBy,
      where,
    });

    return post;
  }

  public async updateOne(arg: {
    data: Prisma.PostUpdateArgs['data'];
    where: Prisma.PostWhereUniqueInput;
  }): Promise<PostModel> {
    const { data, where } = arg;

    const post = await this.#prismaClient.post.update({
      data,
      include: {
        author: {
          include: {
            image: true,
          },
        },
        image: true,
      },
      where,
    });

    return post;
  }
}
