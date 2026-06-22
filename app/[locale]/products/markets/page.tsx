
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { TaxonomyHub } from '@/components/products/taxonomy-hub';
import { PageHero } from '@/components/shared/page-hero';
import { markets } from '@/lib/content/taxonomy';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.products' });
  return { title: t('marketsIndexTitle'), description: t('marketsIndexDescription') };
}

export default async function MarketsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.products' });

  return (
    <>
      <PageHero
        eyebrow="Tereos Açúcar e Energia"
        title={t('marketsIndexTitle')}
        description={t('marketsIndexDescription')}
      />
      <TaxonomyHub
        locale={locale}
        type="markets"
        items={markets}
        labels={{
          title: t('marketsTitle'),
          description: t('marketsDescription'),
          viewAll: t('viewAllMarkets'),
          learnMore: t('learnMore'),
        }}
      />
    </>
  );
}
