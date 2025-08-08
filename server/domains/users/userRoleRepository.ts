import type { Prisma } from '~~/generated/prisma/client';
import type { ExtendedPrismaClient } from '~~/server/services/prisma/prismaProvider';

import type { UserRoleModel } from './userRoleModel';

export class UserRoleRepository {
  #prismaClient: ExtendedPrismaClient;

  constructor(prismaClient: ExtendedPrismaClient) {
    this.#prismaClient = prismaClient;
  }

  public async addOne(arg: {
    data: Prisma.UserRoleCreateArgs['data'];
  }): Promise<UserRoleModel> {
    const userRole = await this.#prismaClient.userRole.create({
      data: arg.data,
    });

    return userRole;
  }

  public async deleteOne(arg: { where: Prisma.UserRoleWhereUniqueInput }) {
    await this.#prismaClient.userRole.delete({
      where: arg.where,
    });
  }

  public async exist(arg: { where: Prisma.UserRoleWhereUniqueInput }) {
    const count = await this.#prismaClient.userRole.count({
      take: 1,
      where: arg.where,
    });

    return count > 0;
  }

  public async existMany(arg: {
    expected: number;
    where: Prisma.UserRoleWhereInput;
  }): Promise<boolean> {
    const { expected, where } = arg;
    const count = await this.#prismaClient.userRole.count({ where });
    return count === expected;
  }

  public async existOne(arg: {
    where: Prisma.UserRoleWhereUniqueInput;
  }): Promise<boolean> {
    const { where } = arg;
    const count = await this.#prismaClient.userRole.count({ take: 1, where });
    return count > 0;
  }

  public async findMany(arg: {
    orderBy?: Prisma.UserRoleOrderByWithRelationInput;
    where?: Prisma.UserRoleWhereInput;
  }): Promise<UserRoleModel[]> {
    const userRoles = await this.#prismaClient.userRole.findMany({
      orderBy: arg.orderBy,
      where: arg.where,
    });

    return userRoles;
  }

  public async findOne(arg: {
    orderBy?: Prisma.UserRoleOrderByWithRelationInput;
    where?: Prisma.UserRoleWhereInput;
  }): Promise<null | UserRoleModel> {
    const userRole = await this.#prismaClient.userRole.findFirst({
      orderBy: arg.orderBy,
      where: arg.where,
    });

    return userRole;
  }

  public async updateOne(arg: {
    data: Prisma.UserRoleUpdateArgs['data'];
    where: Prisma.UserRoleWhereUniqueInput;
  }): Promise<UserRoleModel> {
    const userRole = await this.#prismaClient.userRole.update({
      data: arg.data,
      where: arg.where,
    });

    return userRole;
  }
}
