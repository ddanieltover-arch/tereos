import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import { FadeIn } from '@/components/animations/fade-in';
import {
  InnovationPriorityHighlights,
  InnovationPriorityStats,
  InnovationPrioritiesCarousel,
} from '@/components/innovation/innovation-detail';
import { JsonLd } from '@/components/seo/json-ld';
import { generateBreadcrumbSchema } from '@/lib/seo/schemas';
import {
  INNOVATION_PRIORITY_SLUGS,
  getInnovationPriority,
  getOtherPriorities,
} from '@/lib/content/innovation-priorities';

export function generateStaticParams() {
  return INNOVATION_PRIORITY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const priority = getInnovationPriority(slug);
  if (!priority) return {};
  const t = await getTranslations({ locale, namespace: 'pages.innovationPriority' });
  return {
    title: `${priority.title} — ${t('title')}`,
    description: priority.description,
  };
}

export default async function InnovationPriorityDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const priority = getInnovationPriority(slug);
  if (!priority) notFound();

  const others = getOtherPriorities(slug);
  const t = await getTranslations({ locale, namespace: 'pages.innovationPriority' });
  const tInnovation = await getTranslations({ locale, namespace: 'pages.innovation' });

  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema(locale, [
          { name: tInnovation('title'), url: '/innovation' },
          { name: priority.title, url: `/innovation/${slug}` },
        ])}
      />
      <PageHero
        eyebrow={t('eyebrow')}
        title={priority.title}
        description={priority.description}
        image={priority.image}
        dark
      />

      <section className="py-section bg-white">
        <div className="container-custom">
          <FadeIn className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-lg text-neutral-600 leading-relaxed">{priority.intro}</p>
          </FadeIn>
          <InnovationPriorityStats stats={priority.stats} />
        </div>
      </section>

      <InnovationPriorityHighlights highlights={priority.highlights} label={t('keyHighlights')} />

      {/* Other Priorities Carousel */}
      <InnovationPrioritiesCarousel
        priorities={others}
        locale={locale}
        label={t('discoverOthers')}
        learnMoreLabel={t('learnMore')}
      />

      {/* Back link */}
      <section className="py-8 bg-neutral-50 border-t border-neutral-100">
        <div className="container-custom flex flex-wrap gap-4 text-sm">
          <Link
            href={`/${locale}/innovation`}
            className="text-primary font-medium hover:underline"
          >
            ← {t('backToInnovation')}
          </Link>
        </div>
      </section>
    </>
  );
}
