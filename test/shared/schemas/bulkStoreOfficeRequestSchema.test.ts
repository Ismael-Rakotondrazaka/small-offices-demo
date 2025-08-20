import { describe, expect, it } from 'vitest';

import { BulkStoreOfficeRequestBodySchema } from '../../../shared/domains/offices';

describe('Bulk Store Office Request Schema', () => {
  it('should validate valid bulk office data', () => {
    const validData = {
      offices: [
        {
          arr: 1,
          isFake: false,
          lat: 48.8566,
          lng: 2.3522,
          posts: 4,
          price: 1200,
          title: 'Test Office 1',
          type: 'PRIVATE_OFFICE',
        },
        {
          arr: 2,
          isFake: true,
          lat: 48.8606,
          lng: 2.3376,
          posts: 8,
          price: 800,
          title: 'Test Office 2',
          type: 'OPEN_SPACE',
        },
      ],
    };

    const result = BulkStoreOfficeRequestBodySchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject empty offices array', () => {
    const invalidData = {
      offices: [],
    };

    const result = BulkStoreOfficeRequestBodySchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject too many offices', () => {
    const invalidData = {
      offices: Array.from({ length: 101 }, (_, i) => ({
        arr: 1,
        isFake: false,
        lat: 48.8566,
        lng: 2.3522,
        posts: 4,
        price: 1200,
        title: `Test Office ${i}`,
        type: 'PRIVATE_OFFICE',
      })),
    };

    const result = BulkStoreOfficeRequestBodySchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject invalid office type', () => {
    const invalidData = {
      offices: [
        {
          arr: 1,
          isFake: false,
          lat: 48.8566,
          lng: 2.3522,
          posts: 4,
          price: 1200,
          title: 'Test Office 1',
          type: 'INVALID_TYPE',
        },
      ],
    };

    const result = BulkStoreOfficeRequestBodySchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject invalid arrondissement', () => {
    const invalidData = {
      offices: [
        {
          arr: 21,
          isFake: false,
          lat: 48.8566,
          lng: 2.3522,
          posts: 4,
          price: 1200,
          title: 'Test Office 1',
          type: 'PRIVATE_OFFICE',
        },
      ],
    };

    const result = BulkStoreOfficeRequestBodySchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject negative price', () => {
    const invalidData = {
      offices: [
        {
          arr: 1,
          isFake: false,
          lat: 48.8566,
          lng: 2.3522,
          posts: 4,
          price: -100,
          title: 'Test Office 1',
          type: 'PRIVATE_OFFICE',
        },
      ],
    };

    const result = BulkStoreOfficeRequestBodySchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject zero posts', () => {
    const invalidData = {
      offices: [
        {
          arr: 1,
          isFake: false,
          lat: 48.8566,
          lng: 2.3522,
          posts: 0,
          price: 1200,
          title: 'Test Office 1',
          type: 'PRIVATE_OFFICE',
        },
      ],
    };

    const result = BulkStoreOfficeRequestBodySchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject empty title', () => {
    const invalidData = {
      offices: [
        {
          arr: 1,
          isFake: false,
          lat: 48.8566,
          lng: 2.3522,
          posts: 4,
          price: 1200,
          title: '',
          type: 'PRIVATE_OFFICE',
        },
      ],
    };

    const result = BulkStoreOfficeRequestBodySchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
