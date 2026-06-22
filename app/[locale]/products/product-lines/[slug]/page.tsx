
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { TaxonomyTemplate } from '@/components/products/taxonomy-template';
import { JsonLd } from '@/components/seo/json-ld';
import { generateBreadcrumbSchema } from '@/lib/seo/schemas';
import {
  getMarketsForProductLine,
  getProductLine,
  PRODUCT_LINE_SLUGS,
} from '@/lib/content/taxonomy';

const DIVISION_LABEL_KEYS: Record<string, string> = {
  sugar: 'navBusiness.sugar',
  bioenergy: 'navBusiness.bioenergy',
  agriculture: 'navBusiness.agriculture',
  'food-ingredients': 'navBusiness.food',
  'renewable-solutions': 'navBusiness.renewable',
};

export function generateStaticParams() {
  return PRODUCT_LINE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const line = getProductLine(slug);
  if (!line) return { title: 'Product Line Not Found' };
  return { title: line.title, description: line.description };
}

export default async function ProductLinePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const line = getProductLine(slug);
  if (!line) notFound();

  const t = await getTranslations({ locale, namespace: 'pages.products' });
  const navT = await getTranslations({ locale, namespace: 'navigation' });
  const relatedMarkets = getMarketsForProductLine(line.slug);
  const relatedDivisions = line.divisionSlugs.map((divSlug) => ({
    slug: divSlug,
    title: navT(DIVISION_LABEL_KEYS[divSlug] ?? divSlug),
  }));

  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema(locale, [
          { name: t('title'), url: '/products' },
          { name: t('productLinesIndexTitle'), url: '/products/product-lines' },
          { name: line.title, url: `/products/product-lines/${slug}` },
        ])}
      />
      <TaxonomyTemplate
        locale={locale}
        type="product-line"
        page={line}
        relatedMarkets={relatedMarkets}
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
