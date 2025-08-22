import { Exception } from '~~/server/core/exceptions/exception';
import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { LeadDTOMapper } from './leadDTOMapper';

export const ShowLeadEventHandlerFn: EventHandlerFn<ShowLeadRequest> = async ({ params }) => {
  const lead = await RepositoryProvider.leadRepository.findOne({
    where: {
      id: params.id,
    },
  });

  if (lead === null) {
    throw Exception.notFound({
      data: {},
    });
  }

  return {
    data: LeadDTOMapper.toDTO(lead),
  };
};
