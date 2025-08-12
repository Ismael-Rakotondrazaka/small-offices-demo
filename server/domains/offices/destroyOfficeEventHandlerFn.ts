import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

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
