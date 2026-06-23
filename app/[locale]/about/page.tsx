
import { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { AboutSections } from '@/components/about/about-sections';
import { GroupOverview } from '@/components/about/group-overview';
import { PageHero } from '@/components/shared/page-hero';
import { FadeIn } from '@/components/animations/fade-in';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  aboutManifesto,
  aboutPurposeStatement,
  aboutSignature,
  aboutPurposePillars,
  aboutHistoryIntro,
  aboutTimelineSections,
} from '@/lib/content/about';
import { TEREOS_PHOTOS } from '@/lib/content/photography';
import { PAGE_EYEBROW } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.about' });
  return { title: t('title'), description: t('description') };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.about' });

  return (
    <>
      <PageHero
        eyebrow={PAGE_EYEBROW}
        title={t('title')}
        description={t('heroDescription')}
        image={TEREOS_PHOTOS.field}
      />
      <GroupOverview
        labels={{
          environment: t('groupEnvironment'),
          partner: t('groupPartner'),
          agriculture: t('groupAgriculture'),
        }}
      />
      <AboutSections
        manifesto={aboutManifesto}
        purposeStatement={aboutPurposeStatement}
        signature={aboutSignature}
        purposePillars={aboutPurposePillars}
        historyIntro={aboutHistoryIntro}
        timelineSections={aboutTimelineSections}
        labels={{
          purpose: t('purpose'),
          manifesto: t('manifesto'),
          purposeStatement: t('purposeStatementLabel'),
          signature: t('signatureLabel'),
          purposePillars: t('purposePillars'),
          history: t('history'),
        }}
      />
      <section className="py-section bg-neutral-50 border-t border-neutral-100">
        <div className="container-custom text-center">
          <FadeIn>
            <p className="text-neutral-600 mb-6 max-w-xl mx-auto">
              {t('governanceCtaDescription')}
            </p>
            <Link
              href={`/${locale}/about/governance`}
              className={cn(buttonVariants({ variant: 'primary' }))}
            >
              {t('governanceLink')}
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
