import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { describe, expect, it } from 'vitest';

import { Exception } from '../../../../server/core/exceptions/exception';

describe('Exception', () => {
  describe('constructor', () => {
    it('should create exception with correct properties', () => {
      const data = { error: 'Test error' };
      const message = 'Test message';
      const statusCode = StatusCodes.BAD_REQUEST;
      const statusMessage = ReasonPhrases.BAD_REQUEST;

      const exception = new Exception({
        data,
        message,
        statusCode,
        statusMessage,
      });

      expect(exception.data).toEqual(data);
      expect(exception.message).toBe(message);
      expect(exception.statusCode).toBe(statusCode);
      expect(exception.statusMessage).toBe(statusMessage);
      expect(exception).toBeInstanceOf(Error);
    });
  });

  describe('badRequest', () => {
    it('should create bad request exception with default message', () => {
      const data = { error: 'Required', field: 'name' };
      const exception = Exception.badRequest({ data });

      expect(exception.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(exception.statusMessage).toBe(ReasonPhrases.BAD_REQUEST);
      expect(exception.data).toEqual(data);
      expect(exception.message).toBe('errors.requests.defaults.badRequest');
    });

    it('should create bad request exception with custom message', () => {
      const data = { error: 'Required', field: 'name' };
      const message = 'Custom bad request message';
      const exception = Exception.badRequest({ data, message });

      expect(exception.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(exception.statusMessage).toBe(ReasonPhrases.BAD_REQUEST);
      expect(exception.data).toEqual(data);
      expect(exception.message).toBe(message);
    });
  });

  describe('forbidden', () => {
    it('should create forbidden exception with default message', () => {
      const data = { reason: 'Insufficient permissions' };
      const exception = Exception.forbidden({ data });

      expect(exception.statusCode).toBe(StatusCodes.FORBIDDEN);
      expect(exception.statusMessage).toBe(ReasonPhrases.FORBIDDEN);
      expect(exception.data).toEqual(data);
      expect(exception.message).toBe('errors.requests.defaults.forbidden');
    });

    it('should create forbidden exception with custom message', () => {
      const data = { reason: 'Insufficient permissions' };
      const message = 'Custom forbidden message';
      const exception = Exception.forbidden({ data, message });

      expect(exception.statusCode).toBe(StatusCodes.FORBIDDEN);
      expect(exception.statusMessage).toBe(ReasonPhrases.FORBIDDEN);
      expect(exception.data).toEqual(data);
      expect(exception.message).toBe(message);
    });
  });

  describe('notFound', () => {
    it('should create not found exception with default message', () => {
      const data = { id: '123', resource: 'User' };
      const exception = Exception.notFound({ data });

      expect(exception.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(exception.statusMessage).toBe(ReasonPhrases.NOT_FOUND);
      expect(exception.data).toEqual(data);
      expect(exception.message).toBe('errors.requests.defaults.notFound');
    });

    it('should create not found exception with custom message', () => {
      const data = { id: '123', resource: 'User' };
      const message = 'Custom not found message';
      const exception = Exception.notFound({ data, message });

      expect(exception.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(exception.statusMessage).toBe(ReasonPhrases.NOT_FOUND);
      expect(exception.data).toEqual(data);
      expect(exception.message).toBe(message);
    });
  });

  describe('unauthorized', () => {
    it('should create unauthorized exception with default message', () => {
      const data = { reason: 'Invalid token' };
      const exception = Exception.unauthorized({ data });

      expect(exception.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      expect(exception.statusMessage).toBe(ReasonPhrases.UNAUTHORIZED);
      expect(exception.data).toEqual(data);
      expect(exception.message).toBe('errors.requests.defaults.unauthorized');
    });

    it('should create unauthorized exception with custom message', () => {
      const data = { reason: 'Invalid token' };
      const message = 'Custom unauthorized message';
      const exception = Exception.unauthorized({ data, message });

      expect(exception.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      expect(exception.statusMessage).toBe(ReasonPhrases.UNAUTHORIZED);
      expect(exception.data).toEqual(data);
      expect(exception.message).toBe(message);
    });
  });

  describe('notImplemented', () => {
    it('should create not implemented exception with default message', () => {
      const data = { feature: 'Advanced search' };
      const exception = Exception.notImplemented({ data });

      expect(exception.statusCode).toBe(StatusCodes.NOT_IMPLEMENTED);
      expect(exception.statusMessage).toBe(ReasonPhrases.NOT_IMPLEMENTED);
      expect(exception.data).toEqual(data);
      expect(exception.message).toBe('errors.requests.defaults.notImplemented');
    });

    it('should create not implemented exception with custom message', () => {
      const data = { feature: 'Advanced search' };
      const message = 'Custom not implemented message';
      const exception = Exception.notImplemented({ data, message });

      expect(exception.statusCode).toBe(StatusCodes.NOT_IMPLEMENTED);
      expect(exception.statusMessage).toBe(ReasonPhrases.NOT_IMPLEMENTED);
      expect(exception.data).toEqual(data);
      expect(exception.message).toBe(message);
    });
  });

  describe('internalServer', () => {
    it('should create internal server exception with default message', () => {
      const data = { error: 'Database connection failed' };
      const path = '/api/users';
      const exception = Exception.internalServer({ data, path });

      expect(exception.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(exception.statusMessage).toBe(ReasonPhrases.INTERNAL_SERVER_ERROR);
      expect(exception.data).toEqual(data);
      expect(exception.message).toBe('errors.requests.defaults.internalServer');
    });

    it('should create internal server exception with custom message', () => {
      const data = { error: 'Database connection failed' };
      const path = '/api/users';
      const message = 'Custom internal server message';
      const exception = Exception.internalServer({ data, message, path });

      expect(exception.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(exception.statusMessage).toBe(ReasonPhrases.INTERNAL_SERVER_ERROR);
      expect(exception.data).toEqual(data);
      expect(exception.message).toBe(message);
    });
  });

  describe('fromUnknown', () => {
    it('should return the same exception if input is already an Exception', () => {
      const originalException = Exception.badRequest({ data: { error: 'Test' } });
      const result = Exception.fromUnknown({ error: originalException, path: '/test' });

      expect(result).toBe(originalException);
    });

    it('should create bad request exception from error object', () => {
      const error = {
        data: { field: 'name' },
        message: 'Bad request error',
        statusCode: StatusCodes.BAD_REQUEST,
      };
      const result = Exception.fromUnknown({ error, path: '/test' });

      expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(result.message).toBe('Bad request error');
      expect(result.data).toEqual({ field: 'name' });
    });

    it('should create forbidden exception from error object', () => {
      const error = {
        data: { reason: 'No access' },
        message: 'Forbidden error',
        statusCode: StatusCodes.FORBIDDEN,
      };
      const result = Exception.fromUnknown({ error, path: '/test' });

      expect(result.statusCode).toBe(StatusCodes.FORBIDDEN);
      expect(result.message).toBe('Forbidden error');
      expect(result.data).toEqual({ reason: 'No access' });
    });

    it('should create internal server exception from error object', () => {
      const error = {
        data: { error: 'Database error' },
        message: 'Internal server error',
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      };
      const result = Exception.fromUnknown({ error, path: '/test' });

      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.message).toBe('Internal server error');
      expect(result.data).toEqual({ error: 'Database error' });
    });

    it('should create not found exception from error object', () => {
      const error = {
        data: { resource: 'User' },
        message: 'Not found error',
        statusCode: StatusCodes.NOT_FOUND,
      };
      const result = Exception.fromUnknown({ error, path: '/test' });

      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(result.message).toBe('Not found error');
      expect(result.data).toEqual({ resource: 'User' });
    });

    it('should create not implemented exception from error object', () => {
      const error = {
        data: { feature: 'Search' },
        message: 'Not implemented error',
        statusCode: StatusCodes.NOT_IMPLEMENTED,
      };
      const result = Exception.fromUnknown({ error, path: '/test' });

      expect(result.statusCode).toBe(StatusCodes.NOT_IMPLEMENTED);
      expect(result.message).toBe('Not implemented error');
      expect(result.data).toEqual({ feature: 'Search' });
    });

    it('should create unauthorized exception from error object', () => {
      const error = {
        data: { reason: 'Invalid token' },
        message: 'Unauthorized error',
        statusCode: StatusCodes.UNAUTHORIZED,
      };
      const result = Exception.fromUnknown({ error, path: '/test' });

      expect(result.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      expect(result.message).toBe('Unauthorized error');
      expect(result.data).toEqual({ reason: 'Invalid token' });
    });

    it('should create default internal server exception for unknown status code', () => {
      const error = {
        data: { error: 'Unknown' },
        message: 'Unknown error',
        statusCode: 999,
      };
      const result = Exception.fromUnknown({ error, path: '/test' });

      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.message).toBe('Unknown error');
      expect(result.data).toEqual({ error: 'Unknown' });
    });

    it('should create default internal server exception for non-object error', () => {
      const error = 'Simple string error';
      const result = Exception.fromUnknown({ error, path: '/test' });

      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.message).toBe('errors.default');
      expect(result.data).toEqual({});
    });

    it('should create default internal server exception for null error', () => {
      const error = null;
      const result = Exception.fromUnknown({ error, path: '/test' });

      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.message).toBe('errors.default');
      expect(result.data).toEqual({});
    });
  });

  describe('getNuxtError', () => {
    it('should return NuxtError instance', () => {
      const exception = Exception.badRequest({ data: { error: 'Test' } });
      const nuxtError = exception.getNuxtError();

      expect(nuxtError).toBeDefined();
      expect(nuxtError.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(nuxtError.statusMessage).toBe(ReasonPhrases.BAD_REQUEST);
    });
  });
});
