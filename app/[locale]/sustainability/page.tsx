
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import { ESGDashboard } from '@/components/sustainability/esg-dashboard';
import { FadeIn } from '@/components/animations/fade-in';
import { esgTabs } from '@/lib/content/pages';
import {
  sustainabilityDocuments,
  sustainabilityIntro,
  sustainabilityPillars,
} from '@/lib/content/sustainability';
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
      <section className="py-section bg-white border-b border-neutral-100">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <h2 className="text-h2 font-bold text-neutral-900 mb-6">{t('introTitle')}</h2>
            <p className="text-body-lg text-neutral-600 leading-relaxed mb-6">{sustainabilityIntro.description}</p>
            <p className="text-neutral-600 leading-relaxed">{sustainabilityIntro.governanceNote}</p>
          </FadeIn>
        </div>
      </section>

      <section className="py-section bg-neutral-50">
        <div className="container-custom">
          <FadeIn className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-h3 font-bold text-neutral-900">{t('pillarsTitle')}</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {sustainabilityPillars.map((pillar, index) => (
              <FadeIn key={pillar.title} delay={index * 0.05}>
                <div className="p-6 bg-white rounded-2xl border border-neutral-100 h-full">
                  <h3 className="font-bold text-neutral-900 mb-3">{pillar.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{pillar.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-10 flex flex-wrap gap-4 justify-center">
            {sustainabilityDocuments.map((doc) => (
              <a
                key={doc.url}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {t('download')} — {doc.title}
              </a>
            ))}
          </FadeIn>
        </div>
      </section>

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
