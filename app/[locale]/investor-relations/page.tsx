
import { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/shared/page-hero';
import { IrSectionNav } from '@/components/investor/ir-section-nav';
import { DocumentLibrary } from '@/components/downloads/document-library';
import { FadeIn } from '@/components/animations/fade-in';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { buildDocumentLibraryLabels } from '@/lib/downloads/document-library-labels';
import { IR_SECTIONS } from '@/lib/content/investor';
import {
  DOCUMENT_CATEGORY_LABELS,
  getIrDocuments,
} from '@/lib/investor/documents';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.ir' });
  return { title: t('title'), description: t('description') };
}

export default async function InvestorRelationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.ir' });
  const irDocs = await getIrDocuments(locale);

  const sections = IR_SECTIONS.map((section) => ({
    ...section,
    external: section.slug === 'governance',
    title: t(`sections.${section.slug}.title`),
    description: t(`sections.${section.slug}.description`),
  }));

  return (
    <>
      <PageHero
        eyebrow="Tereos Açúcar e Energia"
        title={t('title')}
        description={t('description')}
        dark
      />

      <section className="py-section bg-white border-b border-neutral-100">
        <div className="container-custom">
          <FadeIn className="grid md:grid-cols-3 gap-6">
            {[
              { value: '€5B+', label: t('statRevenue') },
              { value: '40+', label: t('statCountries') },
              { value: '25K+', label: t('statEmployees') },
            ].map((stat) => (
              <div key={stat.label} className="p-6 bg-neutral-50 rounded-2xl text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-neutral-500 mt-2">{stat.label}</p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      <IrSectionNav
        locale={locale}
        sections={sections}
        title={t('sectionsTitle')}
        description={t('sectionsDescription')}
        learnMore={t('learnMore')}
      />

      <section className="py-section bg-white">
        <div className="container-custom">
          <h2 className="text-h3 font-bold text-neutral-900 mb-2">{t('documentsTitle')}</h2>
          <p className="text-neutral-600 mb-10 max-w-2xl">{t('documentsDescription')}</p>

          <DocumentLibrary
            documents={irDocs}
            categoryLabels={DOCUMENT_CATEGORY_LABELS}
            filterMode="financial"
            syncUrlParams
            labels={buildDocumentLibraryLabels(t, { includeFinancial: true })}
          />
        </div>
      </section>

      <section className="py-section bg-neutral-50">
        <div className="container-custom text-center">
          <FadeIn>
            <h2 className="text-h3 font-bold text-neutral-900 mb-4">{t('contactTitle')}</h2>
            <p className="text-neutral-600 mb-8 max-w-xl mx-auto">{t('contactDescription')}</p>
            <Link href={`/${locale}/contact`} className={cn(buttonVariants({ variant: 'primary' }))}>
              {t('contactCta')} <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
