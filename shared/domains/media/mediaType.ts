import type { FileLike } from '#shared/schemas/fileLikeSchema';

import { z } from 'zod';

export const MediaType = {
  AUDIO: 'AUDIO',
  DOCUMENT: 'DOCUMENT',
  IMAGE: 'IMAGE',
  OTHER: 'OTHER',
  VIDEO: 'VIDEO',
} as const;

export type MediaType = (typeof MediaType)[keyof typeof MediaType];

export const MediaTypeSchema = z.nativeEnum(MediaType);

export const mediaTypeLabel: Record<MediaType, string> = {
  AUDIO: 'Audio',
  DOCUMENT: 'Document',
  IMAGE: 'Image',
  OTHER: 'Autre',
  VIDEO: 'Vidéo',
};

export const getMediaTypeFromFile = (file: File | FileLike): MediaType => {
  const mimeType = file.type;

  if (mimeType.startsWith('image/')) {
    return MediaType.IMAGE;
  }
  else if (mimeType.startsWith('video/')) {
    return MediaType.VIDEO;
  }
  else if (mimeType.startsWith('audio/')) {
    return MediaType.AUDIO;
  }
  else if (mimeType.startsWith('application/')) {
    // Document types (like PDFs, Word docs, etc.)
    const documentTypes = [
      'pdf',
      'msword',
      'vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (documentTypes.some(type => mimeType.includes(type))) {
      return MediaType.DOCUMENT;
    }
  }

  return MediaType.OTHER;
};
