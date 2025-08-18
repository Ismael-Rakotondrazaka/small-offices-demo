import _slugify from 'slugify';

export abstract class Slugifier {
  static async generateUniqueSlug(
    baseSlug: string,
    // eslint-disable-next-line no-unused-vars
    checkExists: (slug: string) => Promise<boolean>,
  ): Promise<string> {
    let slug = baseSlug;
    let counter = 1;

    while (await checkExists(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }

  static slugify(raw: string) {
    return _slugify(raw, {
      locale: 'fr',
      lower: true,
    });
  }
}
