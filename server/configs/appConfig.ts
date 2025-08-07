export abstract class AppConfig {
  static get URL(): string {
    return useRuntimeConfig().public.appUrl;
  }

  static get VERSION(): string {
    return useRuntimeConfig().public.appVersion;
  }
}
