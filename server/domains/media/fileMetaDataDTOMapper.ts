import type { FileMetaData } from '~~/server/core/files';
import type { FileMetaDataDTO } from '~~/shared';

export abstract class FileMetaDataDTOMapper {
  static toDTO(media: FileMetaData): FileMetaDataDTO {
    return {
      ext: media.ext,
      mimeType: media.mimeType,
      name: media.name,
      originalName: media.originalName,
      relativePath: media.relativePath,
      size: media.size,
    };
  }

  static toDTOs(media: FileMetaData[]) {
    return media.map(media => FileMetaDataDTOMapper.toDTO(media));
  }
}
