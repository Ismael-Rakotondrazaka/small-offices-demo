import { describe, expect, it } from 'vitest';

import { SortOrderSchema } from '../../../shared/schemas/sortOrderSchema';

describe('SortOrderSchema', () => {
  it('defaults to asc', () => {
    const result = SortOrderSchema.safeParse(undefined);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data).toBe('asc');
  });

  it('accepts asc and desc', () => {
    expect(SortOrderSchema.safeParse('asc').success).toBe(true);
    expect(SortOrderSchema.safeParse('desc').success).toBe(true);
  });

  it('rejects invalid values', () => {
    expect(SortOrderSchema.safeParse('ASC').success).toBe(false);
    expect(SortOrderSchema.safeParse('foo').success).toBe(false);
    expect(SortOrderSchema.safeParse('').success).toBe(false);
  });
});
