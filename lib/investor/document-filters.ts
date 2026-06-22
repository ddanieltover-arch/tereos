import type { DownloadDocument } from '@/types';

export type IrDocumentType = 'presentation' | 'regulated' | 'results';

export const IR_DOCUMENT_TYPES: IrDocumentType[] = ['presentation', 'regulated', 'results'];

type DocumentFields = Pick<DownloadDocument, 'id' | 'title' | 'category' | 'year'>;

const MONTH_NAMES: Record<string, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};

/** Format stored fiscal year key as display label (2025-2026). */
export function formatFiscalYearLabel(fiscalYear: string): string {
  return fiscalYear;
}

function normalizeFiscalYear(start: string, end: string): string | undefined {
  const startYear = Number(start);
  let endYear = Number(end);

  if (end.length === 2) {
    endYear = Number(`${start.slice(0, 2)}${end}`);
  }

  if (!Number.isFinite(startYear) || !Number.isFinite(endYear)) return undefined;
  if (endYear !== startYear + 1) return undefined;

  return `${startYear}-${endYear}`;
}

function parseFiscalYearFromText(text: string): string | undefined {
  const longMatch = text.match(/(?:^|[^\d])(20\d{2})[/\-_](20\d{2})(?:[^\d]|$)/);
  if (longMatch) {
    const normalized = normalizeFiscalYear(longMatch[1], longMatch[2]);
    if (normalized) return normalized;
  }

  const shortMatch = text.match(/(?:^|[^\d])(20\d{2})[/\-_](\d{2})(?:[^\d]|$)/);
  if (shortMatch) {
    const normalized = normalizeFiscalYear(shortMatch[1], shortMatch[2]);
    if (normalized) return normalized;
  }

  return undefined;
}

function inferFiscalYearFromCalendarYear(year: number, month = 6): string {
  const fyStart = month < 4 ? year - 1 : year;
  return `${fyStart}-${fyStart + 1}`;
}

function inferMonthFromTitle(title: string): number | undefined {
  const match = title.match(
    /\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/i
  );
  if (!match) return undefined;
  return MONTH_NAMES[match[1].toLowerCase()];
}

export function deriveFiscalYear(doc: DocumentFields): string | undefined {
  const haystack = `${doc.id} ${doc.title}`.toLowerCase();
  const parsed = parseFiscalYearFromText(haystack);
  if (parsed) return parsed;

  if (doc.category === 'annual-report') {
    const singleYear = doc.title.match(/annual report\s+(20\d{2})\b/i);
    if (singleYear) {
      const year = Number(singleYear[1]);
      return `${year - 1}-${year}`;
    }
  }

  if (
    doc.category === 'presentation' ||
    doc.category === 'ir-document' ||
    doc.category === 'annual-report'
  ) {
    const month = inferMonthFromTitle(doc.title);
    return inferFiscalYearFromCalendarYear(doc.year, month);
  }

  return undefined;
}

const REGULATED_PATTERNS = [
  'prospectus',
  'euroclear',
  'redemption',
  'disclosure',
  'offer-announcement',
  'bond-placement',
  'subordinated-securities',
  'notice-market',
  'notice-euroclear',
  'tap-prospectus',
];

const RESULTS_PATTERNS = [
  'results-release',
  'results release',
  'financial-results',
  'financial results',
  'financial-statements',
  'financial statements',
  'consolidated-financial',
  'annual-results',
  'half-year',
  'h1-',
  'h1 ',
  'q1-',
  'q3-',
  'press-annual-results',
  'press-half-year',
  'ir-results',
  'ir-annual-results',
  'ir-half-year',
  'ir-q3-results',
  'ir-financial-release',
  'communication-to-bondholders',
  'bondholders',
  'full year',
  'half year',
  'interim results',
];

export function deriveIrDocumentType(doc: DocumentFields): IrDocumentType | undefined {
  if (doc.category === 'presentation') return 'presentation';
  if (doc.category === 'annual-report') return 'results';

  if (doc.category !== 'ir-document') return undefined;

  const haystack = `${doc.id} ${doc.title}`.toLowerCase();

  if (REGULATED_PATTERNS.some((pattern) => haystack.includes(pattern))) {
    return 'regulated';
  }

  if (RESULTS_PATTERNS.some((pattern) => haystack.includes(pattern))) {
    return 'results';
  }

  if (haystack.includes('press release') || haystack.includes('press-')) {
    if (haystack.includes('result') || haystack.includes('financial')) {
      return 'results';
    }
    return 'regulated';
  }

  return 'regulated';
}

export function enrichDownloadDocument(doc: DownloadDocument): DownloadDocument {
  return {
    ...doc,
    fiscalYear: doc.fiscalYear ?? deriveFiscalYear(doc),
    irType: doc.irType ?? deriveIrDocumentType(doc),
  };
}

export function enrichDownloadDocuments(docs: DownloadDocument[]): DownloadDocument[] {
  return docs.map(enrichDownloadDocument);
}

export function getAvailableFiscalYears(docs: DownloadDocument[]): string[] {
  return Array.from(
    new Set(docs.map((doc) => doc.fiscalYear).filter((year): year is string => Boolean(year)))
  ).sort((a, b) => {
    const aStart = Number(a.split('-')[0]);
    const bStart = Number(b.split('-')[0]);
    return bStart - aStart;
  });
}
