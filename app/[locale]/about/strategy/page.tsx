
import { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import { FadeIn } from '@/components/animations/fade-in';
import {
  StrategySectionsGrid,
  CircularEconomyBanner,
  StrategyRelatedPages,
} from '@/components/about/strategy-sections';
import { JsonLd } from '@/components/seo/json-ld';
import { generateBreadcrumbSchema } from '@/lib/seo/schemas';
import {
  strategyIntro,
  strategySections,
  circularEconomyStats,
} from '@/lib/content/strategy';
import { TEREOS_PHOTOS } from '@/lib/content/photography';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.strategy' });
  return { title: t('title'), description: t('description') };
}

export default async function StrategyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.strategy' });
  const tAbout = await getTranslations({ locale, namespace: 'pages.about' });

  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema(locale, [
          { name: tAbout('title'), url: '/about' },
          { name: t('title'), url: '/about/strategy' },
        ])}
      />
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('heroDescription')}
        image={TEREOS_PHOTOS.factory}
        dark
      />

      {/* Intro */}
      <section className="py-section bg-white">
        <div className="container-custom">
          <FadeIn className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-neutral-600 leading-relaxed">
              {strategyIntro}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Strategy Sections */}
      <StrategySectionsGrid sections={strategySections} />

      {/* Circular Economy Banner */}
      <CircularEconomyBanner
        stats={circularEconomyStats}
        title={t('circularTitle')}
      />

      {/* Related Pages */}
      <StrategyRelatedPages
        label={t('relatedLabel')}
        pages={[
          {
            title: t('relatedHistory'),
            description: t('relatedHistoryDesc'),
            href: `/${locale}/about/history`,
          },
          {
            title: t('relatedInnovation'),
            description: t('relatedInnovationDesc'),
            href: `/${locale}/innovation`,
          },
        ]}
      />

      {/* Back link */}
      <section className="py-8 bg-neutral-50 border-t border-neutral-100">
        <div className="container-custom flex flex-wrap gap-4 text-sm">
          <Link
            href={`/${locale}/about`}
            className="text-primary font-medium hover:underline"
          >
            ← {tAbout('title')}
          </Link>
        </div>
      </section>
    </>
  );
}
