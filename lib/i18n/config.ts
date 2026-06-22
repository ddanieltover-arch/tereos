
export const locales = ['en', 'th', 'pt-br'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  th: 'ไทย',
  'pt-br': 'Português',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  th: '🇹🇭',
  'pt-br': '🇧🇷',
};
