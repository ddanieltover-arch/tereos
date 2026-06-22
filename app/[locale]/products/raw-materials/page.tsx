
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import { RawMaterialsGrid } from '@/components/products/raw-materials-sections';
import { FadeIn } from '@/components/animations/fade-in';
import { JsonLd } from '@/components/seo/json-ld';
import { generateBreadcrumbSchema } from '@/lib/seo/schemas';
import { rawMaterials } from '@/lib/content/raw-materials';
import { TEREOS_PHOTOS } from '@/lib/content/photography';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.rawMaterials' });
  return { title: t('title'), description: t('description') };
}

export default async function RawMaterialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.rawMaterials' });
  const tProducts = await getTranslations({ locale, namespace: 'pages.products' });

  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema(locale, [
          { name: tProducts('title'), url: '/products' },
          { name: t('title'), url: '/products/raw-materials' },
        ])}
      />
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
        image={TEREOS_PHOTOS.agriculture}
        dark
      />

      <section className="py-section bg-white">
        <div className="container-custom">
          <FadeIn className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-neutral-600 leading-relaxed">{t('intro')}</p>
          </FadeIn>

          <RawMaterialsGrid
            materials={rawMaterials}
            locale={locale}
            learnMoreLabel={t('learnMore')}
          />
        </div>
      </section>
    </>
  );
}
