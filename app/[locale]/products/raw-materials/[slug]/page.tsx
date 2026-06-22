
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import {
  RawMaterialKeyFigures,
  RawMaterialProcess,
  RawMaterialApplications,
  RawMaterialsCarousel,
} from '@/components/products/raw-materials-sections';
import { FadeIn } from '@/components/animations/fade-in';
import { JsonLd } from '@/components/seo/json-ld';
import { generateBreadcrumbSchema } from '@/lib/seo/schemas';
import {
  RAW_MATERIAL_SLUGS,
  getRawMaterial,
  getOtherRawMaterials,
} from '@/lib/content/raw-materials';

export function generateStaticParams() {
  return RAW_MATERIAL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const material = getRawMaterial(slug);
  if (!material) return {};
  const t = await getTranslations({ locale, namespace: 'pages.rawMaterials' });
  return {
    title: `${material.title} — ${t('title')}`,
    description: material.description,
  };
}

export default async function RawMaterialDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const material = getRawMaterial(slug);
  if (!material) notFound();

  const others = getOtherRawMaterials(slug);
  const t = await getTranslations({ locale, namespace: 'pages.rawMaterials' });
  const tProducts = await getTranslations({ locale, namespace: 'pages.products' });

  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema(locale, [
          { name: tProducts('title'), url: '/products' },
          { name: t('title'), url: '/products/raw-materials' },
          { name: material.title, url: `/products/raw-materials/${slug}` },
        ])}
      />
      <PageHero
        eyebrow={t('eyebrow')}
        title={material.title}
        description={material.subtitle}
        image={material.image}
        dark
      />

      {/* Intro + Key Figures */}
      <section className="py-section bg-white">
        <div className="container-custom">
          <FadeIn className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-neutral-600 leading-relaxed text-lg">{material.intro}</p>
          </FadeIn>
          <RawMaterialKeyFigures figures={material.keyFigures} />
        </div>
      </section>

      {/* Process Steps */}
      <RawMaterialProcess
        title={material.processTitle}
        description={material.processDescription}
        steps={material.processSteps}
      />

      {/* Applications */}
      <RawMaterialApplications
        applications={material.applications}
        label={t('applications')}
      />

      {/* Other Raw Materials Carousel */}
      <RawMaterialsCarousel
        materials={others}
        locale={locale}
        label={t('discoverOthers')}
        learnMoreLabel={t('learnMore')}
      />

      {/* Back link */}
      <section className="py-8 bg-white border-t border-neutral-100">
        <div className="container-custom flex flex-wrap gap-4 text-sm">
          <Link
            href={`/${locale}/products/raw-materials`}
            className="text-primary font-medium hover:underline"
          >
            ← {t('title')}
          </Link>
          <span className="text-neutral-300">|</span>
          <Link
            href={`/${locale}/products`}
            className="text-neutral-600 hover:text-primary"
          >
            {tProducts('title')}
          </Link>
        </div>
      </section>
    </>
  );
}
