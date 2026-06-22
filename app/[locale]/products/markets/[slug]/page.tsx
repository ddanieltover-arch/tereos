
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { TaxonomyTemplate } from '@/components/products/taxonomy-template';
import { JsonLd } from '@/components/seo/json-ld';
import { generateBreadcrumbSchema } from '@/lib/seo/schemas';
import {
  getMarket,
  getProductLinesForMarket,
  MARKET_SLUGS,
} from '@/lib/content/taxonomy';

const DIVISION_LABEL_KEYS: Record<string, string> = {
  sugar: 'navBusiness.sugar',
  bioenergy: 'navBusiness.bioenergy',
  agriculture: 'navBusiness.agriculture',
  'food-ingredients': 'navBusiness.food',
  'renewable-solutions': 'navBusiness.renewable',
};

export function generateStaticParams() {
  return MARKET_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const market = getMarket(slug);
  if (!market) return { title: 'Market Not Found' };
  return { title: market.title, description: market.description };
}

export default async function MarketPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const market = getMarket(slug);
  if (!market) notFound();

  const t = await getTranslations({ locale, namespace: 'pages.products' });
  const navT = await getTranslations({ locale, namespace: 'navigation' });
  const relatedProductLines = getProductLinesForMarket(market.slug);
  const relatedDivisions = market.divisionSlugs.map((divSlug) => ({
    slug: divSlug,
    title: navT(DIVISION_LABEL_KEYS[divSlug] ?? divSlug),
  }));

  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema(locale, [
          { name: t('title'), url: '/products' },
          { name: t('marketsIndexTitle'), url: '/products/markets' },
          { name: market.title, url: `/products/markets/${slug}` },
        ])}
      />
      <TaxonomyTemplate
        locale={locale}
        type="market"
        page={market}
        relatedProductLines={relatedProductLines}
        relatedDivisions={relatedDivisions}
        labels={{
          highlights: t('highlights'),
          productLines: t('productLinesTitle'),
          markets: t('marketsTitle'),
          products: t('catalogTitle'),
          divisions: t('relatedDivisions'),
          contactTitle: t('contactTitle'),
          contactButton: t('contactCta'),
          viewAllProducts: t('viewFilteredProducts'),
          backToProducts: t('backToCatalog'),
          learnMore: t('learnMore'),
        }}
      />
    </>
  );
}
