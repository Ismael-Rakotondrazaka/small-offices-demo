import { PrismaClient } from '~~/generated/prisma/client';

const prismaClientFactory = () => new PrismaClient();

export abstract class PrismaProvider {
  public static get instance(): PrismaClient {
    if (!this.#instance) {
      this.#instance = prismaClientFactory();
    }

    return this.#instance;
  }

  static #instance: PrismaClient;
}
