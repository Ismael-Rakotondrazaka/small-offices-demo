import _slugify from 'slugify';

export abstract class Slugifier {
  static slugify(raw: string) {
    return _slugify(raw, {
      lower: true,
    });
  }
}
