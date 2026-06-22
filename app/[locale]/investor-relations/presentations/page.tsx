
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import { IrBackLink } from '@/components/investor/ir-back-link';
import { DocumentLibrary } from '@/components/downloads/document-library';
import { buildDocumentLibraryLabels } from '@/lib/downloads/document-library-labels';
import {
  DOCUMENT_CATEGORY_LABELS,
  getPresentationDocuments,
} from '@/lib/investor/documents';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.ir.presentations' });
  return { title: t('title'), description: t('description') };
}

export default async function PresentationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.ir' });
  const tPage = await getTranslations({ locale, namespace: 'pages.ir.presentations' });
  const documents = await getPresentationDocuments(locale);

  return (
    <>
      <PageHero
        eyebrow={t('title')}
        title={tPage('title')}
        description={tPage('description')}
        dark
      />

      <section className="py-section bg-white">
        <div className="container-custom">
          <IrBackLink href={`/${locale}/investor-relations`} label={t('backToIr')} />
          <DocumentLibrary
            documents={documents}
            categoryLabels={DOCUMENT_CATEGORY_LABELS}
            filterMode="financial"
            syncUrlParams
            labels={buildDocumentLibraryLabels(t, { includeFinancial: true })}
          />
        </div>
      </section>
    </>
  );
}
