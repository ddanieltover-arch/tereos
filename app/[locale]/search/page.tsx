
import { Suspense } from 'react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import { SiteSearch } from '@/components/search/site-search';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.search' });
  return { title: t('title'), description: t('description') };
}

function SearchFallback() {
  return (
    <div className="py-16 flex justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

export default async function SearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.search' });

  return (
    <>
      <PageHero
        eyebrow="Tereos Açúcar e Energia"
        title={t('title')}
        description={t('description')}
      />
      <section className="py-section bg-white">
        <div className="container-custom max-w-4xl">
          <Suspense fallback={<SearchFallback />}>
            <SiteSearch
              locale={locale}
              labels={{
                placeholder: t('placeholder'),
                submit: t('submit'),
                loading: t('loading'),
                resultsFor: t('resultsFor'),
                resultCount: t('resultCount'),
                noResults: t('noResults'),
                emptyPrompt: t('emptyPrompt'),
                error: t('error'),
                rateLimit: t('rateLimit'),
                loadMore: t('loadMore'),
                filterAll: t('filterAll'),
                typePage: t('types.page'),
                typeProduct: t('types.product'),
                typeNews: t('types.news'),
                typeDivision: t('types.division'),
                typeJob: t('types.job'),
                typeMarket: t('types.market'),
                typeProductLine: t('types.productLine'),
                typeDocument: t('types.document'),
                typeBrand: t('types.brand'),
              }}
            />
          </Suspense>
        </div>
      </section>
    </>
  );
}
