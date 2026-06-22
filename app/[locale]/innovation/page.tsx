
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import { InnovationGrid, InnovationStats } from '@/components/innovation/innovation-grid';
import { InnovationPriorityTiles } from '@/components/innovation/innovation-detail';
import { FadeIn } from '@/components/animations/fade-in';
import { innovationProjects } from '@/lib/content/sprint4';
import { innovationPriorities } from '@/lib/content/innovation-priorities';
import { TEREOS_PHOTOS } from '@/lib/content/photography';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.innovation' });
  return { title: t('title'), description: t('description') };
}

export default async function InnovationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.innovation' });

  const stats = [
    { value: '€80M+', label: t('statRd') },
    { value: '200+', label: t('statResearchers') },
    { value: '15', label: t('statPatents') },
    { value: '12', label: t('statPartners') },
  ];

  return (
    <>
      <PageHero
        eyebrow="Tereos Açúcar e Energia"
        title={t('title')}
        description={t('description')}
        image={TEREOS_PHOTOS.innovation}
        dark
      />

      <section className="py-section bg-white">
        <div className="container-custom">
          <FadeIn className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-h3 font-bold text-neutral-900 mb-4">{t('overviewTitle')}</h2>
            <p className="text-neutral-600 leading-relaxed">{t('overviewDescription')}</p>
          </FadeIn>

          <InnovationStats stats={stats} />

          <div className="mt-12">
            <InnovationPriorityTiles
              priorities={innovationPriorities}
              locale={locale}
              label={t('prioritiesTitle')}
              learnMoreLabel={t('learnMore')}
            />
          </div>

          <h2 className="text-h3 font-bold text-neutral-900 mb-8 mt-16">{t('projectsTitle')}</h2>
          <InnovationGrid projects={innovationProjects} />
        </div>
      </section>
    </>
  );
}
