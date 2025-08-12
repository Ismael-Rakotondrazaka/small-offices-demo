import type { Prisma } from '~~/generated/prisma/client';
import type { ExtendedPrismaClient } from '~~/server/services/prisma/prismaProvider';

export class OfficeServiceRepository {
  static readonly #includeArg = {
    service: true,
  } satisfies Prisma.OfficeServiceInclude;

  #prismaClient: ExtendedPrismaClient;

  constructor(prismaClient: ExtendedPrismaClient) {
    this.#prismaClient = prismaClient;
  }

  public async addOne(arg: { data: Prisma.OfficeServiceCreateArgs['data'] }): Promise<OfficeServiceModel> {
    const { data } = arg;
    return this.#prismaClient.officeService.create({ data, include: OfficeServiceRepository.#includeArg });
  }

  public async count(arg: {
    orderBy?: Prisma.OfficeServiceOrderByWithRelationInput | Prisma.OfficeServiceOrderByWithRelationInput[];
    skip?: number;
    take?: number;
    where?: Prisma.OfficeServiceWhereInput;
  }): Promise<number> {
    const { orderBy, skip, take, where } = arg;
    return this.#prismaClient.officeService.count({ orderBy, skip, take, where });
  }

  public async deleteOne(arg: { where: Prisma.OfficeServiceWhereUniqueInput }) {
    const { where } = arg;
    await this.#prismaClient.officeService.delete({ where });
  }

  public async existMany(arg: {
    expected: number;
    where: Prisma.OfficeServiceWhereInput;
  }): Promise<boolean> {
    const { expected, where } = arg;
    const count = await this.#prismaClient.officeService.count({ where });
    return count === expected;
  }

  public async existOne(arg: { where: Prisma.OfficeServiceWhereUniqueInput }): Promise<boolean> {
    const { where } = arg;
    const count = await this.#prismaClient.officeService.count({ take: 1, where });
    return count > 0;
  }

  public async findMany(arg: {
    orderBy?: Prisma.OfficeServiceOrderByWithRelationInput | Prisma.OfficeServiceOrderByWithRelationInput[];
    skip?: number;
    take?: number;
    where?: Prisma.OfficeServiceWhereInput;
  }): Promise<OfficeServiceModel[]> {
    const { orderBy, skip, take, where } = arg;
    return this.#prismaClient.officeService.findMany({ include: OfficeServiceRepository.#includeArg, orderBy, skip, take, where });
  }

  public async findOne(arg: {
    orderBy?: Prisma.OfficeServiceOrderByWithRelationInput | Prisma.OfficeServiceOrderByWithRelationInput[];
    where?: Prisma.OfficeServiceWhereInput;
  }): Promise<null | OfficeServiceModel> {
    const { orderBy, where } = arg;
    return this.#prismaClient.officeService.findFirst({ include: OfficeServiceRepository.#includeArg, orderBy, where });
  }

  public async updateOne(arg: {
    data: Prisma.OfficeServiceUpdateArgs['data'];
    where: Prisma.OfficeServiceWhereUniqueInput;
  }): Promise<OfficeServiceModel> {
    const { data, where } = arg;
    return this.#prismaClient.officeService.update({ data, include: OfficeServiceRepository.#includeArg, where });
  }
}
