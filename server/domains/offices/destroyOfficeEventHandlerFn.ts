import type { DestroyOfficeRequest } from '~~/shared';

import { RepositoryProvider } from '~~/server/services';

import { OfficeDTOMapper } from './officeDTOMapper';

export const DestroyOfficeEventHandlerFn: EventHandlerFn<DestroyOfficeRequest> = async ({ params }) => {
  const office = await RepositoryProvider.officeRepository.findOne({
    where: {
      id: params.id,
    },
  });

  if (office === null) {
    throw Exception.notFound({
      data: {},
    });
  }

  await RepositoryProvider.officeRepository.deleteOne({
    where: {
      id: params.id,
    },
  });

  return {
    data: OfficeDTOMapper.toDTO(office),
  };
};
