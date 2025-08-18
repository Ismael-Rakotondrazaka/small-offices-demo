import { describe, expect, it } from 'vitest';

import { IdentifierSchema, StringIdentifierSchema } from '../../../shared/schemas/identifierSchema';

describe('IdentifierSchema', () => {
  it('parses positive integers and coerces strings', () => {
    expect(IdentifierSchema.safeParse(1).success).toBe(true);
    expect(IdentifierSchema.safeParse('42').success).toBe(true);
  });

  it('rejects zero, negatives, and non-integers', () => {
    expect(IdentifierSchema.safeParse(0).success).toBe(false);
    expect(IdentifierSchema.safeParse(-1).success).toBe(false);
    expect(IdentifierSchema.safeParse(1.2).success).toBe(false);
    expect(IdentifierSchema.safeParse('1.2').success).toBe(false);
  });
});

describe('StringIdentifierSchema', () => {
  it('accepts uuid', () => {
    expect(StringIdentifierSchema.safeParse('550e8400-e29b-41d4-a716-446655440000').success).toBe(true);
  });

  it('rejects non-uuid', () => {
    expect(StringIdentifierSchema.safeParse('not-a-uuid').success).toBe(false);
  });
});

