import type { Prisma } from '~~/generated/prisma/client';
import type { ExtendedPrismaClient } from '~~/server/services/prisma/prismaProvider';

import type { AuthAccessModel } from './authAccessModel';

export class AuthAccessRepository {
  static readonly #includeArg = {} satisfies Prisma.AuthAccessInclude;
  #prismaClient: ExtendedPrismaClient;

  constructor(prismaClient: ExtendedPrismaClient) {
    this.#prismaClient = prismaClient;
  }

  public async addOne(arg: {
    data: Prisma.AuthAccessCreateArgs['data'];
  }): Promise<AuthAccessModel> {
    const { data } = arg;
    return this.#prismaClient.authAccess.create({
      data,
      include: AuthAccessRepository.#includeArg,
    });
  }

  public async count(arg: {
    orderBy?:
      | Prisma.AuthAccessOrderByWithRelationInput
      | Prisma.AuthAccessOrderByWithRelationInput[];
    skip?: number;
    take?: number;
    where?: Prisma.AuthAccessWhereInput;
  }): Promise<number> {
    const { orderBy, skip, take, where } = arg;
    return this.#prismaClient.authAccess.count({ orderBy, skip, take, where });
  }

  public async deleteOne(arg: { where: Prisma.AuthAccessWhereUniqueInput }) {
    const { where } = arg;
    await this.#prismaClient.authAccess.delete({ where });
  }

  public async existMany(arg: {
    expected: number;
    where: Prisma.AuthAccessWhereInput;
  }): Promise<boolean> {
    const { expected, where } = arg;
    const count = await this.#prismaClient.authAccess.count({ where });
    return count === expected;
  }

  public async existOne(arg: {
    where: Prisma.AuthAccessWhereUniqueInput;
  }): Promise<boolean> {
    const { where } = arg;
    const count = await this.#prismaClient.authAccess.count({ take: 1, where });
    return count > 0;
  }

  public async findMany(arg: {
    orderBy?:
      | Prisma.AuthAccessOrderByWithRelationInput
      | Prisma.AuthAccessOrderByWithRelationInput[];
    skip?: number;
    take?: number;
    where?: Prisma.AuthAccessWhereInput;
  }): Promise<AuthAccessModel[]> {
    const { orderBy, skip, take, where } = arg;
    return this.#prismaClient.authAccess.findMany({
      include: AuthAccessRepository.#includeArg,
      orderBy,
      skip,
      take,
      where,
    });
  }

  public async findOne(arg: {
    orderBy?:
      | Prisma.AuthAccessOrderByWithRelationInput
      | Prisma.AuthAccessOrderByWithRelationInput[];
    where?: Prisma.AuthAccessWhereInput;
  }): Promise<AuthAccessModel | null> {
    const { orderBy, where } = arg;
    return this.#prismaClient.authAccess.findFirst({
      include: AuthAccessRepository.#includeArg,
      orderBy,
      where,
    });
  }

  public async updateOne(arg: {
    data: Prisma.AuthAccessUpdateArgs['data'];
    where: Prisma.AuthAccessWhereUniqueInput;
  }): Promise<AuthAccessModel> {
    const { data, where } = arg;
    return this.#prismaClient.authAccess.update({
      data,
      include: AuthAccessRepository.#includeArg,
      where,
    });
  }
}
