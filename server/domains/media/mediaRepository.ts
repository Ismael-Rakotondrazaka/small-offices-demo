import type { Prisma } from '~~/generated/prisma/client';
import type { ExtendedPrismaClient } from '~~/server/services/prisma/prismaProvider';

import type { MediaModel } from './mediaModel';

export class MediaRepository {
  #prismaClient: ExtendedPrismaClient;

  constructor(prismaClient: ExtendedPrismaClient) {
    this.#prismaClient = prismaClient;
  }

  public async addOne(arg: {
    data: Prisma.MediaCreateArgs['data'];
  }): Promise<MediaModel> {
    const { data } = arg;

    const media = await this.#prismaClient.media.create({
      data,
    });

    return media;
  }

  public async deleteOne(arg: { where: Prisma.MediaWhereUniqueInput }) {
    const { where } = arg;

    await this.#prismaClient.media.delete({
      where,
    });
  }

  public async existMany(arg: {
    expected: number;
    where: Prisma.MediaWhereInput;
  }) {
    const { expected, where } = arg;

    const count = await this.#prismaClient.media.count({
      where,
    });

    return count === expected;
  }

  public async existOne(arg: { where: Prisma.MediaWhereUniqueInput }) {
    const { where } = arg;

    const count = await this.#prismaClient.media.count({
      take: 1,
      where,
    });

    return count > 0;
  }

  public async findMany(arg: {
    orderBy?: Prisma.MediaOrderByWithRelationInput;
    where?: Prisma.MediaWhereInput;
  }): Promise<MediaModel[]> {
    const { orderBy, where } = arg;

    const media = await this.#prismaClient.media.findMany({
      orderBy,
      where,
    });

    return media;
  }

  public async findOne(arg: {
    orderBy?: Prisma.MediaOrderByWithRelationInput;
    where?: Prisma.MediaWhereInput;
  }): Promise<MediaModel | null> {
    const { orderBy, where } = arg;

    const media = await this.#prismaClient.media.findFirst({
      orderBy,
      where,
    });

    return media;
  }

  public async updateOne(arg: {
    data: Prisma.MediaUpdateArgs['data'];
    where: Prisma.MediaWhereUniqueInput;
  }): Promise<MediaModel> {
    const { data, where } = arg;

    const media = await this.#prismaClient.media.update({
      data,
      where,
    });

    return media;
  }
}
