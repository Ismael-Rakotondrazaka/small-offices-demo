import type { UserRoleDTO } from '~~/shared/domains/users/userRoleDTO';

import type { UserRoleModel } from './userRoleModel';

export abstract class UserRoleDTOMapper {
  static toDTO(model: UserRoleModel): UserRoleDTO {
    return {
      id: model.id,
      role: model.role,
    };
  }

  static toDTOs(models: UserRoleModel[]): UserRoleDTO[] {
    return models.map(userRole => UserRoleDTOMapper.toDTO(userRole));
  }
}
