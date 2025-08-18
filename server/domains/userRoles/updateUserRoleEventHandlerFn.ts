import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { UserRoleDTOMapper } from './userRoleDTOMapper';

export const UpdateUserRoleEventHandlerFn: EventHandlerFn<UpdateUserRoleRequest> = async ({ body, params, userSession }) => {
  await userSession.require();
  const userRole = await RepositoryProvider.userRoleRepository.findOne({
    where: {
      id: params.id,
    },
  });

  if (userRole === null) {
    throw Exception.notFound({
      data: {},
    });
  }

  const updatedUserRole = await RepositoryProvider.userRoleRepository.updateOne({
    data: {
      role: body.role,
    },
    where: {
      id: params.id,
    },
  });

  return {
    data: UserRoleDTOMapper.toDTO(updatedUserRole),
  };
};
