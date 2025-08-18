import type SMTPTransport from 'nodemailer/lib/smtp-transport';

import { MailConfig } from '~~/server/configs';
import { MailHTMLFormatter } from '~~/server/services/mail/helpers/mailHTMLFormatter';
import { MailLayoutFormatter } from '~~/server/services/mail/helpers/mailLayoutFormatter';
import { MailSender } from '~~/server/services/mail/helpers/mailSender';
import { Sanitizer } from '~~/server/utils';

export abstract class LeadNotificationMailSender {
  static #template: string = `
<h2 style="color: #2c3e50">Confirmation de votre demande de visite</h2>
<p style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">
  Bonjour {{leadName}},
</p>
<p style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">
  Nous avons bien reçu votre demande de visite pour le bureau <strong style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">{{officeTitle}}</strong>.
</p>
<p style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">
  <strong style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">Récapitulatif de votre demande :</strong>
</p>
<ul style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">
  <li style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">
    <strong style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">Bureau :</strong> {{officeTitle}}
  </li>
  <li style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">
    <strong style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">Prix :</strong> {{officePrice}}€
  </li>
  <li style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">
    <strong style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">Arrondissement :</strong> {{officeArr}}
  </li>
</ul>
<p style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">
  Notre équipe va étudier votre demande et vous contacter dans les plus brefs délais pour organiser la visite.
</p>
<p style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">
  Merci de votre confiance !
</p>
<p style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">
  Cordialement,
</p>
<p style="font-size: 11pt; font-family: sans-serif; color: #2c3e50">
  L'équipe Petits Bureaux
</p>
`;

  public static async send(arg: {
    leadEmail: string;
    leadName: string;
    leadPhone: string;
    officeArr: string;
    officePrice: number;
    officeTitle: string;
  }): Promise<SMTPTransport.SentMessageInfo> {
    const leadName = Sanitizer.sanitize(arg.leadName);
    const leadEmail = Sanitizer.sanitize(arg.leadEmail);
    const leadPhone = Sanitizer.sanitize(arg.leadPhone);
    const officeTitle = Sanitizer.sanitize(arg.officeTitle);
    const officePrice = arg.officePrice;
    const officeArr = Sanitizer.sanitize(arg.officeArr);

    const body = await MailHTMLFormatter.format(this.#template, {
      leadEmail,
      leadName,
      leadPhone,
      officeArr,
      officePrice,
      officeTitle,
    });

    const html = await MailLayoutFormatter.format({
      body,
      title: 'Confirmation de votre demande de visite - Petits Bureaux',
    });

    return MailSender.send({
      from: MailConfig.INFORMATION_EMAIL,
      html,
      subject: `Confirmation de votre demande de visite - ${officeTitle}`,
      to: leadEmail,
    });
  }
}
