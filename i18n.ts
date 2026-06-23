
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { isValidLocale } from './lib/i18n/config';
import { loadMessages } from './lib/i18n/load-messages';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locale || !isValidLocale(locale)) {
    notFound();
  }

  return {
    locale,
    messages: await loadMessages(locale),
    timeZone: 'Asia/Bangkok',
    now: new Date(),
    onError(error) {
      if (error.code === 'MISSING_MESSAGE') {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[i18n] Missing message: ${error.message}`);
        }
        return;
      }
      console.error(error);
    },
    getMessageFallback({ namespace, key }) {
      const path = namespace ? `${namespace}.${key}` : key;
      if (process.env.NODE_ENV === 'development') {
        return `[${path}]`;
      }
      return path;
    },
  };
});
