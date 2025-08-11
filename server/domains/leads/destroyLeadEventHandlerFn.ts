import type { DestroyLeadRequest } from '~~/shared';

import { RepositoryProvider } from '~~/server/services';

import { LeadDTOMapper } from './leadDTOMapper';

export const DestroyLeadEventHandlerFn: EventHandlerFn<DestroyLeadRequest> = async ({ params }) => {
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
