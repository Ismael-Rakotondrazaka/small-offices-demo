import type { OfficeService } from '~~/generated/prisma/client';
import type { ServiceModel } from '~~/server/domains/services/serviceModel';

export interface OfficeServiceModel extends OfficeService {
  service: ServiceModel;
}
