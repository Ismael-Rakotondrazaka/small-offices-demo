import { describe, expect, it } from 'vitest';

import { makePaginatedSchema } from '../../../shared/schemas/paginationSchema';

describe('makePaginatedSchema', () => {
  it('applies defaults', () => {
    const schema = makePaginatedSchema();
    const result = schema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(1);
      expect(result.data.pageSize).toBe(20);
    }
  });

  it('coerces and validates positive integers', () => {
    const schema = makePaginatedSchema({ defaultPage: 2, defaultPageSize: 50 });
    const result = schema.safeParse({ page: '3', pageSize: '10' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(3);
      expect(result.data.pageSize).toBe(10);
    }
  });

  it('rejects non-positive or non-integer values', () => {
    const schema = makePaginatedSchema();
    expect(schema.safeParse({ page: 0 }).success).toBe(false);
    expect(schema.safeParse({ page: -1 }).success).toBe(false);
    expect(schema.safeParse({ page: 1.5 }).success).toBe(false);
    expect(schema.safeParse({ pageSize: 0 }).success).toBe(false);
    expect(schema.safeParse({ pageSize: -10 }).success).toBe(false);
    expect(schema.safeParse({ pageSize: 10.1 }).success).toBe(false);
  });
});

