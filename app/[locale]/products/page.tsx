
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import { ProductCatalog } from '@/components/products/product-catalog';
import { TaxonomyHub } from '@/components/products/taxonomy-hub';
import { getAllProducts } from '@/lib/sanity/fetch';
import { fallbackProducts } from '@/lib/content/pages';
import { markets, productLines } from '@/lib/content/taxonomy';
import { rawMaterials } from '@/lib/content/raw-materials';
import { RawMaterialsGrid } from '@/components/products/raw-materials-sections';
import { FadeIn } from '@/components/animations/fade-in';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.products' });
  return { title: t('title'), description: t('description') };
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; market?: string; line?: string }>;
}) {
  const { locale } = await params;
  const { category, market, line } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'pages.products' });

  const cmsProducts = await getAllProducts(locale);
  const categorySlugMap: Record<string, string> = {
    Sugar: 'sugar',
    Bioenergy: 'bioenergy',
    Agriculture: 'agriculture',
    'Food Ingredients': 'food-ingredients',
    'Renewable Solutions': 'renewable',
  };
  const products =
    cmsProducts?.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      description: p.description,
      category: categorySlugMap[p.category] || p.category.toLowerCase(),
      categoryLabel: p.category,
      image: p.image,
    })) || fallbackProducts;

  return (
    <>
      <PageHero eyebrow="Tereos" title={t('title')} description={t('description')} />

      {/* Raw Materials Section */}
      <section className="py-section-sm bg-white">
        <div className="container-custom">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-h3 font-bold text-neutral-900">{t('rawMaterialsTitle')}</h2>
                <p className="text-neutral-600 mt-2 max-w-2xl">{t('rawMaterialsDescription')}</p>
              </div>
            </div>
          </FadeIn>
          <RawMaterialsGrid
            materials={rawMaterials.slice(0, 3)}
            locale={locale}
            learnMoreLabel={t('learnMore')}
          />
        </div>
      </section>

      <TaxonomyHub
        locale={locale}
        type="markets"
        items={markets}
        compact
        labels={{
          title: t('marketsTitle'),
          description: t('marketsDescription'),
          viewAll: t('viewAllMarkets'),
          learnMore: t('learnMore'),
        }}
      />
      <TaxonomyHub
        locale={locale}
        type="product-lines"
        items={productLines}
        compact
        labels={{
          title: t('productLinesTitle'),
          description: t('productLinesDescription'),
          viewAll: t('viewAllProductLines'),
          learnMore: t('learnMore'),
        }}
      />
      <section className="py-section bg-white">
        <div className="container-custom">
          <h2 className="text-h3 font-bold text-neutral-900 mb-8">{t('catalogTitle')}</h2>
          <ProductCatalog
            locale={locale}
            products={products}
            initialCategory={category || 'all'}
            initialMarket={market}
            initialLine={line}
            labels={{
              search: t('search'),
              all: t('all'),
              learnMore: t('learnMore'),
              noResults: t('noResults'),
            }}
          />
        </div>
      </section>
    </>
  );
}
