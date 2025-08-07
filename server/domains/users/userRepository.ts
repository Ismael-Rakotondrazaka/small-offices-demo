import type { Prisma } from '~~/generated/prisma/client';
import type { ExtendedPrismaClient } from '~~/server/services/prisma/prismaProvider';

import type { UserModel } from './userModel';

export class UserRepository {
  #prismaClient: ExtendedPrismaClient;

  constructor(prismaClient: ExtendedPrismaClient) {
    this.#prismaClient = prismaClient;
  }

  public async addOne(arg: {
    data: Prisma.UserCreateArgs['data'];
  }): Promise<UserModel> {
    const user = await this.#prismaClient.user.create({
      data: arg.data,
      include: {
        image: true,
      },
    });

    return user;
  }

  public async deleteOne(arg: { where: Prisma.UserWhereUniqueInput }) {
    await this.#prismaClient.user.delete({
      where: arg.where,
    });
  }

  public async exist(arg: { where: Prisma.UserWhereUniqueInput }) {
    const count = await this.#prismaClient.user.count({
      take: 1,
      where: arg.where,
    });

    return count > 0;
  }

  public async existMany(arg: {
    expected: number;
    where: Prisma.UserWhereInput;
  }): Promise<boolean> {
    const { expected, where } = arg;
    const count = await this.#prismaClient.user.count({ where });
    return count === expected;
  }

  public async existOne(arg: {
    where: Prisma.UserWhereUniqueInput;
  }): Promise<boolean> {
    const { where } = arg;
    const count = await this.#prismaClient.user.count({ take: 1, where });
    return count > 0;
  }

  public async findMany(arg: {
    orderBy?: Prisma.UserOrderByWithRelationInput;
    where?: Prisma.UserWhereInput;
  }): Promise<UserModel[]> {
    const users = await this.#prismaClient.user.findMany({
      include: {
        image: true,
      },
      orderBy: arg.orderBy,
      where: arg.where,
    });

    return users;
  }

  public async findOne(arg: {
    orderBy?: Prisma.UserOrderByWithRelationInput;
    where?: Prisma.UserWhereInput;
  }): Promise<null | UserModel> {
    const user = await this.#prismaClient.user.findFirst({
      include: {
        image: true,
      },
      orderBy: arg.orderBy,
      where: arg.where,
    });

    return user;
  }

  public async updateOne(arg: {
    data: Prisma.UserUpdateArgs['data'];
    where: Prisma.UserWhereUniqueInput;
  }): Promise<UserModel> {
    const user = await this.#prismaClient.user.update({
      data: arg.data,
      include: {
        image: true,
      },
      where: arg.where,
    });

    return user;
  }
}
