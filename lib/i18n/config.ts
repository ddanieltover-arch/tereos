
export const locales = ['en', 'fr', 'pt-br', 'cs', 'th', 'id'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  'pt-br': 'Português',
  cs: 'Čeština',
  th: 'ไทย',
  id: 'Bahasa Indonesia',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  fr: '🇫🇷',
  'pt-br': '🇧🇷',
  cs: '🇨🇿',
  th: '🇹🇭',
  id: '🇮🇩',
};

export function isValidLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
