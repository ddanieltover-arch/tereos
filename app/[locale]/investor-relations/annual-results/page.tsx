
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import { AnnualResultsList } from '@/components/investor/annual-results-list';
import { DocumentLibrary } from '@/components/downloads/document-library';
import { FadeIn } from '@/components/animations/fade-in';
import { buildDocumentLibraryLabels } from '@/lib/downloads/document-library-labels';
import { annualResultReleases } from '@/lib/content/investor';
import {
  DOCUMENT_CATEGORY_LABELS,
  getAnnualResultDocuments,
} from '@/lib/investor/documents';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.ir.annualResults' });
  return { title: t('title'), description: t('description') };
}

export default async function AnnualResultsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.ir' });
  const tPage = await getTranslations({ locale, namespace: 'pages.ir.annualResults' });
  const documents = await getAnnualResultDocuments(locale);

  return (
    <>
      <PageHero
        eyebrow={t('title')}
        title={tPage('title')}
        description={tPage('description')}
        dark
      />

      <AnnualResultsList
        locale={locale}
        releases={annualResultReleases}
        documents={documents}
        backLabel={t('backToIr')}
        backHref={`/${locale}/investor-relations`}
        labels={{
          periodAnnual: tPage('periodAnnual'),
          periodH1: tPage('periodH1'),
          periodQ1: tPage('periodQ1'),
          periodQ3: tPage('periodQ3'),
          viewPressRelease: tPage('viewPressRelease'),
          reportAvailable: tPage('reportAvailable'),
          noDocument: tPage('noDocument'),
        }}
      />

      <section className="py-section bg-neutral-50 border-t border-neutral-100">
        <div className="container-custom">
          <FadeIn>
            <h2 className="text-h3 font-bold text-neutral-900 mb-2">{tPage('downloadsTitle')}</h2>
            <p className="text-neutral-600 mb-10 max-w-2xl">{tPage('downloadsDescription')}</p>
          </FadeIn>
          <DocumentLibrary
            documents={documents}
            categoryLabels={DOCUMENT_CATEGORY_LABELS}
            filterMode="financial"
            labels={buildDocumentLibraryLabels(t, { includeFinancial: true })}
          />
        </div>
      </section>
    </>
  );
}
