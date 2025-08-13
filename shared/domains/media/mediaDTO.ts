import type { Serialize } from '~~/shared/types/serialized';

import { z } from 'zod';

import { mediaConfig } from './mediaConfig';
import { MediaType, MediaTypeSchema } from './mediaType';

export interface FileMetaDataDTO {
  ext: null | string;
  mimeType: null | string;
  name: string;
  originalName: string;
  relativePath: string;
  size: null | number;
}

export const FileMetaDataDTOSchema: z.ZodType<FileMetaDataDTO> = z.object({
  ext: z.string().nullable(),
  mimeType: z.string().nullable(),
  name: z.string(),
  originalName: z.string(),
  relativePath: z.string(),
  size: z.number().nullable(),
});

export interface MediaDTO {
  createdAt: Date;
  id: string;
  metaData: FileMetaDataDTO;
  type: MediaType;
  url: string;
}

export const MediaDTOSchema: z.ZodType<MediaDTO> = z.object({
  createdAt: z.coerce.date(),
  id: z.string(),
  metaData: FileMetaDataDTOSchema,
  type: MediaTypeSchema,
  url: z.string(),
});

export type SerializedMediaDTO = Serialize<MediaDTO>;

export const SerializedMediaDTOSchema: z.ZodType<SerializedMediaDTO> = z.object(
  {
    createdAt: z.string().date(),
    id: z.string(),
    metaData: FileMetaDataDTOSchema,
    type: MediaTypeSchema,
    url: z.string(),
  },
);

export abstract class MediaTypeMaker {
  // Static method to determine MediaType
  static fromFile(file: File): MediaType {
    const extension = file.name.split('.').pop()?.toLowerCase();
    const mimeType = file.type;

    if (!extension) {
      return MediaType.OTHER;
    }

    const documentMimeTypes = mediaConfig.DOCUMENT_FORM_ACCEPT.split(', ');
    const imageMimeTypes = mediaConfig.IMAGE_FORM_ACCEPT.split(', ');
    const videoMimeTypes = mediaConfig.VIDEO_FORM_ACCEPT.split(', ');
    const audioMimeTypes = mediaConfig.AUDIO_FORM_ACCEPT.split(', ');

    if (
      imageMimeTypes.includes(mimeType)
      || (mediaConfig.IMAGE_FORM_ACCEPT === 'image/*'
        && mimeType.startsWith('image/'))
    ) {
      return MediaType.IMAGE;
    }
    if (
      videoMimeTypes.includes(mimeType)
      || (mediaConfig.VIDEO_FORM_ACCEPT === 'video/*'
        && mimeType.startsWith('video/'))
    ) {
      return MediaType.VIDEO;
    }
    if (
      audioMimeTypes.includes(mimeType)
      || (mediaConfig.AUDIO_FORM_ACCEPT === 'audio/*'
        && mimeType.startsWith('audio/'))
    ) {
      return MediaType.AUDIO;
    }
    if (documentMimeTypes.includes(mimeType)) {
      return MediaType.DOCUMENT;
    }

    return MediaType.OTHER;
  }
}
