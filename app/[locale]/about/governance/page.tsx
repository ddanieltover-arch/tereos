
import { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import { GovernanceSections } from '@/components/governance/governance-sections';
import { JsonLd } from '@/components/seo/json-ld';
import { generateBreadcrumbSchema } from '@/lib/seo/schemas';
import {
  advisoryCommissions,
  advisoryCouncilIntro,
  boardChairman,
  boardCommittees,
  boardDirectors,
  boardIntro,
  governanceIntro,
  managementCommittee,
  managementIntro,
  regionalGovernanceIntro,
} from '@/lib/content/governance';
import { TEREOS_PHOTOS } from '@/lib/content/photography';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.governance' });
  return { title: t('title'), description: t('description') };
}

export default async function GovernancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.governance' });
  const tAbout = await getTranslations({ locale, namespace: 'pages.about' });

  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema(locale, [
          { name: tAbout('title'), url: '/about' },
          { name: t('title'), url: '/about/governance' },
        ])}
      />
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
        image={TEREOS_PHOTOS.campus}
        dark
      />
      <GovernanceSections
        locale={locale}
        intro={governanceIntro}
        boardIntro={boardIntro}
        boardChairman={boardChairman}
        boardDirectors={boardDirectors}
        boardCommittees={boardCommittees}
        advisoryCouncilIntro={advisoryCouncilIntro}
        advisoryCommissions={advisoryCommissions}
        regionalGovernanceIntro={regionalGovernanceIntro}
        managementIntro={managementIntro}
        managementCommittee={managementCommittee}
        labels={{
          overview: t('overview'),
          board: t('board'),
          committees: t('committees'),
          advisoryCouncil: t('advisoryCouncil'),
          commissions: t('commissions'),
          regional: t('regional'),
          management: t('management'),
          viewBio: t('viewBio'),
          backToAbout: t('backToAbout'),
          responsibilities: t('responsibilities'),
        }}
      />
      <section className="py-8 bg-neutral-50 border-t border-neutral-100">
        <div className="container-custom flex flex-wrap gap-4 text-sm">
          <Link href={`/${locale}/about`} className="text-primary font-medium hover:underline">
            ← {tAbout('title')}
          </Link>
          <span className="text-neutral-300">|</span>
          <Link href={`/${locale}/investor-relations`} className="text-neutral-600 hover:text-primary">
            {t('irLink')}
          </Link>
        </div>
      </section>
    </>
  );
}
