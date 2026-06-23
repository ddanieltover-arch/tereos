import type { Locale } from '@/lib/i18n/config';

/** BCP 47 tags for hreflang / alternates. */
export const HREFLANG_BY_LOCALE: Record<Locale, string> = {
  en: 'en',
  fr: 'fr',
  'pt-br': 'pt-BR',
  cs: 'cs',
  th: 'th',
  id: 'id',
};

/** Open Graph locale codes. */
export const OPEN_GRAPH_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  fr: 'fr_FR',
  'pt-br': 'pt_BR',
  cs: 'cs_CZ',
  th: 'th_TH',
  id: 'id_ID',
};

/** HTML `lang` attribute values. */
export const HTML_LANG: Record<Locale, string> = {
  en: 'en',
  fr: 'fr',
  'pt-br': 'pt-BR',
  cs: 'cs',
  th: 'th',
  id: 'id',
};

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';
export const LOCALE_STORAGE_KEY = 'tereosa-locale';
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
