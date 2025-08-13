import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { OfficeDTOMapper } from './officeDTOMapper';

export const DestroyOfficeEventHandlerFn: EventHandlerFn<DestroyOfficeRequest> = async ({ params }) => {
  const office = await RepositoryProvider.officeRepository.findOne({
    where: {
      slug: params.slug,
    },
  });

  if (office === null) {
    throw Exception.notFound({
      data: {},
    });
  }

  await RepositoryProvider.officeRepository.deleteOne({
    where: {
      slug: params.slug,
    },
  });

  return {
    data: OfficeDTOMapper.toDTO(office),
  };
};
