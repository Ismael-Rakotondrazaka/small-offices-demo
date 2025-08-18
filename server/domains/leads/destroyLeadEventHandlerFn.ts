import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { LeadDTOMapper } from './leadDTOMapper';

export const DestroyLeadEventHandlerFn: EventHandlerFn<DestroyLeadRequest> = async ({ params, userSession }) => {
  await userSession.require();
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

  await RepositoryProvider.leadRepository.deleteOne({
    where: {
      id: params.id,
    },
  });

  return {
    data: LeadDTOMapper.toDTO(lead),
  };
};
