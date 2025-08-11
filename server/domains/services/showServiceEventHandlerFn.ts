import type { ShowServiceRequest } from '~~/shared';

import { RepositoryProvider } from '~~/server/services';

import { ServiceDTOMapper } from './serviceDTOMapper';

export const ShowServiceEventHandlerFn: EventHandlerFn<ShowServiceRequest> = async ({ params }) => {
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

  return {
    data: ServiceDTOMapper.toDTO(service),
  };
};
