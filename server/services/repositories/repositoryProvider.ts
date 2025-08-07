import {
  MediaRepository,
  PostRepository,
  UserRepository,
} from '~~/server/domains';
import { AuthAccessRepository } from '~~/server/domains/authAccesses/authAccessRepository';
import { PrismaProvider } from '~~/server/services/prisma/prismaProvider';

export abstract class RepositoryProvider {
  public static get authAccessRepository(): AuthAccessRepository {
    if (!this.#authAccessRepository) {
      this.#authAccessRepository = new AuthAccessRepository(
        PrismaProvider.instance,
      );
    }

    return this.#authAccessRepository;
  }

  public static get mediaRepository(): MediaRepository {
    if (!this.#mediaRepository) {
      this.#mediaRepository = new MediaRepository(PrismaProvider.instance);
    }

    return this.#mediaRepository;
  }

  public static get postRepository(): PostRepository {
    if (!this.#postRepository) {
      this.#postRepository = new PostRepository(PrismaProvider.instance);
    }

    return this.#postRepository;
  }

  public static get userRepository(): UserRepository {
    if (!this.#userRepository) {
      this.#userRepository = new UserRepository(PrismaProvider.instance);
    }

    return this.#userRepository;
  }

  static #authAccessRepository: AuthAccessRepository;

  static #mediaRepository: MediaRepository;

  static #postRepository: PostRepository;

  static #userRepository: UserRepository;
}
