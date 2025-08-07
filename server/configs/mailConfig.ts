export abstract class MailConfig {
  static get INFORMATION_EMAIL(): string {
    return useRuntimeConfig().informationEmail;
  }

  static get SMTP_HOST(): string {
    return useRuntimeConfig().smtpHost;
  }

  static get SMTP_PASSWORD(): string {
    return useRuntimeConfig().smtpPassword;
  }

  static get SMTP_PORT(): string {
    return useRuntimeConfig().smtpPort;
  }

  static get SMTP_USER(): string {
    return useRuntimeConfig().smtpUser;
  }
}
