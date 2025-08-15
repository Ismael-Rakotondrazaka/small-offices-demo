import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { LeadDTOMapper } from './leadDTOMapper';

export const StoreLeadEventHandlerFn: EventHandlerFn<StoreLeadRequest> = async ({ body }) => {
  const office = await RepositoryProvider.officeRepository.findOne({
    where: {
      slug: body.officeSlug,
    },
  });

  if (!office) {
    throw Exception.badRequest({
      data: {
        officeSlug: body.officeSlug,
      },
      message: 'Bureau non trouvé',
    });
  }

  const lead = await RepositoryProvider.leadRepository.addOne({
    data: {
      email: body.email,
      name: body.name,
      officeId: office.id,
      phone: body.phone,
    },
  });

  return {
    data: LeadDTOMapper.toDTO(lead),
  };
};
