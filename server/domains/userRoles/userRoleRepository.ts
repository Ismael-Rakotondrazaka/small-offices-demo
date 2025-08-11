import type { Prisma } from '~~/generated/prisma/client';
import type { ExtendedPrismaClient } from '~~/server/services/prisma/prismaProvider';

export class UserRoleRepository {
  #prismaClient: ExtendedPrismaClient;

  constructor(prismaClient: ExtendedPrismaClient) {
    this.#prismaClient = prismaClient;
  }

  public async addOne(arg: { data: Prisma.UserRoleCreateArgs['data'] }): Promise<UserRoleModel> {
    const { data } = arg;
    return this.#prismaClient.userRole.create({ data });
  }

  public async count(arg: {
    orderBy?: Prisma.UserRoleOrderByWithRelationInput | Prisma.UserRoleOrderByWithRelationInput[];
    skip?: number;
    take?: number;
    where?: Prisma.UserRoleWhereInput;
  }): Promise<number> {
    const { orderBy, skip, take, where } = arg;
    return this.#prismaClient.userRole.count({ orderBy, skip, take, where });
  }

  public async deleteOne(arg: { where: Prisma.UserRoleWhereUniqueInput }) {
    const { where } = arg;
    await this.#prismaClient.userRole.delete({ where });
  }

  public async existMany(arg: {
    expected: number;
    where: Prisma.UserRoleWhereInput;
  }): Promise<boolean> {
    const { expected, where } = arg;
    const count = await this.#prismaClient.userRole.count({ where });
    return count === expected;
  }

  public async existOne(arg: { where: Prisma.UserRoleWhereUniqueInput }): Promise<boolean> {
    const { where } = arg;
    const count = await this.#prismaClient.userRole.count({ take: 1, where });
    return count > 0;
  }

  public async findMany(arg: {
    orderBy?: Prisma.UserRoleOrderByWithRelationInput | Prisma.UserRoleOrderByWithRelationInput[];
    skip?: number;
    take?: number;
    where?: Prisma.UserRoleWhereInput;
  }): Promise<UserRoleModel[]> {
    const { orderBy, skip, take, where } = arg;
    return this.#prismaClient.userRole.findMany({ orderBy, skip, take, where });
  }

  public async findOne(arg: {
    orderBy?: Prisma.UserRoleOrderByWithRelationInput | Prisma.UserRoleOrderByWithRelationInput[];
    where?: Prisma.UserRoleWhereInput;
  }): Promise<null | UserRoleModel> {
    const { orderBy, where } = arg;
    return this.#prismaClient.userRole.findFirst({ orderBy, where });
  }

  public async updateOne(arg: {
    data: Prisma.UserRoleUpdateArgs['data'];
    where: Prisma.UserRoleWhereUniqueInput;
  }): Promise<UserRoleModel> {
    const { data, where } = arg;
    return this.#prismaClient.userRole.update({ data, where });
  }
}
