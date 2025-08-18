import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { ServiceDTOMapper } from './serviceDTOMapper';

export const StoreServiceEventHandlerFn: EventHandlerFn<StoreServiceRequest> = async ({ body, userSession }) => {
  await userSession.require();
  const service = await RepositoryProvider.serviceRepository.addOne({
    data: {
      icon: body.icon,
      name: body.name,
    },
  });

  return {
    data: ServiceDTOMapper.toDTO(service),
  };
};
