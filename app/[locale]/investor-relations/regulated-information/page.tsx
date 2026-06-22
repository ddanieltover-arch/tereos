
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import { RegulatedInfoView } from '@/components/investor/regulated-info-view';
import { regulatedInfoBlocks } from '@/lib/content/investor';
import { getIrDocuments } from '@/lib/investor/documents';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.ir.regulatedInfo' });
  return { title: t('title'), description: t('description') };
}

export default async function RegulatedInformationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.ir' });
  const tPage = await getTranslations({ locale, namespace: 'pages.ir.regulatedInfo' });

  const documents = await getIrDocuments(locale);

  const blocks = {
    periodic: { title: tPage('periodicTitle'), description: tPage('periodicDescription') },
    insideInformation: {
      title: tPage('insideInformationTitle'),
      description: tPage('insideInformationDescription'),
    },
    shareholderMeetings: {
      title: tPage('shareholderMeetingsTitle'),
      description: tPage('shareholderMeetingsDescription'),
    },
    governance: { title: tPage('governanceTitle'), description: tPage('governanceDescription') },
    debtInvestors: {
      title: tPage('debtInvestorsTitle'),
      description: tPage('debtInvestorsDescription'),
    },
  };

  return (
    <>
      <PageHero
        eyebrow={t('title')}
        title={tPage('title')}
        description={tPage('description')}
        dark
      />

      <RegulatedInfoView
        locale={locale}
        blocks={regulatedInfoBlocks}
        documents={documents}
        labels={{
          backLabel: t('backToIr'),
          backHref: `/${locale}/investor-relations`,
          viewPage: tPage('viewPage'),
          blocks,
        }}
      />
    </>
  );
}
