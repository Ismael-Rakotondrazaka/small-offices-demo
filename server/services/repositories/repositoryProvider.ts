import { AuditLogRepository } from '~~/server/domains/auditLogs/auditLogRepository';
import { LeadRepository } from '~~/server/domains/leads/leadRepository';
import { OfficeRepository } from '~~/server/domains/offices/officeRepository';
import { ServiceRepository } from '~~/server/domains/services/serviceRepository';
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

  public static get serviceRepository(): ServiceRepository {
    if (!this.#serviceRepository) {
      this.#serviceRepository = new ServiceRepository(PrismaProvider.instance);
    }

    return this.#serviceRepository;
  }

  static #auditLogRepository: AuditLogRepository;

  static #leadRepository: LeadRepository;

  static #officeRepository: OfficeRepository;

  static #serviceRepository: ServiceRepository;
}
