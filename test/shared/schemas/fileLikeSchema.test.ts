import { describe, expect, it } from 'vitest';

import { FileLikeSchema } from '../../../shared/schemas/fileLikeSchema';

describe('FileLikeSchema', () => {
  it('accepts valid file-like objects', () => {
    const input = { lastModified: 1, name: 'a.txt', size: 10, type: 'text/plain' };
    const result = FileLikeSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('rejects missing fields or wrong types', () => {
    expect(FileLikeSchema.safeParse({}).success).toBe(false);
    expect(
      FileLikeSchema.safeParse({ lastModified: 'x', name: 'a', size: 1, type: 't' }).success,
    ).toBe(false);
  });

  it('rejects unknown keys due to strict mode', () => {
    const input = { extra: true, lastModified: 1, name: 'a.txt', size: 10, type: 'text/plain' };
    expect(FileLikeSchema.safeParse(input).success).toBe(false);
  });
});
