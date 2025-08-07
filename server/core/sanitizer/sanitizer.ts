import xss from 'xss';

export abstract class Sanitizer {
  public static sanitize(dirty: string) {
    return xss(dirty);
  }
}
