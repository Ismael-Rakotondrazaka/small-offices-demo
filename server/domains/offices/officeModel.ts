import type { Office } from '~~/generated/prisma/client';
import type { PhotoModel } from '~~/server/domains/photos/photoModel';
import type { ServiceModel } from '~~/server/domains/services/serviceModel';

export interface OfficeModel extends Office {
  photos: PhotoModel[];
  services: ServiceModel[];
}
