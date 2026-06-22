import type { Locale } from '@/lib/i18n/config';

export type SanityLocaleField = 'en' | 'th' | 'ptBr';

export function toSanityLocaleField(locale: string): SanityLocaleField {
  if (locale === 'pt-br') return 'ptBr';
  if (locale === 'th') return 'th';
  return 'en';
}

export function localizedField(locale: string): string {
  return toSanityLocaleField(locale);
}
