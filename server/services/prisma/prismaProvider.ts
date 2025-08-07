import { PrismaClient as _PrismaClient } from '~~/generated/prisma/client';

const prismaClientFactory = () =>
  new _PrismaClient().$extends({
    result: {},
  });

export type ExtendedPrismaClient = ReturnType<typeof prismaClientFactory>;

export abstract class PrismaProvider {
  public static get instance(): ExtendedPrismaClient {
    if (!this.#instance) {
      this.#instance = prismaClientFactory();
    }

    return this.#instance;
  }

  static #instance: ExtendedPrismaClient;
}
