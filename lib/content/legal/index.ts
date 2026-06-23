import type { LegalDocumentId } from './types';
import { legalDocumentsEn } from './en';
import { legalDocumentsTh } from './th';
import { legalDocumentsPtBr } from './pt-br';

const documentsByLocale = {
  en: legalDocumentsEn,
  th: legalDocumentsTh,
  'pt-br': legalDocumentsPtBr,
} as const;

export function getLegalDocument(locale: string, id: LegalDocumentId) {
  const docs =
    locale in documentsByLocale
      ? documentsByLocale[locale as keyof typeof documentsByLocale]
      : legalDocumentsEn;
  return docs[id];
}

export function getLegalRelatedLinks(locale: string, current: LegalDocumentId) {
  const all: { id: LegalDocumentId; path: string }[] = [
    { id: 'privacy', path: '/legal/privacy' },
    { id: 'cookies', path: '/legal/cookies' },
    { id: 'terms', path: '/legal/terms' },
    { id: 'accessibility', path: '/legal/accessibility' },
  ];

  return all
    .filter((item) => item.id !== current)
    .map((item) => ({
      href: `/${locale}${item.path}`,
      label: getLegalDocument(locale, item.id).title,
    }));
}

export { LEGAL_ENTITY } from './constants';
export type { LegalDocument, LegalDocumentId } from './types';
