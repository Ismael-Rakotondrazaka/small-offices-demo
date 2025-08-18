import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { PhotoDTOMapper } from './photoDTOMapper';

export const DestroyPhotoEventHandlerFn: EventHandlerFn<DestroyPhotoRequest> = async ({ params, userSession }) => {
  await userSession.require();
  const photo = await RepositoryProvider.photoRepository.findOne({
    where: {
      id: params.id,
    },
  });

  if (photo === null) {
    throw Exception.notFound({
      data: {},
    });
  }

  await RepositoryProvider.photoRepository.deleteOne({
    where: {
      id: params.id,
    },
  });

  return {
    data: PhotoDTOMapper.toDTO(photo),
  };
};
