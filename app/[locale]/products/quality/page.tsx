import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import { FadeIn } from '@/components/animations/fade-in';
import { JsonLd } from '@/components/seo/json-ld';
import { generateBreadcrumbSchema } from '@/lib/seo/schemas';
import { TEREOS_PHOTOS } from '@/lib/content/photography';
import { getAllDownloadDocuments } from '@/lib/investor/documents';

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

  // For demonstration, fetch some documents (e.g., ESG or generic documents to act as quality docs)
  const allDocs = await getAllDownloadDocuments(locale);
  const esgDocs = allDocs.filter(d => d.category === 'esg');
  const qualityDocs = esgDocs.slice(0, 3); // Simulating quality documents

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
              Food safety and product quality are paramount to Tereos operations. 
              Our facilities operate under stringent quality management systems and are certified 
              against internationally recognized standards to ensure the highest level of safety, 
              hygiene, and traceability for our customers worldwide.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12">
            <FadeIn delay={0.1}>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">{t('charterTitle')}</h3>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                The Tereos Quality Charter outlines our fundamental commitments across the value chain, 
                from agricultural raw materials to the final product delivered to our customers.
              </p>
              {qualityDocs[0] && (
                <a
                  href={qualityDocs[0].fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl border border-neutral-200 hover:border-primary hover:shadow-card transition-all"
                >
                  <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <span className="text-xl">📄</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 group-hover:text-primary transition-colors">
                      {qualityDocs[0].title}
                    </h4>
                    <p className="text-sm text-neutral-500">PDF · {qualityDocs[0].fileSize}</p>
                  </div>
                </a>
              )}
            </FadeIn>

            <FadeIn delay={0.2}>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">{t('documentsTitle')}</h3>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                Access our detailed quality certificates, product declarations, and compliance 
                documentation for our starch, sweeteners, and alcohol product lines.
              </p>
              <div className="space-y-4">
                {qualityDocs.slice(1).map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 rounded-xl border border-neutral-200 hover:border-primary hover:shadow-card transition-all"
                  >
                    <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <span className="text-lg">📄</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 group-hover:text-primary transition-colors">
                        {doc.title}
                      </h4>
                      <p className="text-sm text-neutral-500">PDF · {doc.fileSize}</p>
                    </div>
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
