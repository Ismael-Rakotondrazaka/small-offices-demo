import { MediaFileStorage } from '~~/server/services/storage/mediaFileStorage';

import { GCSProvider } from './GCSProvider';

export abstract class FileStorageProvider {
  public static get mediaStorage(): MediaFileStorage {
    if (!this.#mediaStorage) {
      this.#mediaStorage = new MediaFileStorage({
        storage: GCSProvider.instance,
      });
    }

    return this.#mediaStorage;
  }

  static #mediaStorage: MediaFileStorage;
}
