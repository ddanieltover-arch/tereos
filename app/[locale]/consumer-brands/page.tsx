
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import { FadeIn } from '@/components/animations/fade-in';
import {
  ConsumerBrandsCta,
  ConsumerBrandStats,
  ConsumerBrandsGrid,
} from '@/components/brands/consumer-brands-grid';
import { JsonLd } from '@/components/seo/json-ld';
import { generateBreadcrumbSchema } from '@/lib/seo/schemas';
import { consumerBrandStats, consumerBrands } from '@/lib/content/consumer-brands';
import { TEREOS_PHOTOS } from '@/lib/content/photography';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.consumerBrands' });
  return { title: t('title'), description: t('description') };
}

export default async function ConsumerBrandsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.consumerBrands' });
  const tProducts = await getTranslations({ locale, namespace: 'pages.products' });

  const stats = consumerBrandStats.map((stat) => ({
    value: stat.value,
    label: t(stat.labelKey),
  }));

  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema(locale, [
          { name: tProducts('title'), url: '/products' },
          { name: t('title'), url: '/consumer-brands' },
        ])}
      />
      <PageHero
        eyebrow="Tereos Açúcar e Energia"
        title={t('title')}
        description={t('description')}
        image={TEREOS_PHOTOS.brandSugar}
        dark
      />

      <section className="py-section bg-white">
        <div className="container-custom">
          <FadeIn className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-neutral-600 leading-relaxed mb-4">{t('intro1')}</p>
            <p className="text-neutral-600 leading-relaxed">{t('intro2')}</p>
          </FadeIn>

          <ConsumerBrandStats stats={stats} />

          <FadeIn className="mb-8">
            <h2 className="text-h3 font-bold text-neutral-900">{t('brandsTitle')}</h2>
            <p className="text-neutral-600 mt-2">{t('brandsDescription')}</p>
          </FadeIn>

          <ConsumerBrandsGrid
            brands={consumerBrands}
            labels={{
              highlights: t('highlights'),
            }}
          />

          <ConsumerBrandsCta
            locale={locale}
            title={t('ctaTitle')}
            description={t('ctaDescription')}
            productsLabel={t('ctaProducts')}
            contactLabel={t('ctaContact')}
          />
        </div>
      </section>
    </>
  );
}
