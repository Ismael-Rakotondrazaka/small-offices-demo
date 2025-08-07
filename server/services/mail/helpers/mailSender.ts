import type { SentMessageInfo, Transporter } from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

import { MailConfig } from '~~/server/configs';
import { createTransport } from 'nodemailer';

export abstract class MailSender {
  static #transporter: Transporter<SentMessageInfo> | undefined;

  /**
   * @see https://nodemailer.com/
   */
  public static send(arg: {
    attachments?: Mail.Attachment[] | undefined;
    from: string;
    html?: string;
    subject: string;
    text?: string;
    to: string;
  }): Promise<SMTPTransport.SentMessageInfo> {
    const { attachments, from, html, subject, text, to } = arg;

    const transporter = this.#getTransporter();

    return transporter.sendMail({
      attachments,
      from,
      html,
      subject,
      text,
      to,
    });
  }

  static #getTransporter(): Transporter<SentMessageInfo> {
    if (!this.#transporter) {
      this.#transporter = createTransport({
        auth: {
          pass: MailConfig.SMTP_PASSWORD,
          user: MailConfig.SMTP_USER,
        },
        // @ts-expect-error @types/nodemailer package is not in sync with nodemailer package
        host: MailConfig.SMTP_HOST,
        port: MailConfig.SMTP_PORT,
        secure: true,
        tls: {
          rejectUnauthorized: false,
        },
      });
    }

    return this.#transporter;
  }
}
