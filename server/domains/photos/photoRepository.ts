import type { Prisma } from '~~/generated/prisma/client';
import type { ExtendedPrismaClient } from '~~/server/services/prisma/prismaProvider';

export class PhotoRepository {
  static readonly #includeArg = {} satisfies Prisma.PhotoInclude;
  #prismaClient: ExtendedPrismaClient;

  constructor(prismaClient: ExtendedPrismaClient) {
    this.#prismaClient = prismaClient;
  }

  public async addOne(arg: { data: Prisma.PhotoCreateArgs['data'] }): Promise<PhotoModel> {
    const { data } = arg;
    return this.#prismaClient.photo.create({ data, include: PhotoRepository.#includeArg });
  }

  public async count(arg: {
    orderBy?: Prisma.PhotoOrderByWithRelationInput | Prisma.PhotoOrderByWithRelationInput[];
    skip?: number;
    take?: number;
    where?: Prisma.PhotoWhereInput;
  }): Promise<number> {
    const { orderBy, skip, take, where } = arg;
    return this.#prismaClient.photo.count({ orderBy, skip, take, where });
  }

  public async deleteOne(arg: { where: Prisma.PhotoWhereUniqueInput }) {
    const { where } = arg;
    await this.#prismaClient.photo.delete({ where });
  }

  public async existMany(arg: {
    expected: number;
    where: Prisma.PhotoWhereInput;
  }): Promise<boolean> {
    const { expected, where } = arg;
    const count = await this.#prismaClient.photo.count({ where });
    return count === expected;
  }

  public async existOne(arg: { where: Prisma.PhotoWhereUniqueInput }): Promise<boolean> {
    const { where } = arg;
    const count = await this.#prismaClient.photo.count({ take: 1, where });
    return count > 0;
  }

  public async findMany(arg: {
    orderBy?: Prisma.PhotoOrderByWithRelationInput | Prisma.PhotoOrderByWithRelationInput[];
    skip?: number;
    take?: number;
    where?: Prisma.PhotoWhereInput;
  }): Promise<PhotoModel[]> {
    const { orderBy, skip, take, where } = arg;
    return this.#prismaClient.photo.findMany({ include: PhotoRepository.#includeArg, orderBy, skip, take, where });
  }

  public async findOne(arg: {
    orderBy?: Prisma.PhotoOrderByWithRelationInput | Prisma.PhotoOrderByWithRelationInput[];
    where?: Prisma.PhotoWhereInput;
  }): Promise<null | PhotoModel> {
    const { orderBy, where } = arg;
    return this.#prismaClient.photo.findFirst({ include: PhotoRepository.#includeArg, orderBy, where });
  }

  public async updateOne(arg: {
    data: Prisma.PhotoUpdateArgs['data'];
    where: Prisma.PhotoWhereUniqueInput;
  }): Promise<PhotoModel> {
    const { data, where } = arg;
    return this.#prismaClient.photo.update({ data, include: PhotoRepository.#includeArg, where });
  }
}
