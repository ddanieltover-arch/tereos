
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { TaxonomyHub } from '@/components/products/taxonomy-hub';
import { PageHero } from '@/components/shared/page-hero';
import { productLines } from '@/lib/content/taxonomy';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.products' });
  return { title: t('productLinesIndexTitle'), description: t('productLinesIndexDescription') };
}

export default async function ProductLinesIndexPage({
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
        title={t('productLinesIndexTitle')}
        description={t('productLinesIndexDescription')}
      />
      <TaxonomyHub
        locale={locale}
        type="product-lines"
        items={productLines}
        labels={{
          title: t('productLinesTitle'),
          description: t('productLinesDescription'),
          viewAll: t('viewAllProductLines'),
          learnMore: t('learnMore'),
        }}
      />
    </>
  );
}
