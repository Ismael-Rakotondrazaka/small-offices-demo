import type { FileLike } from '~~/shared/schemas/fileLikeSchema';

import { IdentifierGenerator } from '~~/server/core/identifiers/identifierGenerator';
import { Sanitizer } from '~~/server/core/sanitizer/sanitizer';
import { Slugifier } from '~~/server/core/slugifier/slugifier';
import mime from 'mime';
import { basename, extname } from 'path';

export abstract class FileUtility {
  static getExtensionFromMimeType(mimeType: string): null | string {
    if (mimeType !== 'application/octet-stream') {
      return mime.getExtension(mimeType);
    }

    return mimeType;
  }

  static async getFileTypeFromFile(file: File): Promise<{
    ext: null | string;
    mimeType: null | string;
    name: string;
    originalName: string;
    size: null | number;
  }> {
    const ext = FileUtility.getExtensionFromMimeType(file.type);

    return {
      ext,
      mimeType: file.type,
      name: this.#formatFileName(file.name, ext),
      originalName: file.name,
      size: file.size,
    };
  }

  static async getFileTypeFromFileLike(file: FileLike): Promise<{
    ext: null | string;
    mimeType: null | string;
    name: string;
    originalName: string;
    size: null | number;
  }> {
    const ext = FileUtility.getExtensionFromMimeType(file.type);

    return {
      ext,
      mimeType: file.type,
      name: this.#formatFileName(file.name, ext),
      originalName: file.name,
      size: file.size,
    };
  }

  static #formatFileName(fileName: string, ext: null | string): string {
    const uuid = IdentifierGenerator.generateUUIDV7();

    if (ext === null) {
      return `${Slugifier.slugify(Sanitizer.sanitize(fileName))}--${uuid}`;
    }

    return `${Slugifier.slugify(Sanitizer.sanitize(basename(fileName, extname(fileName))))}--${uuid}.${ext}`;
  }
}
