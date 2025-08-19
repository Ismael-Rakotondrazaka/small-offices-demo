import { AuditLogRepository } from '~~/server/domains/auditLogs/auditLogRepository';
import { LeadRepository } from '~~/server/domains/leads/leadRepository';
import { OfficeRepository } from '~~/server/domains/offices/officeRepository';
import { PhotoRepository } from '~~/server/domains/photos/photoRepository';
import { ServiceRepository } from '~~/server/domains/services/serviceRepository';
import {
  UserRoleRepository,
} from '~~/server/domains/userRoles/userRoleRepository';
import { PrismaProvider } from '~~/server/services/prisma/prismaProvider';

export class RepositoryProvider {
  public static get auditLogRepository(): AuditLogRepository {
    if (!this.#auditLogRepository) {
      this.#auditLogRepository = new AuditLogRepository(PrismaProvider.instance);
    }

    return this.#auditLogRepository;
  }

  public static get leadRepository(): LeadRepository {
    if (!this.#leadRepository) {
      this.#leadRepository = new LeadRepository(PrismaProvider.instance);
    }

    return this.#leadRepository;
  }

  public static get officeRepository(): OfficeRepository {
    if (!this.#officeRepository) {
      this.#officeRepository = new OfficeRepository(PrismaProvider.instance);
    }

    return this.#officeRepository;
  }

  public static get photoRepository(): PhotoRepository {
    if (!this.#photoRepository) {
      this.#photoRepository = new PhotoRepository(PrismaProvider.instance);
    }

    return this.#photoRepository;
  }

  public static get serviceRepository(): ServiceRepository {
    if (!this.#serviceRepository) {
      this.#serviceRepository = new ServiceRepository(PrismaProvider.instance);
    }

    return this.#serviceRepository;
  }

  public static get userRoleRepository(): UserRoleRepository {
    if (!this.#userRoleRepository) {
      this.#userRoleRepository = new UserRoleRepository(PrismaProvider.instance);
    }

    return this.#userRoleRepository;
  }

  static #auditLogRepository: AuditLogRepository;

  static #leadRepository: LeadRepository;

  static #officeRepository: OfficeRepository;

  static #photoRepository: PhotoRepository;

  static #serviceRepository: ServiceRepository;

  static #userRoleRepository: UserRoleRepository;
}
