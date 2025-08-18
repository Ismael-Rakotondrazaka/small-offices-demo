import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { ServiceDTOMapper } from './serviceDTOMapper';

export const UpdateServiceEventHandlerFn: EventHandlerFn<UpdateServiceRequest> = async ({ body, params, userSession }) => {
  await userSession.require();
  const service = await RepositoryProvider.serviceRepository.findOne({
    where: {
      id: params.id,
    },
  });

  if (service === null) {
    throw Exception.notFound({
      data: {},
    });
  }

  const updatedService = await RepositoryProvider.serviceRepository.updateOne({
    data: {
      icon: body.icon,
      name: body.name,
    },
    where: {
      id: params.id,
    },
  });

  return {
    data: ServiceDTOMapper.toDTO(updatedService),
  };
};
