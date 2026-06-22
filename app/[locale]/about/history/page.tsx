
import { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import { FadeIn } from '@/components/animations/fade-in';
import { HistoryTimeline } from '@/components/about/history-timeline';
import { JsonLd } from '@/components/seo/json-ld';
import { generateBreadcrumbSchema } from '@/lib/seo/schemas';
import { historyIntroText, timelineSections } from '@/lib/content/history';
import { TEREOS_PHOTOS } from '@/lib/content/photography';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.history' });
  return { title: t('title'), description: t('description') };
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.history' });
  const tAbout = await getTranslations({ locale, namespace: 'pages.about' });

  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema(locale, [
          { name: tAbout('title'), url: '/about' },
          { name: t('title'), url: '/about/history' },
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
              {historyIntroText}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Timeline */}
      <HistoryTimeline sections={timelineSections} />

      {/* Back link */}
      <section className="py-8 bg-white border-t border-neutral-100">
        <div className="container-custom flex flex-wrap gap-4 text-sm">
          <Link
            href={`/${locale}/about`}
            className="text-primary font-medium hover:underline"
          >
            ← {tAbout('title')}
          </Link>
          <span className="text-neutral-300">|</span>
          <Link
            href={`/${locale}/about/strategy`}
            className="text-neutral-600 hover:text-primary"
          >
            Strategy
          </Link>
        </div>
      </section>
    </>
  );
}
