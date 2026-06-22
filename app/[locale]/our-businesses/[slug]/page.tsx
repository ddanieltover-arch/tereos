
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { DivisionTemplate } from '@/components/businesses/division-template';
import { divisionExtras } from '@/lib/content/pages';
import { getDivisionBySlug } from '@/lib/sanity/fetch';

const SLUGS = ['sugar', 'bioenergy', 'agriculture', 'food-ingredients', 'renewable-solutions'] as const;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const division = await getDivisionBySlug(locale, slug);
  const extras = divisionExtras[slug];
  if (!division && !extras) return { title: 'Not Found' };
  return { title: division?.title || slug };
}

export default async function DivisionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const extras = divisionExtras[slug];
  if (!extras) notFound();

  const cms = await getDivisionBySlug(locale, slug);
  const t = await getTranslations({ locale, namespace: 'pages.businesses' });

  return (
    <DivisionTemplate
      locale={locale}
      title={cms?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
      description={cms?.description || extras.capabilities.join('. ')}
      tagline={cms?.tagline}
      image={cms?.image || extras.image}
      extras={extras}
      labels={{
        markets: t('markets'),
        capabilities: t('capabilities'),
        impact: t('impact'),
        products: t('viewProducts'),
        back: t('backToBusinesses'),
      }}
    />
  );
}
