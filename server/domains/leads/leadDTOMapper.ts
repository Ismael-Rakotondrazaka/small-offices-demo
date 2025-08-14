import { OfficeDTOMapper } from '~~/server/domains/offices';

import type { LeadModel } from './leadModel';

export abstract class LeadDTOMapper {
  static toDTO(model: LeadModel): LeadDTO {
    return {
      createdAt: model.createdAt,
      email: model.email,
      id: model.id,
      name: model.name,
      office: OfficeDTOMapper.toDTO(model.office),
      phone: model.phone,
      status: model.status,
      updatedAt: model.updatedAt,
    };
  }

  static toDTOs(models: LeadModel[]): LeadDTO[] {
    return models.map(lead => LeadDTOMapper.toDTO(lead));
  }
}
