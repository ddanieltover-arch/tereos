import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import { FadeIn } from '@/components/animations/fade-in';
import { JsonLd } from '@/components/seo/json-ld';
import { generateBreadcrumbSchema } from '@/lib/seo/schemas';
import { TEREOS_PHOTOS } from '@/lib/content/photography';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.quality' });
  return { title: t('title'), description: t('description') };
}

export default async function QualityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.quality' });
  const tProducts = await getTranslations({ locale, namespace: 'pages.products' });

  const qualityCharterUrl = 'https://tereos.com/app/uploads/2023/08/quality-charter-2023-eng.pdf';
  const qualityDocsUrl = 'https://tereos.com/en/tereos-starch-sweeteners-quality-documents/';

  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema(locale, [
          { name: tProducts('title'), url: '/products' },
          { name: t('title'), url: '/products/quality' },
        ])}
      />
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
        image={TEREOS_PHOTOS.laboratory}
        dark
      />

      <section className="py-section bg-white">
        <div className="container-custom">
          <FadeIn className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-h3 font-bold text-neutral-900 mb-4">{t('commitmentTitle')}</h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Meeting our customers&apos; requirements in product quality and safety, as well as in provided
              services, is one of the strongest commitments of the Tereos Group. Our teams work every day
              to deliver safe products that comply with regulations and quality standards, while continuously
              strengthening hygiene and traceability practices.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12">
            <FadeIn delay={0.1}>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">{t('charterTitle')}</h3>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                Our commitment is formalized through the Tereos Quality Charter and quality golden rules.
                Quality is part of everyone&apos;s daily mission at each stage of process and product lifecycle.
              </p>
              <a
                href={qualityCharterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl border border-neutral-200 hover:border-primary hover:shadow-card transition-all"
              >
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <span className="text-xl">📄</span>
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 group-hover:text-primary transition-colors">
                    Tereos Quality Charter (ENG)
                  </h4>
                  <p className="text-sm text-neutral-500">PDF</p>
                </div>
              </a>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">{t('documentsTitle')}</h3>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                Access Tereos Starch & Sweeteners quality documentation and technical product documents.
              </p>
              <a
                href={qualityDocsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl border border-neutral-200 hover:border-primary hover:shadow-card transition-all"
              >
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <span className="text-lg">📄</span>
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 group-hover:text-primary transition-colors">
                    Tereos Starch &amp; Sweeteners Quality Documents
                  </h4>
                  <p className="text-sm text-neutral-500">Reference page</p>
                </div>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
