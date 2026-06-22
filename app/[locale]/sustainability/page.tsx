
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import { ESGDashboard } from '@/components/sustainability/esg-dashboard';
import { esgTabs } from '@/lib/content/pages';
import { getDocumentFileUrl, SUSTAINABILITY_REPORT_LINKS } from '@/lib/content/documents';
import { TEREOS_PHOTOS } from '@/lib/content/photography';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.sustainability' });
  return { title: t('title'), description: t('description') };
}

export default async function SustainabilityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.sustainability' });

  const sustainabilityReports = SUSTAINABILITY_REPORT_LINKS.map((report) => ({
    title: report.title,
    year: report.year,
    fileUrl: getDocumentFileUrl(report.documentId),
  }));

  return (
    <>
      <PageHero
        eyebrow="ESG"
        title={t('title')}
        description={t('description')}
        image={TEREOS_PHOTOS.sustainability}
      />
      <section className="py-section bg-white">
        <div className="container-custom">
          <ESGDashboard
            tabs={esgTabs}
            reports={sustainabilityReports}
            labels={{
              reports: t('reports'),
              target: t('target'),
              download: t('download'),
            }}
          />
        </div>
      </section>
    </>
  );
}
