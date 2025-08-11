import { type PhotoDTO, PhotoDTOSchema } from '~~/shared/domains/photos/photoDTO';
import { type ServiceDTO, ServiceDTOSchema } from '~~/shared/domains/services/serviceDTO';
import { z } from 'zod';

export interface OfficeDTO {
  arr: number;
  createdAt: Date;
  deletedAt: Date | null;
  description: string;
  id: string;
  isFake: boolean;
  lat: number;
  lng: number;
  photos: PhotoDTO[];
  posts: number;
  price: number;
  services: ServiceDTO[];
  slug: string;
  updatedAt: Date;
}

export const OfficeDTOSchema: z.ZodType<OfficeDTO> = z.object({ arr: z.number(), createdAt: z.coerce.date(), deletedAt: z.coerce.date().nullable(), description: z.string(), id: z.string(), isFake: z.boolean(), lat: z.number(), lng: z.number(), photos: z.array(PhotoDTOSchema), posts: z.number(), price: z.number(), services: z.array(ServiceDTOSchema), slug: z.string(), updatedAt: z.coerce.date() });
