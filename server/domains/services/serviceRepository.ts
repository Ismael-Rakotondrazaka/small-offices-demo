import type { Prisma } from '~~/generated/prisma/client';
import type { ExtendedPrismaClient } from '~~/server/services/prisma/prismaProvider';

export class ServiceRepository {
  static readonly #includeArg = {} satisfies Prisma.ServiceInclude;
  #prismaClient: ExtendedPrismaClient;

  constructor(prismaClient: ExtendedPrismaClient) {
    this.#prismaClient = prismaClient;
  }

  public async addOne(arg: { data: Prisma.ServiceCreateArgs['data'] }): Promise<ServiceModel> {
    const { data } = arg;
    return this.#prismaClient.service.create({ data, include: ServiceRepository.#includeArg });
  }

  public async count(arg: {
    orderBy?: Prisma.ServiceOrderByWithRelationInput | Prisma.ServiceOrderByWithRelationInput[];
    skip?: number;
    take?: number;
    where?: Prisma.ServiceWhereInput;
  }): Promise<number> {
    const { orderBy, skip, take, where } = arg;
    return this.#prismaClient.service.count({ orderBy, skip, take, where });
  }

  public async deleteOne(arg: { where: Prisma.ServiceWhereUniqueInput }) {
    const { where } = arg;
    await this.#prismaClient.service.delete({ where });
  }

  public async existMany(arg: {
    expected: number;
    where: Prisma.ServiceWhereInput;
  }): Promise<boolean> {
    const { expected, where } = arg;
    const count = await this.#prismaClient.service.count({ where });
    return count === expected;
  }

  public async existOne(arg: { where: Prisma.ServiceWhereUniqueInput }): Promise<boolean> {
    const { where } = arg;
    const count = await this.#prismaClient.service.count({ take: 1, where });
    return count > 0;
  }

  public async findMany(arg: {
    orderBy?: Prisma.ServiceOrderByWithRelationInput | Prisma.ServiceOrderByWithRelationInput[];
    skip?: number;
    take?: number;
    where?: Prisma.ServiceWhereInput;
  }): Promise<ServiceModel[]> {
    const { orderBy, skip, take, where } = arg;
    return this.#prismaClient.service.findMany({ include: ServiceRepository.#includeArg, orderBy, skip, take, where });
  }

  public async findOne(arg: {
    orderBy?: Prisma.ServiceOrderByWithRelationInput | Prisma.ServiceOrderByWithRelationInput[];
    where?: Prisma.ServiceWhereInput;
  }): Promise<null | ServiceModel> {
    const { orderBy, where } = arg;
    return this.#prismaClient.service.findFirst({ include: ServiceRepository.#includeArg, orderBy, where });
  }

  public async updateOne(arg: {
    data: Prisma.ServiceUpdateArgs['data'];
    where: Prisma.ServiceWhereUniqueInput;
  }): Promise<ServiceModel> {
    const { data, where } = arg;
    return this.#prismaClient.service.update({ data, include: ServiceRepository.#includeArg, where });
  }
}
