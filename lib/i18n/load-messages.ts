import type { AbstractIntlMessages } from 'next-intl';
import type { Locale } from '@/lib/i18n/config';

type Messages = AbstractIntlMessages;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Deep-merge locale overrides onto English (skill fallback: en → locale). */
export function deepMergeMessages(base: Messages, override: Messages): Messages {
  const result: Messages = { ...base };

  for (const [key, value] of Object.entries(override)) {
    if (isPlainObject(value) && isPlainObject(result[key])) {
      result[key] = deepMergeMessages(result[key] as Messages, value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

const localeImports: Record<Exclude<Locale, 'en'>, () => Promise<{ default: Messages }>> = {
  th: () => import('@/messages/th.json'),
  'pt-br': () => import('@/messages/pt-br.json'),
  fr: () => import('@/messages/fr.json'),
  cs: () => import('@/messages/cs.json'),
  id: () => import('@/messages/id.json'),
};

export async function loadMessages(locale: Locale): Promise<Messages> {
  const en = (await import('@/messages/en.json')).default as Messages;

  if (locale === 'en') {
    return en;
  }

  const loader = localeImports[locale];
  if (!loader) {
    return en;
  }

  const localized = (await loader()).default;
  return deepMergeMessages(en, localized);
}
