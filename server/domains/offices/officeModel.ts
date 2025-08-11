import type { Office } from '~~/generated/prisma/client';
import type { OfficeServiceModel } from '~~/server/domains/officeServices';
import type { PhotoModel } from '~~/server/domains/photos/photoModel';

export interface OfficeModel extends Office {
  officeServices: OfficeServiceModel[];
  photos: PhotoModel[];
}
