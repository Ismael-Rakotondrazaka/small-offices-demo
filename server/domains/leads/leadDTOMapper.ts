import type { LeadDTO } from '~~/shared';

import type { LeadModel } from './leadModel';

export abstract class LeadDTOMapper {
  static toDTO(model: LeadModel): LeadDTO {
    return {
      createdAt: model.createdAt,
      email: model.email,
      id: model.id,
      name: model.name,
      officeId: model.officeId,
      phone: model.phone,
      updatedAt: model.updatedAt,
    };
  }

  static toDTOs(models: LeadModel[]): LeadDTO[] {
    return models.map(lead => LeadDTOMapper.toDTO(lead));
  }
}
