import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { Exception } from '../../../../server/core/exceptions/exception';
import { Validator } from '../../../../server/core/validations/validator';

describe('Validator', () => {
  const validator = new Validator();

  describe('validate', () => {
    it('should validate valid input successfully', async () => {
      const schema = z.object({
        age: z.number(),
        name: z.string(),
      });

      const input = {
        age: 30,
        name: 'John Doe',
      };

      const result = await validator.validate(schema, input);

      expect(result).toEqual({
        age: 30,
        name: 'John Doe',
      });
    });

    it('should throw Exception.badRequest for invalid input', async () => {
      const schema = z.object({
        age: z.number(),
        name: z.string(),
      });

      const input = {
        age: 'invalid-age',
        name: 'John Doe',
      };

      await expect(validator.validate(schema, input)).rejects.toThrow(Exception);
    });

    it('should handle form data input', async () => {
      const schema = z.object({
        age: z.coerce.number(),
        name: z.string(),
      });

      const formData = new FormData();
      formData.append('name', 'John Doe');
      formData.append('age', '30');

      const result = await validator.validate(schema, formData);

      expect(result).toEqual({
        age: 30,
        name: 'John Doe',
      });
    });

    it('should handle nested objects', async () => {
      const schema = z.object({
        settings: z.object({
          notifications: z.boolean(),
        }),
        user: z.object({
          email: z.string().email(),
          name: z.string(),
        }),
      });

      const input = {
        settings: {
          notifications: true,
        },
        user: {
          email: 'john@example.com',
          name: 'John Doe',
        },
      };

      const result = await validator.validate(schema, input);

      expect(result).toEqual(input);
    });

    it('should handle arrays', async () => {
      const schema = z.object({
        scores: z.array(z.number()),
        tags: z.array(z.string()),
      });

      const input = {
        scores: [1, 2, 3, 4, 5],
        tags: ['tag1', 'tag2', 'tag3'],
      };

      const result = await validator.validate(schema, input);

      expect(result).toEqual(input);
    });
  });

  describe('validateSafe', () => {
    it('should return success result for valid input', async () => {
      const schema = z.object({
        age: z.number(),
        name: z.string(),
      });

      const input = {
        age: 30,
        name: 'John Doe',
      };

      const result = await validator.validateSafe(schema, input);

      expect(result.isSuccess).toBe(true);
      if (result.isSuccess) {
        expect(result.data).toEqual({
          age: 30,
          name: 'John Doe',
        });
      }
    });

    it('should return error result for invalid input', async () => {
      const schema = z.object({
        age: z.number(),
        name: z.string(),
      });

      const input = {
        age: 'invalid-age',
        name: 'John Doe',
      };

      const result = await validator.validateSafe(schema, input);

      expect(result.isSuccess).toBe(false);
      if (!result.isSuccess) {
        expect(result.error).toBeDefined();
        expect(Object.keys(result.error)).toEqual(expect.arrayContaining(['age']));
        expect(Object.keys(result.error)).toHaveLength(1);
      }
    });

    it('should handle missing required fields', async () => {
      const schema = z.object({
        email: z.string().email(),
        name: z.string(),
      });

      const input = {
        name: 'John Doe',
      };

      const result = await validator.validateSafe(schema, input);

      expect(result.isSuccess).toBe(false);
      if (!result.isSuccess) {
        expect(Object.keys(result.error)).toEqual(expect.arrayContaining(['email']));
        expect(Object.keys(result.error)).toHaveLength(1);
      }
    });

    it('should handle multiple validation errors', async () => {
      const schema = z.object({
        age: z.number().min(18),
        email: z.string().email(),
        name: z.string().min(2),
      });

      const input = {
        age: 15,
        email: 'invalid-email',
        name: 'J',
      };

      const result = await validator.validateSafe(schema, input);

      expect(result.isSuccess).toBe(false);
      if (!result.isSuccess) {
        expect(Object.keys(result.error)).toEqual(expect.arrayContaining(['age', 'email', 'name']));
        expect(Object.keys(result.error)).toHaveLength(3);
      }
    });

    it('should handle form data with validateSafe', async () => {
      const schema = z.object({
        age: z.coerce.number(),
        name: z.string(),
      });

      const formData = new FormData();
      formData.append('name', 'John Doe');
      formData.append('age', '30');

      const result = await validator.validateSafe(schema, formData);

      expect(result.isSuccess).toBe(true);
      if (result.isSuccess) {
        expect(result.data).toEqual({
          age: 30,
          name: 'John Doe',
        });
      }
    });

    it('should handle empty input', async () => {
      const schema = z.object({
        age: z.number().optional(),
        name: z.string().optional(),
      });

      const input = {};

      const result = await validator.validateSafe(schema, input);

      expect(result.isSuccess).toBe(true);
      if (result.isSuccess) {
        expect(result.data).toEqual({});
      }
    });
  });
});
