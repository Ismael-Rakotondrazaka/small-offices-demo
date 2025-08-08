import {
  UserRoleRepository,
} from '~~/server/domains/users/userRoleRepository';

import { PrismaProvider } from '../prisma/prismaProvider';

export class RepositoryProvider {
  public static get userRoleRepository(): UserRoleRepository {
    if (!this.#userRoleRepository) {
      this.#userRoleRepository = new UserRoleRepository(PrismaProvider.instance);
    }

    return this.#userRoleRepository;
  }

  static #userRoleRepository: UserRoleRepository;
}
