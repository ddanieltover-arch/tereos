import {
  DOCUMENT_CATEGORY_LABELS,
  IR_CATEGORIES,
  fallbackDownloads,
} from '@/lib/content/sprint4';
import { enrichDownloadDocuments } from '@/lib/investor/document-filters';
import { getDownloadDocuments } from '@/lib/sanity/fetch';
import type { DownloadDocument } from '@/types';

export async function getAllDownloadDocuments(
  locale: string
): Promise<DownloadDocument[]> {
  const cmsDocs = await getDownloadDocuments(locale);
  return enrichDownloadDocuments(cmsDocs ?? fallbackDownloads);
}

export async function getIrDocuments(locale: string): Promise<DownloadDocument[]> {
  const docs = await getAllDownloadDocuments(locale);
  return docs.filter((d) =>
    (IR_CATEGORIES as readonly string[]).includes(d.category)
  );
}

export async function getAnnualResultDocuments(
  locale: string
): Promise<DownloadDocument[]> {
  const docs = await getAllDownloadDocuments(locale);
  return docs.filter((d) => d.category === 'annual-report' || d.category === 'ir-document');
}

export async function getPresentationDocuments(
  locale: string
): Promise<DownloadDocument[]> {
  const docs = await getAllDownloadDocuments(locale);
  return docs.filter((d) => d.category === 'presentation');
}

export function findDocumentByTitle(
  documents: DownloadDocument[],
  title: string
): DownloadDocument | undefined {
  return documents.find((d) => d.title === title);
}

export { DOCUMENT_CATEGORY_LABELS, IR_CATEGORIES };
