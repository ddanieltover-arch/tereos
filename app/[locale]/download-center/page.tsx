
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import { DownloadHubNav } from '@/components/downloads/download-hub-nav';
import { DocumentLibrary } from '@/components/downloads/document-library';
import { FadeIn } from '@/components/animations/fade-in';
import { DOWNLOAD_HUB_LINKS, type DownloadHubSlug } from '@/lib/content/downloads';
import { DOCUMENT_CATEGORY_LABELS, fallbackDownloads } from '@/lib/content/sprint4';
import { buildDocumentLibraryLabels } from '@/lib/downloads/document-library-labels';
import { enrichDownloadDocuments } from '@/lib/investor/document-filters';
import { getDownloadDocuments } from '@/lib/sanity/fetch';

const VALID_CATEGORIES = new Set(Object.keys(DOCUMENT_CATEGORY_LABELS));

function resolveActiveSlug(category?: string): DownloadHubSlug {
  if (!category) return 'all';
  const match = DOWNLOAD_HUB_LINKS.find((link) => link.category === category);
  return match?.slug ?? 'all';
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.downloads' });
  return { title: t('title'), description: t('description') };
}

export default async function DownloadCenterPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category: categoryParam } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'pages.downloads' });

  const cmsDocs = await getDownloadDocuments(locale);
  const documents = enrichDownloadDocuments(cmsDocs || fallbackDownloads);
  const initialCategory =
    categoryParam && VALID_CATEGORIES.has(categoryParam) ? categoryParam : 'all';
  const useFinancialFilters =
    initialCategory === 'annual-report' ||
    initialCategory === 'presentation' ||
    initialCategory === 'ir-document';
  const activeSlug = resolveActiveSlug(initialCategory === 'all' ? undefined : initialCategory);

  const countByCategory = (category: string) =>
    documents.filter((document) => document.category === category).length;

  const hubSections = DOWNLOAD_HUB_LINKS.map((link) => ({
    slug: link.slug,
    href: link.href,
    external: link.external,
    title: t(`sections.${link.slug}.title`),
    description: t(`sections.${link.slug}.description`),
    count:
      link.slug === 'all'
        ? documents.length
        : link.category
          ? countByCategory(link.category)
          : undefined,
  }));

  const libraryLabels = buildDocumentLibraryLabels(t, { includeFinancial: useFinancialFilters });

  return (
    <>
      <PageHero eyebrow="Tereos" title={t('title')} description={t('description')} />

      <section className="py-section bg-white border-b border-neutral-100">
        <div className="container-custom">
          <FadeIn className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: documents.length, label: t('statDocuments') },
              { value: new Set(documents.map((document) => document.category)).size, label: t('statCategories') },
              { value: new Set(documents.map((document) => document.year)).size, label: t('statYears') },
              {
                value: documents.filter((document) => document.gated).length,
                label: t('statGated'),
              },
            ].map((stat) => (
              <div key={stat.label} className="p-5 bg-neutral-50 rounded-2xl text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-neutral-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      <DownloadHubNav
        locale={locale}
        activeSlug={activeSlug}
        sections={hubSections}
        title={t('sectionsTitle')}
        description={t('sectionsDescription')}
        learnMore={t('learnMore')}
      />

      <section className="py-section bg-white">
        <div className="container-custom">
          <FadeIn className="mb-10">
            <h2 className="text-h3 font-bold text-neutral-900 mb-2">{t('libraryTitle')}</h2>
            <p className="text-neutral-600 max-w-2xl">{t('libraryDescription')}</p>
          </FadeIn>

          <DocumentLibrary
            documents={documents}
            categoryLabels={DOCUMENT_CATEGORY_LABELS}
            initialCategory={initialCategory}
            filterMode={useFinancialFilters ? 'financial' : 'standard'}
            labels={libraryLabels}
          />
        </div>
      </section>
    </>
  );
}
