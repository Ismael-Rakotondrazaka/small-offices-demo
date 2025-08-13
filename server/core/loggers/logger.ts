import type { Logger as WinstonLogger } from 'winston';

import { createLogger, format, transports } from 'winston';

const { colorize, combine, printf, timestamp } = format;

/**
 * Custom log format
 */
const logFormat = printf(({ level, message, path, timestamp }) => {
  return `timestamp=${timestamp} level=${level} path="${path}" message="${message}"`;
});

export interface LogEntry {
  level: 'debug' | 'error' | 'info' | 'warn';
  message: string;
  metadata: LogMetadata;
}

export interface LogMetadata {
  [key: string]: unknown; // Allow additional metadata
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
  #logger: WinstonLogger;
  private get isDev() {
    return process.env.NODE_ENV !== 'production';
  }

  private constructor() {
    const transportList = [
      // Console transport for all logs
      new transports.Console({
        format: combine(colorize(), timestamp(), logFormat),
        level: this.isDev ? 'debug' : 'info',
      }),
    ];

    this.#logger = createLogger({
      format: combine(timestamp(), logFormat),
      level: this.isDev ? 'debug' : 'info',
      transports: transportList,
    });
  }

  debug(message: string, metadata: LogMetadata): void {
    this.log({ level: 'debug', message, metadata });
  }

  dev(message: string, metadata: LogMetadata = { path: 'unknown' }): void {
    if (this.isDev) {
      // Use debug level for dev logs to make them easily filterable
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
    this.#logger.log(level, message, {
      ...metadata,
      path: metadata.path || 'unknown',
    });
  }

  warn(message: string, metadata: LogMetadata): void {
    this.log({ level: 'warn', message, metadata });
  }
}
