import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { OfficeDTOMapper } from './officeDTOMapper';

export const ShowOfficeEventHandlerFn: EventHandlerFn<ShowOfficeRequest> = async ({ params }) => {
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

  return {
    data: OfficeDTOMapper.toDTO(office),
  };
};
