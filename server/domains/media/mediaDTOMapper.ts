import type { MediaDTO } from '~~/shared';

import type { MediaModel } from './mediaModel';

export abstract class MediaDTOMapper {
  static toDTO(media: MediaModel, isPublic?: boolean): MediaDTO {
    const config = useRuntimeConfig();

    const url = isPublic
      ? `${config.fileStorageBucketEntryPoint}/${media.relativePath}`
      : `${config.public.appUrl}/${media.relativePath}`;

    return {
      createdAt: media.createdAt,
      id: media.id,
      metaData: {
        ext: media.ext,
        mimeType: media.mimeType,
        name: media.name,
        originalName: media.originalName,
        relativePath: media.relativePath,
        size: media.size,
      },
      type: media.type,
      url,
    };
  }

  static toDTOs(media: MediaModel[], isPublic?: boolean) {
    return media.map(media => MediaDTOMapper.toDTO(media, isPublic));
  }

  static toSerializedDTO(
    media: MediaModel,
    isPublic?: boolean,
  ): Serialize<MediaDTO> {
    return {
      createdAt: media.createdAt.toISOString(),
      id: media.id,
      metaData: {
        ext: media.ext,
        mimeType: media.mimeType,
        name: media.name,
        originalName: media.originalName,
        relativePath: media.relativePath,
        size: media.size,
      },
      type: media.type,
      url: MediaDTOMapper.toUrl(media, isPublic),
    };
  }

  static toUrl(media: MediaModel, isPublic?: boolean): string {
    const config = useRuntimeConfig();

    return isPublic
      ? `${config.fileStorageBucketEntryPoint}/${media.relativePath}`
      : `${config.public.appUrl}/${media.relativePath}`;
  }
}
