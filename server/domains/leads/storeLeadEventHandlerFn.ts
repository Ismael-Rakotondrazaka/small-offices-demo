import type { StoreLeadRequest } from '~~/shared';

import { RepositoryProvider } from '~~/server/services';

import { LeadDTOMapper } from './leadDTOMapper';

export const StoreLeadEventHandlerFn: EventHandlerFn<StoreLeadRequest> = async ({ body }) => {
  const lead = await RepositoryProvider.leadRepository.addOne({
    data: {
      email: body.email,
      name: body.name,
      officeId: body.officeId,
      phone: body.phone,
    },
  });

  return {
    data: LeadDTOMapper.toDTO(lead),
  };
};
