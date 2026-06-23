
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import { WorldMap } from '@/components/global/world-map';
import { globalLocations } from '@/lib/content/sprint4';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.global' });
  return { title: t('title'), description: t('description') };
}

export default async function GlobalPresencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.global' });

  return (
    <>
      <PageHero eyebrow="Tereos" title={t('title')} description={t('description')} />
      <section className="py-section bg-white">
        <div className="container-custom">
          <WorldMap
            locations={globalLocations}
            labels={{
              offices: t('offices'),
              facilities: t('facilities'),
              partners: t('partners'),
              countries: t('countries'),
              selectLocation: t('selectLocation'),
              filterAll: t('filterAll'),
              typeOffice: t('typeOffice'),
              typeFacility: t('typeFacility'),
              typePartner: t('typePartner'),
            }}
          />
        </div>
      </section>
    </>
  );
}
