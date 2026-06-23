
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n/config';
import { LOCALE_COOKIE_MAX_AGE, LOCALE_COOKIE_NAME } from './lib/i18n/locale-meta';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
  localeCookie: {
    name: LOCALE_COOKIE_NAME,
    maxAge: LOCALE_COOKIE_MAX_AGE,
  },
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
