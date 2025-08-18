import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { PhotoDTOMapper } from './photoDTOMapper';

export const UpdatePhotoEventHandlerFn: EventHandlerFn<UpdatePhotoRequest> = async ({ body, params, userSession }) => {
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

  const updatedPhoto = await RepositoryProvider.photoRepository.updateOne({
    data: {
      alt: body.alt,
      officeId: body.officeId,
      url: body.url,
    },
    where: {
      id: params.id,
    },
  });

  return {
    data: PhotoDTOMapper.toDTO(updatedPhoto),
  };
};
