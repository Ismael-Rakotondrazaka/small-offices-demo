import type SMTPTransport from 'nodemailer/lib/smtp-transport';

import { MailConfig } from '~~/server/configs';
import { MailHTMLFormatter } from '~~/server/services/mail/helpers/mailHTMLFormatter';
import { MailLayoutFormatter } from '~~/server/services/mail/helpers/mailLayoutFormatter';
import { MailSender } from '~~/server/services/mail/helpers/mailSender';
import { Sanitizer } from '~~/server/utils';

export abstract class WelcomeMailSender {
  static #template: string = `
<h2 style="color: #2c3e50">Welcome to Nuxt Fusion!</h2>
<p style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">
  Hi {{firstName}},
</p>
<p style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">
  Welcome to
  <strong style="font-size: 11pt; font-family: sans-serif; color: #2c3e50"
    >Nuxt Fusion</strong
  >! We're excited to have you with us.
</p>
<p style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">
  To get started:
</p>
<ol style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">
  <li style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">
    <strong style="font-size: 11pt; font-family: sans-serif; color: #2c3e50"
      >Explore Your Dashboard:</strong
    >
    Access all features quickly.
  </li>
  <li style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">
    <strong>View the documentation:</strong> Find tutorials and support articles
    <a
      href="https://github.com/Ismael-Rakotondrazaka/nuxt-fusion"
      style="color: #4169e1"
      >here</a
    >.
  </li>
  <li style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">
    <strong style="font-size: 11pt; font-family: sans-serif; color: #2c3e50"
      >Join the Community:</strong
    >
    Connect with other users
    <a
      href="https://github.com/Ismael-Rakotondrazaka/nuxt-fusion"
      style="color: #4169e1"
      >here</a
    >.
  </li>
</ol>
<p style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">
  If you have any questions, reach out to us at
  <a
    href="https://github.com/Ismael-Rakotondrazaka/nuxt-fusion"
    style="color: #4169e1"
    >https://github.com/Ismael-Rakotondrazaka/nuxt-fusion</a
  >. We're here to help!
</p>
<p style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">
  Thanks for joining us!
</p>
<p style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">
  Best regards,
</p>
`;

  public static async send(arg: {
    email: string;
    firstName: string;
  }): Promise<SMTPTransport.SentMessageInfo> {
    const firstName = Sanitizer.sanitize(arg.firstName);
    const email = Sanitizer.sanitize(arg.email);

    const body = await MailHTMLFormatter.format(this.#template, {
      firstName,
    });

    const html = await MailLayoutFormatter.format({
      body,
      title: 'Welcome to Nuxt Fusion!',
    });

    return MailSender.send({
      from: MailConfig.INFORMATION_EMAIL,
      html,
      subject: 'Welcome to Nuxt Fusion!',
      to: email,
    });
  }
}
