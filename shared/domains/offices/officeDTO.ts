import type { PhotoDTO } from '../photos/photoDTO';
import type { ServiceDTO } from '../services/serviceDTO';
import type { OfficeType } from './officeType';

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
