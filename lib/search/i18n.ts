import en from '@/messages/en.json';
import th from '@/messages/th.json';
import ptBr from '@/messages/pt-br.json';

type MessageCatalog = Record<string, unknown>;

const catalogs: Record<string, MessageCatalog> = {
  en: en as MessageCatalog,
  th: th as MessageCatalog,
  'pt-br': ptBr as MessageCatalog,
};

export function getSearchMessage(locale: string, path: string, fallback = ''): string {
  const catalog = catalogs[locale] ?? catalogs.en;
  const parts = path.split('.');
  let current: unknown = catalog;

  for (const part of parts) {
    if (!current || typeof current !== 'object' || !(part in current)) {
      return fallback || getSearchMessage('en', path, fallback);
    }
    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === 'string' ? current : fallback;
}
