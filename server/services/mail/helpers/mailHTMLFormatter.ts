import { minify } from 'html-minifier-terser';
import Mustache from 'mustache';

export abstract class MailHTMLFormatter {
  static format(
    template: string,
    view?: Record<string, unknown>,
  ): Promise<string> {
    /**
     * @see https://www.npmjs.com/package/mustache
     */
    const render: string = Mustache.render(template, view);

    return minify(render);
  }
}
