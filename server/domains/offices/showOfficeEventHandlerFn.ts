import type { ShowOfficeRequest } from '~~/shared';

import { RepositoryProvider } from '~~/server/services';

import { OfficeDTOMapper } from './officeDTOMapper';

export const ShowOfficeEventHandlerFn: EventHandlerFn<ShowOfficeRequest> = async ({ params }) => {
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

  return {
    data: OfficeDTOMapper.toDTO(office),
  };
};
