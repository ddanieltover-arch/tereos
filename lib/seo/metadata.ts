import { locales, type Locale } from '@/lib/i18n/config';
import { HREFLANG_BY_LOCALE } from '@/lib/i18n/locale-meta';
import { getSiteUrl } from '@/lib/site';

export function getAlternateLanguages(path = '') {
  const base = getSiteUrl();
  const suffix = path.startsWith('/') ? path : path ? `/${path}` : '';

  const languages = Object.fromEntries(
    locales.map((locale) => [HREFLANG_BY_LOCALE[locale], `${base}/${locale}${suffix}`])
  );

  return {
    ...languages,
    'x-default': `${base}/en${suffix}`,
  };
}

export function getCanonicalUrl(locale: string, path = '') {
  const base = getSiteUrl();
  const suffix = path.startsWith('/') ? path : path ? `/${path}` : '';
  return `${base}/${locale}${suffix}`;
}

export function getHreflangForLocale(locale: Locale): string {
  return HREFLANG_BY_LOCALE[locale];
}
