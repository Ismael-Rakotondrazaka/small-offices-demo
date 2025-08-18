import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { ServiceDTOMapper } from './serviceDTOMapper';

export const DestroyServiceEventHandlerFn: EventHandlerFn<DestroyServiceRequest> = async ({ params, userSession }) => {
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

  await RepositoryProvider.serviceRepository.deleteOne({
    where: {
      id: params.id,
    },
  });

  return {
    data: ServiceDTOMapper.toDTO(service),
  };
};
