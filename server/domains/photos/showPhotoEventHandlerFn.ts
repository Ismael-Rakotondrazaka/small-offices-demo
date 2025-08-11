import type { ShowPhotoRequest } from '~~/shared';

import { RepositoryProvider } from '~~/server/services';

import { PhotoDTOMapper } from './photoDTOMapper';

export const ShowPhotoEventHandlerFn: EventHandlerFn<ShowPhotoRequest> = async ({ params }) => {
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

  return {
    data: PhotoDTOMapper.toDTO(photo),
  };
};
