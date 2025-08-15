import type { Prisma } from '~~/generated/prisma/client';
import type { ExtendedPrismaClient } from '~~/server/services/prisma/prismaProvider';

export class LeadRepository {
  static readonly #includeArg = {
    office: {
      include: {
        photos: true,
        services: true,
      },
    },
  } satisfies Prisma.LeadInclude;

  #prismaClient: ExtendedPrismaClient;

  constructor(prismaClient: ExtendedPrismaClient) {
    this.#prismaClient = prismaClient;
  }

  public async addOne(arg: { data: Prisma.LeadCreateArgs['data'] }): Promise<LeadModel> {
    const { data } = arg;
    return this.#prismaClient.lead.create({ data, include: LeadRepository.#includeArg });
  }

  public async count(arg: {
    orderBy?: Prisma.LeadOrderByWithRelationInput | Prisma.LeadOrderByWithRelationInput[];
    skip?: number;
    take?: number;
    where?: Prisma.LeadWhereInput;
  }): Promise<number> {
    const { orderBy, skip, take, where } = arg;
    return this.#prismaClient.lead.count({ orderBy, skip, take, where });
  }

  public async deleteOne(arg: { where: Prisma.LeadWhereUniqueInput }) {
    const { where } = arg;
    await this.#prismaClient.lead.delete({ where });
  }

  public async existMany(arg: {
    expected: number;
    where: Prisma.LeadWhereInput;
  }): Promise<boolean> {
    const { expected, where } = arg;
    const count = await this.#prismaClient.lead.count({ where });
    return count === expected;
  }

  public async existOne(arg: { where: Prisma.LeadWhereUniqueInput }): Promise<boolean> {
    const { where } = arg;
    const count = await this.#prismaClient.lead.count({ take: 1, where });
    return count > 0;
  }

  public async findMany(arg: {
    orderBy?: Prisma.LeadOrderByWithRelationInput | Prisma.LeadOrderByWithRelationInput[];
    skip?: number;
    take?: number;
    where?: Prisma.LeadWhereInput;
  }): Promise<LeadModel[]> {
    const { orderBy, skip, take, where } = arg;
    return this.#prismaClient.lead.findMany({ include: LeadRepository.#includeArg, orderBy, skip, take, where });
  }

  public async findOne(arg: {
    orderBy?: Prisma.LeadOrderByWithRelationInput | Prisma.LeadOrderByWithRelationInput[];
    where?: Prisma.LeadWhereInput;
  }): Promise<LeadModel | null> {
    const { orderBy, where } = arg;
    return this.#prismaClient.lead.findFirst({ include: LeadRepository.#includeArg, orderBy, where });
  }

  public async updateOne(arg: {
    data: Prisma.LeadUpdateArgs['data'];
    where: Prisma.LeadWhereUniqueInput;
  }): Promise<LeadModel> {
    const { data, where } = arg;
    return this.#prismaClient.lead.update({ data, include: LeadRepository.#includeArg, where });
  }
}
