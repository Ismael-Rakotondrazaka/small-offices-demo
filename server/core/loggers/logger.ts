import { type ConsolaInstance, createConsola } from 'consola';

export interface LogEntry {
  level: 'debug' | 'error' | 'info' | 'warn';
  message: string;
  metadata: LogMetadata;
}

export interface LogMetadata {
  [key: string]: unknown;
  path: string;
}

export class Logger {
  public static get instance(): Logger {
    if (!Logger.#instance) {
      Logger.#instance = new Logger();
    }
    return Logger.#instance;
  }

  static #instance: Logger;

  #logger: ConsolaInstance;

  private get isDev() {
    return process.env.NODE_ENV !== 'production';
  }

  private constructor() {
    this.#logger = createConsola({
      formatOptions: {
        colors: true,
        date: true,
      },
      level: this.isDev ? 4 : 3,
    });
  }

  debug(message: string, metadata: LogMetadata): void {
    this.log({ level: 'debug', message, metadata });
  }

  dev(message: string, metadata: LogMetadata = { path: 'unknown' }): void {
    if (this.isDev) {
      this.log({ level: 'debug', message, metadata });
    }
  }

  error(message: string, metadata: LogMetadata): void {
    this.log({ level: 'error', message, metadata });
  }

  info(message: string, metadata: LogMetadata): void {
    this.log({ level: 'info', message, metadata });
  }

  log({ level, message, metadata }: LogEntry): void {
    const logData = {
      ...metadata,
      path: metadata.path || 'unknown',
    };

    switch (level) {
      case 'debug':
        this.#logger.debug(message, logData);
        break;
      case 'error':
        this.#logger.error(message, logData);
        break;
      case 'info':
        this.#logger.info(message, logData);
        break;
      case 'warn':
        this.#logger.warn(message, logData);
        break;
    }
  }

  warn(message: string, metadata: LogMetadata): void {
    this.log({ level: 'warn', message, metadata });
  }
}
