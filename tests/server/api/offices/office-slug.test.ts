import { Slugifier } from '~~/server/core/slugifier';
import { describe, expect, it } from 'vitest';

describe('Office Slug Generation', () => {
  it('should generate slug from title', () => {
    const title = 'My Awesome Office Space';
    const slug = Slugifier.slugify(title);
    expect(slug).toBe('my-awesome-office-space');
  });

  it('should handle special characters in title', () => {
    const title = 'Office & Co. - Paris 3ème';
    const slug = Slugifier.slugify(title);
    expect(slug).toBe('office-co-paris-3eme');
  });

  it('should handle accented characters', () => {
    const title = 'Bureau Élégant à Paris';
    const slug = Slugifier.slugify(title);
    expect(slug).toBe('bureau-elegant-a-paris');
  });

  it('should generate unique slug when base slug exists', async () => {
    const baseSlug = 'test-office';
    const existingSlugs = ['test-office', 'test-office-1'];

    const checkExists = async (slug: string) => existingSlugs.includes(slug);

    const uniqueSlug = await Slugifier.generateUniqueSlug(baseSlug, checkExists);
    expect(uniqueSlug).toBe('test-office-2');
  });

  it('should return base slug when no conflict exists', async () => {
    const baseSlug = 'unique-office';
    const existingSlugs = ['other-office'];

    const checkExists = async (slug: string) => existingSlugs.includes(slug);

    const uniqueSlug = await Slugifier.generateUniqueSlug(baseSlug, checkExists);
    expect(uniqueSlug).toBe('unique-office');
  });
});
