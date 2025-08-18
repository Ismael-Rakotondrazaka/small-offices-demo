import { describe, expect, it } from 'vitest';

import { PhoneNumberSchema } from '../../../shared/schemas/phoneNumberSchema';

describe('PhoneNumberSchema', () => {
  it('should validate and format French mobile numbers', () => {
    const validNumbers = [
      '0612345678',
      '06 12 34 56 78',
      '06.12.34.56.78',
      '06-12-34-56-78',
      '+33 6 12 34 56 78',
      '+33612345678',
      '0033 6 12 34 56 78',
      '0033612345678',
    ];

    validNumbers.forEach((number) => {
      const result = PhoneNumberSchema.safeParse(number);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('+33612345678');
      }
    });
  });

  it('should validate and format French landline numbers', () => {
    const validNumbers = [
      '0123456789',
      '01 23 45 67 89',
      '01.23.45.67.89',
      '01-23-45-67-89',
      '+33 1 23 45 67 89',
      '+33123456789',
      '0033 1 23 45 67 89',
      '0033123456789',
    ];

    validNumbers.forEach((number) => {
      const result = PhoneNumberSchema.safeParse(number);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('+33123456789');
      }
    });
  });

  it('should reject invalid phone numbers', () => {
    const invalidNumbers = [
      '123',
      'abcdef',
      '06 12 34 56',
      '06 12 34 56 78 90',
      '+33 6 12 34 56',
      'invalid',
      '',
    ];

    invalidNumbers.forEach((number) => {
      const result = PhoneNumberSchema.safeParse(number);
      expect(result.success).toBe(false);
    });
  });

  it('should handle international numbers', () => {
    const internationalNumbers = [
      '+1 202 456 1111',
      '+44 20 7946 0958',
      '+49 30 12345678',
    ];

    internationalNumbers.forEach((number) => {
      const result = PhoneNumberSchema.safeParse(number);
      expect(result.success).toBe(true);
    });
  });
});
