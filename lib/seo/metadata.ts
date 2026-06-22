import { locales, type Locale } from '@/lib/i18n/config';
import { getSiteUrl } from '@/lib/site';

const LOCALE_TO_HREFLANG: Record<Locale, string> = {
  en: 'en',
  th: 'th',
  'pt-br': 'pt-BR',
};

export function getAlternateLanguages(path = '') {
  const base = getSiteUrl();
  const suffix = path.startsWith('/') ? path : path ? `/${path}` : '';

  return Object.fromEntries(
    locales.map((locale) => [LOCALE_TO_HREFLANG[locale], `${base}/${locale}${suffix}`])
  );
}

export function getCanonicalUrl(locale: string, path = '') {
  const base = getSiteUrl();
  const suffix = path.startsWith('/') ? path : path ? `/${path}` : '';
  return `${base}/${locale}${suffix}`;
}
