import type { UserDTO } from '~~/shared';

import { MediaDTOMapper } from '~~/server/domains/media/mediaDTOMapper';

import type { UserModel } from './userModel';

export abstract class UserDTOMapper {
  static toDTO(model: UserModel): UserDTO {
    return {
      firstName: model.firstName,
      id: model.id,
      image: model.image ? MediaDTOMapper.toUrl(model.image, true) : null,
      lastName: model.lastName,
    };
  }

  static toDTOs(models: UserModel[]): UserDTO[] {
    return models.map(user => UserDTOMapper.toDTO(user));
  }
}
