import type { PhotoModel } from './photoModel';

export abstract class PhotoDTOMapper {
  static toDTO(model: PhotoModel): PhotoDTO {
    return {
      alt: model.alt,
      createdAt: model.createdAt,
      id: model.id,
      officeId: model.officeId,
      url: model.url,
    };
  }

  static toDTOs(models: PhotoModel[]): PhotoDTO[] {
    return models.map(photo => PhotoDTOMapper.toDTO(photo));
  }
}
