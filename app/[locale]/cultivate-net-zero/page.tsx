
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import { FadeIn } from '@/components/animations/fade-in';
import {
  SolutionsGrid,
  InvestmentHighlights,
  FarmerProgramsSection,
  SbtiBadgeSection,
  CultivateNetZeroCta,
} from '@/components/sustainability/cultivate-net-zero-sections';
import { JsonLd } from '@/components/seo/json-ld';
import { generateBreadcrumbSchema } from '@/lib/seo/schemas';
import {
  cultivateNetZeroIntro,
  solutions,
  investmentHighlights,
  farmerPrograms,
  sbtiBadge,
} from '@/lib/content/cultivate-net-zero';
import { TEREOS_PHOTOS } from '@/lib/content/photography';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.cultivateNetZero' });
  return { title: t('title'), description: t('description') };
}

export default async function CultivateNetZeroPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.cultivateNetZero' });

  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema(locale, [
          { name: t('title'), url: '/cultivate-net-zero' },
        ])}
      />
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('heroDescription')}
        image={TEREOS_PHOTOS.sustainability}
        dark
      />

      {/* Intro */}
      <section className="py-section bg-white">
        <div className="container-custom">
          <FadeIn className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-neutral-600 leading-relaxed">
              {cultivateNetZeroIntro}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 3 Solutions */}
      <SolutionsGrid solutions={solutions} label={t('solutionsTitle')} />

      {/* SBTi Badge */}
      <SbtiBadgeSection
        title={sbtiBadge.title}
        description={sbtiBadge.description}
        certification={sbtiBadge.certification}
      />

      {/* Investment Highlights */}
      <InvestmentHighlights
        targets={investmentHighlights}
        title={t('investmentTitle')}
        description={t('investmentDescription')}
      />

      {/* Farmer Programs */}
      <FarmerProgramsSection
        programs={farmerPrograms}
        title={t('farmerTitle')}
        description={t('farmerDescription')}
      />

      {/* CTA */}
      <CultivateNetZeroCta
        locale={locale}
        title={t('ctaTitle')}
        sustainabilityLabel={t('ctaSustainability')}
        contactLabel={t('ctaContact')}
      />
    </>
  );
}
