import { MailHTMLFormatter } from './mailHTMLFormatter';

export abstract class MailLayoutFormatter {
  static #template: string = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <meta charset="UTF-8" />
    <title>{{title}}</title>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    "
  >
    <div style="max-width: 900px; margin: 0 auto; background-color: #fff">
      <div style="background-color: #4169e1; text-align: center; padding: 20px">
        <h1
          style="
            font-size: 20pt;
            font-weight: 700;
            margin: 0;
            padding: 0;
            color: #fff;
          "
        >
          Nuxt Fusion
        </h1>
        <p
          style="
            font-size: 15pt;
            font-weight: 700;
            font-family: sans-serif;
            color: #fff;
          "
        >
          The complete solution for secure, high-performance, feature-rich web apps, powered by Nuxt.
        </p>
      </div>
      <div
        style="
          background-color: #fff;
          padding: 36px 20px 20px 20px;
          margin-top: -16px;
          color: #000;
        "
      >
        {{{body}}}

        <div style="max-width: 900px">
          <p style="font-size: 11pt; font-family: sans-serif; color: #000">
            <strong style="color: #000">Nuxt Fusion</strong><br /><span
              style="font-size: 9pt; color: gray"
              >Github&nbsp;:
              <a
                href="https://github.com/Ismael-Rakotondrazaka/nuxt-fusion"
                style="color: #0563c1"
                >https://github.com/Ismael-Rakotondrazaka/nuxt-fusion</a
              ></span
            >
          </p>
        </div>
      </div>
      <hr style="background-color: gray; width: 95%; margin: 0 auto" />
      <footer
        style="
          color: #000;
          background-color: #fff;
          text-align: center;
          padding: 10px;
        "
      >
        &copy; {{year}} Nuxt Fusion
      </footer>
    </div>
  </body>
</html>
`;

  public static format(arg: { body: string; title: string }): Promise<string> {
    const { body, title } = arg;

    const year: number = new Date().getFullYear();

    return MailHTMLFormatter.format(this.#template, {
      body,
      title,
      year,
    });
  }
}
