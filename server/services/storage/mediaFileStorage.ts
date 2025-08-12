import type { File as GCSFile, Storage } from '@google-cloud/storage';
import type { FileMetaData } from '~~/server/core/files/fileMetaData';

import { FileUtility } from '~~/server/core/files/fileUtility';

type SaveData = Parameters<typeof GCSFile.prototype.save>[0];

export class MediaFileStorage {
  #storage: Storage;

  constructor(arg: { storage: Storage }) {
    this.#storage = arg.storage;
  }

  async getSignedDownloadUrl(relativePath: string): Promise<string> {
    const bucket = this.#storage.bucket(
      useRuntimeConfig().fileStorageBucketName,
    );
    const bucketFile = bucket.file(relativePath);

    const options = {
      action: 'read' as const,
      expires: Date.now() + useRuntimeConfig().fileStorageSignedUrlExpiration,
      version: 'v4' as const,
    };

    const [url] = await bucketFile.getSignedUrl(options);

    return url;
  }

  async getSignedUploadUrl(
    rawFile: FileLike,
    options: {
      pathPrefix: string;
    },
  ): Promise<{
    fileMetaData: FileMetaData;
    url: string;
  }> {
    const bucket = this.#storage.bucket(
      useRuntimeConfig().fileStorageBucketName,
    );
    const fileType = await FileUtility.getFileTypeFromFileLike(rawFile);

    const { pathPrefix } = options ?? {};
    const relativePath
      = pathPrefix !== undefined
        ? `${pathPrefix}/${fileType.name}`
        : fileType.name;
    const bucketFile = bucket.file(relativePath);

    const [url] = await bucketFile.getSignedUrl({
      action: 'write',
      contentType: fileType.mimeType ?? undefined,
      expires: Date.now() + useRuntimeConfig().fileStorageSignedUrlExpiration,
      version: 'v4',
    });

    const fileMetaData: FileMetaData = {
      ext: fileType.ext,
      mimeType: fileType.mimeType,
      name: fileType.name,
      originalName: fileType.originalName,
      relativePath,
      size: fileType.size,
    };

    return {
      fileMetaData,
      url,
    };
  }

  async makeFilePublic(relativePath: string): Promise<void> {
    await this.#storage
      .bucket(useRuntimeConfig().fileStorageBucketName)
      .file(relativePath)
      .makePublic();
  }

  async upload(
    file: File,
    options?: {
      isPublic?: boolean;
      pathPrefix: string;
    },
  ): Promise<FileMetaData> {
    const bucket = this.#storage.bucket(
      useRuntimeConfig().fileStorageBucketName,
    );

    const fileType = await FileUtility.getFileTypeFromFile(file);

    const { isPublic = false, pathPrefix } = options ?? {};
    const relativePath = `${pathPrefix}/${fileType.name}`;
    const bucketFile = bucket.file(relativePath);

    // TODO: remove the await here
    // * we don't wait for the upload
    await file.arrayBuffer().then((arrayBuffer) => {
      return bucketFile.save(Buffer.from(arrayBuffer), {
        contentType: fileType.mimeType ?? undefined,
        metadata: {
          contentType: fileType.mimeType ?? undefined,
        },
        public: isPublic,
      });
    });

    const fileMetaData: FileMetaData = {
      ext: fileType.ext,
      mimeType: fileType.mimeType,
      name: fileType.name,
      originalName: fileType.originalName,
      relativePath,
      size: fileType.size,
    };

    return fileMetaData;
  }

  async uploadFromSaveData(
    data: SaveData,
    fileType: Awaited<ReturnType<typeof FileUtility.getFileTypeFromFile>>,
    options?: {
      isPublic?: boolean;
      pathPrefix: string;
    },
  ): Promise<FileMetaData> {
    const bucket = this.#storage.bucket(
      useRuntimeConfig().fileStorageBucketName,
    );

    const { isPublic = false, pathPrefix } = options ?? {};
    const relativePath
      = pathPrefix !== undefined
        ? `${pathPrefix}/${fileType.name}`
        : fileType.name;
    const bucketFile = bucket.file(relativePath);

    await bucketFile.save(data, {
      contentType: fileType.mimeType ?? undefined,
      metadata: {
        contentType: fileType.mimeType ?? undefined,
      },
      public: isPublic,
    });

    const fileMetaData: FileMetaData = {
      ext: fileType.ext,
      mimeType: fileType.mimeType,
      name: fileType.name,
      originalName: fileType.originalName,
      relativePath,
      size: fileType.size,
    };

    return fileMetaData;
  }
}
