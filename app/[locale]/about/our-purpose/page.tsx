
import { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import {
  PurposeManifesto,
  PurposePillarsSection,
  PurposeSignature,
} from '@/components/about/purpose-sections';
import type { PurposePillar } from '@/components/about/purpose-sections';
import { JsonLd } from '@/components/seo/json-ld';
import { generateBreadcrumbSchema } from '@/lib/seo/schemas';
import { TEREOS_PHOTOS } from '@/lib/content/photography';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.purpose' });
  return { title: t('title'), description: t('description') };
}

export default async function OurPurposePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.purpose' });
  const tAbout = await getTranslations({ locale, namespace: 'pages.about' });

  const pillars: PurposePillar[] = [
    {
      title: t('pillarCultivating'),
      description: t('pillarCultivatingDesc'),
      icon: '🌾',
      gradient: 'from-green-600 to-emerald-700',
    },
    {
      title: t('pillarEarthPeople'),
      description: t('pillarEarthPeopleDesc'),
      icon: '🌍',
      gradient: 'from-blue-600 to-indigo-700',
    },
    {
      title: t('pillarDailyNeeds'),
      description: t('pillarDailyNeedsDesc'),
      icon: '🍞',
      gradient: 'from-amber-500 to-orange-600',
    },
  ];

  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema(locale, [
          { name: tAbout('title'), url: '/about' },
          { name: t('title'), url: '/about/our-purpose' },
        ])}
      />
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('heroDescription')}
        image={TEREOS_PHOTOS.field}
        dark
      />

      {/* Manifesto */}
      <PurposeManifesto text={t('manifesto')} />

      {/* Purpose Pillars */}
      <PurposePillarsSection pillars={pillars} label={t('pillarsLabel')} />

      {/* Signature */}
      <PurposeSignature
        signature={t('signature')}
        description={t('signatureDescription')}
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
          <span className="text-neutral-300">|</span>
          <Link
            href={`/${locale}/about/strategy`}
            className="text-neutral-600 hover:text-primary"
          >
            {t('strategyLink')}
          </Link>
        </div>
      </section>
    </>
  );
}
