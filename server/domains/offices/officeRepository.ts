import type { Prisma } from '~~/generated/prisma/client';
import type { ExtendedPrismaClient } from '~~/server/services/prisma/prismaProvider';

export class OfficeRepository {
  static readonly #includeArg = {
    photos: true,
    services: true,
  } satisfies Prisma.OfficeInclude;

  #prismaClient: ExtendedPrismaClient;

  constructor(prismaClient: ExtendedPrismaClient) {
    this.#prismaClient = prismaClient;
  }

  public async addOne(arg: { data: Prisma.OfficeCreateArgs['data'] }): Promise<OfficeModel> {
    const { data } = arg;
    return this.#prismaClient.office.create({ data, include: OfficeRepository.#includeArg });
  }

  public async count(arg: {
    orderBy?: Prisma.OfficeOrderByWithRelationInput | Prisma.OfficeOrderByWithRelationInput[];
    skip?: number;
    take?: number;
    where?: Prisma.OfficeWhereInput;
  }): Promise<number> {
    const { orderBy, skip, take, where } = arg;
    return this.#prismaClient.office.count({ orderBy, skip, take, where });
  }

  public async deleteOne(arg: { where: Prisma.OfficeWhereUniqueInput }) {
    const { where } = arg;
    await this.#prismaClient.office.delete({ where });
  }

  public async existMany(arg: {
    expected: number;
    where: Prisma.OfficeWhereInput;
  }): Promise<boolean> {
    const { expected, where } = arg;
    const count = await this.#prismaClient.office.count({ where });
    return count === expected;
  }

  public async existOne(arg: { where: Prisma.OfficeWhereUniqueInput }): Promise<boolean> {
    const { where } = arg;
    const count = await this.#prismaClient.office.count({ take: 1, where });
    return count > 0;
  }

  public async findMany(arg: {
    orderBy?: Prisma.OfficeOrderByWithRelationInput | Prisma.OfficeOrderByWithRelationInput[];
    skip?: number;
    take?: number;
    where?: Prisma.OfficeWhereInput;
  }): Promise<OfficeModel[]> {
    const { orderBy, skip, take, where } = arg;
    return this.#prismaClient.office.findMany({ include: OfficeRepository.#includeArg, orderBy, skip, take, where });
  }

  public async findOne(arg: {
    orderBy?: Prisma.OfficeOrderByWithRelationInput | Prisma.OfficeOrderByWithRelationInput[];
    where?: Prisma.OfficeWhereInput;
  }): Promise<null | OfficeModel> {
    const { orderBy, where } = arg;
    return this.#prismaClient.office.findFirst({ include: OfficeRepository.#includeArg, orderBy, where });
  }

  public async slugExists(slug: string): Promise<boolean> {
    const count = await this.#prismaClient.office.count({
      where: { slug },
    });
    return count > 0;
  }

  public async updateOne(arg: {
    data: Prisma.OfficeUpdateArgs['data'];
    where: Prisma.OfficeWhereUniqueInput;
  }): Promise<OfficeModel> {
    const { data, where } = arg;
    return this.#prismaClient.office.update({ data, include: OfficeRepository.#includeArg, where });
  }
}
