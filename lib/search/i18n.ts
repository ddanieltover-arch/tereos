import type { AbstractIntlMessages } from 'next-intl';
import en from '@/messages/en.json';
import th from '@/messages/th.json';
import ptBr from '@/messages/pt-br.json';
import fr from '@/messages/fr.json';
import cs from '@/messages/cs.json';
import id from '@/messages/id.json';
import { deepMergeMessages } from '@/lib/i18n/load-messages';
import { isValidLocale } from '@/lib/i18n/config';

const enCatalog = en as AbstractIntlMessages;

const catalogs: Record<string, AbstractIntlMessages> = {
  en: enCatalog,
  th: th as AbstractIntlMessages,
  'pt-br': ptBr as AbstractIntlMessages,
  fr: deepMergeMessages(enCatalog, fr as AbstractIntlMessages),
  cs: deepMergeMessages(enCatalog, cs as AbstractIntlMessages),
  id: deepMergeMessages(enCatalog, id as AbstractIntlMessages),
};
export function getSearchMessage(locale: string, path: string, fallback = ''): string {
  const catalog = (isValidLocale(locale) ? catalogs[locale] : undefined) ?? catalogs.en;
  const parts = path.split('.');  let current: unknown = catalog;

  for (const part of parts) {
    if (!current || typeof current !== 'object' || !(part in current)) {
      return fallback || getSearchMessage('en', path, fallback);
    }
    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === 'string' ? current : fallback;
}
