import type { ConfirmMediaUploadRequest } from '~~/shared';

import { IdentifierGenerator } from '~~/server/core';
import { FileStorageProvider, RepositoryProvider } from '~~/server/services';

import { MediaDTOMapper } from './mediaDTOMapper';

export const confirmMediaUploadEventHandlerFn: EventHandlerFn<
  ConfirmMediaUploadRequest
> = async ({ body, userSession }) => {
  const { user: authUser } = await userSession.require();

  const media = await RepositoryProvider.mediaRepository.addOne({
    data: {
      authorId: authUser.id,
      ext: body.fileMetaData.ext,
      id: IdentifierGenerator.generateUUIDV7(),
      mimeType: body.fileMetaData.mimeType,
      name: body.fileMetaData.name,
      originalName: body.fileMetaData.originalName,
      relativePath: body.fileMetaData.relativePath,
      size: body.fileMetaData.size,
      type: body.fileMetaData.type,
    },
  });

  await FileStorageProvider.mediaStorage.makeFilePublic(media.relativePath);

  return {
    media: MediaDTOMapper.toDTO(media, true),
  };
};
