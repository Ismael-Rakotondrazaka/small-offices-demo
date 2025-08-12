import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { LeadDTOMapper } from './leadDTOMapper';

export const UpdateLeadEventHandlerFn: EventHandlerFn<UpdateLeadRequest> = async ({ body, params }) => {
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

  const updatedLead = await RepositoryProvider.leadRepository.updateOne({
    data: {
      email: body.email,
      name: body.name,
      officeId: body.officeId,
      phone: body.phone,
    },
    where: {
      id: params.id,
    },
  });

  return {
    data: LeadDTOMapper.toDTO(updatedLead),
  };
};
