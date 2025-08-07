import { Storage } from '@google-cloud/storage';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

export abstract class GCSProvider {
  public static get instance(): Storage {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    if (this.#storage === undefined) {
      this.#storage = new Storage({
        keyFilename: resolve(
          __dirname,
          '../../',
          useRuntimeConfig().fileStorageServiceAccountName,
        ),
        projectId: useRuntimeConfig().fileStorageBucketName,
      });
    }

    return this.#storage;
  }

  static #storage?: Storage;

  private constructor() {}
}
