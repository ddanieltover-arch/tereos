import type { DocumentLibraryLabels } from '@/components/downloads/document-library';
import type { IrDocumentType } from '@/lib/investor/document-filters';

export function buildFinancialFilterLabels(
  t: (key: string) => string
): Pick<
  DocumentLibraryLabels,
  'allFiscalYears' | 'allDocumentTypes' | 'filterFiscalYear' | 'filterDocumentType' | 'documentTypes'
> {
  return {
    allFiscalYears: t('allFiscalYears'),
    allDocumentTypes: t('allDocumentTypes'),
    filterFiscalYear: t('filterFiscalYear'),
    filterDocumentType: t('filterDocumentType'),
    documentTypes: {
      presentation: t('documentTypes.presentation'),
      regulated: t('documentTypes.regulated'),
      results: t('documentTypes.results'),
    } satisfies Record<IrDocumentType, string>,
  };
}

export function buildStandardFilterLabels(
  t: (key: string) => string
): Pick<DocumentLibraryLabels, 'allYears' | 'allLanguages' | 'all'> {
  return {
    all: t('all'),
    allYears: t('allYears'),
    allLanguages: t('allLanguages'),
  };
}

export function buildDocumentLibraryLabels(
  t: (key: string) => string,
  options?: { includeFinancial?: boolean }
): DocumentLibraryLabels {
  const standard = buildStandardFilterLabels(t);
  const financial = options?.includeFinancial ? buildFinancialFilterLabels(t) : null;

  return {
    ...standard,
    allFiscalYears: financial?.allFiscalYears ?? 'All fiscal years',
    allDocumentTypes: financial?.allDocumentTypes ?? 'All documents',
    filterFiscalYear: financial?.filterFiscalYear ?? 'Fiscal year',
    filterDocumentType: financial?.filterDocumentType ?? 'Document type',
    documentTypes: financial?.documentTypes ?? {
      presentation: 'Presentations',
      regulated: 'Regulated information',
      results: 'Results & financial releases',
    },
    download: t('download'),
    gated: t('gated'),
    gatedTitle: t('gatedTitle'),
    gatedDescription: t('gatedDescription'),
    email: t('email'),
    submit: t('submit'),
    success: t('gatedSuccess'),
    noResults: t('noResults'),
  };
}
