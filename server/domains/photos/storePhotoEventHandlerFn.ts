import type { StorePhotoRequest } from '~~/shared';

import { RepositoryProvider } from '~~/server/services';

import { PhotoDTOMapper } from './photoDTOMapper';

export const StorePhotoEventHandlerFn: EventHandlerFn<StorePhotoRequest> = async ({ body }) => {
  const photo = await RepositoryProvider.photoRepository.addOne({
    data: {
      alt: body.alt,
      officeId: body.officeId,
      url: body.url,
    },
  });

  return {
    data: PhotoDTOMapper.toDTO(photo),
  };
};
