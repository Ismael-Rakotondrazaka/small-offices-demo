import type { GetMediaUploadUrlRequest } from '~~/shared';

import { FileStorageProvider } from '~~/server/services';

import { FileMetaDataDTOMapper } from './fileMetaDataDTOMapper';

export const getMediaUploadUrlEventHandlerFn: EventHandlerFn<
  GetMediaUploadUrlRequest
> = async ({ body }) => {
  const { fileMetaData, url: uploadUrl }
    = await FileStorageProvider.mediaStorage.getSignedUploadUrl(body.file, {
      pathPrefix: `media`,
    });

  const fileMetaDataDTO = FileMetaDataDTOMapper.toDTO(fileMetaData);

  return {
    fileMetaData: {
      ...fileMetaDataDTO,
      type: getMediaTypeFromFile(body.file),
    },
    uploadUrl,
  };
};
