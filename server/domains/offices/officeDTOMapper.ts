import { PhotoDTOMapper } from '~~/server/domains/photos/photoDTOMapper';
import { ServiceDTOMapper } from '~~/server/domains/services/serviceDTOMapper';

import type { OfficeModel } from './officeModel';

export abstract class OfficeDTOMapper {
  static toDTO(model: OfficeModel): OfficeDTO {
    return {
      arr: model.arr,
      createdAt: model.createdAt,
      deletedAt: model.deletedAt,
      description: model.description,
      id: model.id,
      isFake: model.isFake,
      lat: model.lat,
      lng: model.lng,
      photos: PhotoDTOMapper.toDTOs(model.photos),
      posts: model.posts,
      price: model.price,
      services: ServiceDTOMapper.toDTOs(model.officeServices.map(officeService => officeService.service)),
      slug: model.slug,
      title: model.title,
      updatedAt: model.updatedAt,
    };
  }

  static toDTOs(models: OfficeModel[]): OfficeDTO[] {
    return models.map(office => OfficeDTOMapper.toDTO(office));
  }
}
