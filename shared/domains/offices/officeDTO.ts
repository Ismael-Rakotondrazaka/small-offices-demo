import { type PhotoDTO, PhotoDTOSchema } from '~~/shared/domains/photos/photoDTO';
import { type ServiceDTO, ServiceDTOSchema } from '~~/shared/domains/services/serviceDTO';
import { z } from 'zod';

import { type OfficeType, OfficeTypeSchema } from './officeType';

export interface OfficeDTO {
  arr: number;
  createdAt: Date;
  deletedAt: Date | null;
  id: string;
  isFake: boolean;
  lat: number;
  lng: number;
  photos: PhotoDTO[];
  posts: number;
  price: number;
  services: ServiceDTO[];
  slug: string;
  title: string;
  type: OfficeType;
  updatedAt: Date;
}

export const OfficeDTOSchema: z.ZodType<OfficeDTO> = z.object({ arr: z.number(), createdAt: z.coerce.date(), deletedAt: z.coerce.date().nullable(), id: z.string(), isFake: z.boolean(), lat: z.number(), lng: z.number(), photos: z.array(PhotoDTOSchema), posts: z.number(), price: z.number(), services: z.array(ServiceDTOSchema), slug: z.string(), title: z.string(), type: OfficeTypeSchema, updatedAt: z.coerce.date() });
