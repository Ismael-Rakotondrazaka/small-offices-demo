import type { OfficeServiceModel } from './officeServiceModel';

export abstract class OfficeServiceDTOMapper {
  static toDTO(model: OfficeServiceModel): OfficeServiceDTO {
    return {
      createdAt: model.createdAt,
      id: model.id,
      officeId: model.officeId,
      serviceId: model.serviceId,
    };
  }

  static toDTOs(models: OfficeServiceModel[]): OfficeServiceDTO[] {
    return models.map(officeService => OfficeServiceDTOMapper.toDTO(officeService));
  }
}
