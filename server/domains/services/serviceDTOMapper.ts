import type { ServiceDTO } from '~~/shared';

import type { ServiceModel } from './serviceModel';

export abstract class ServiceDTOMapper {
  static toDTO(model: ServiceModel): ServiceDTO {
    return {
      createdAt: model.createdAt,
      icon: model.icon,
      id: model.id,
      name: model.name,
    };
  }

  static toDTOs(models: ServiceModel[]): ServiceDTO[] {
    return models.map(service => ServiceDTOMapper.toDTO(service));
  }
}
