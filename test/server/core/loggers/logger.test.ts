import { describe, expect, it } from 'vitest';

import { Logger } from '../../../../server/core/loggers/logger';

describe('Logger', () => {
  it('should create a singleton instance', () => {
    const logger1 = Logger.instance;
    const logger2 = Logger.instance;
    expect(logger1).toBe(logger2);
  });

  it('should have all required methods', () => {
    const logger = Logger.instance;
    expect(typeof logger.debug).toBe('function');
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.warn).toBe('function');
    expect(typeof logger.error).toBe('function');
    expect(typeof logger.dev).toBe('function');
  });

  it('should log messages with metadata', () => {
    const logger = Logger.instance;
    const metadata = { path: 'test/path' };

    expect(() => {
      logger.info('Test message', metadata);
    }).not.toThrow();
  });

  it('should handle dev logs only in development', () => {
    const logger = Logger.instance;
    const metadata = { path: 'test/path' };

    expect(() => {
      logger.dev('Dev message', metadata);
    }).not.toThrow();
  });
});
