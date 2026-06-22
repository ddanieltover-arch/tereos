import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { LegalDocumentPage } from '@/components/legal/legal-document';
import { getLegalRelatedLinks } from '@/lib/content/legal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.credits' });
  return { title: t('title'), description: t('description') };
}

export default async function CreditsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.credits' });
  const tLegal = await getTranslations({ locale, namespace: 'pages.legal' });

  // For the Credits page, we construct the document structure here since it's simple
  // and doesn't warrant full localized arrays in the content files.
  const document = {
    title: t('title'),
    description: t('description'),
    lastUpdated: 'February 2024',
    contactLabel: tLegal('needHelp'),
    contactEmail: 'contact@tereosa.com',
    sections: [
      {
        id: 'conception',
        title: t('conceptionTitle'),
        paragraphs: [
          'This website was conceived and developed as part of Tereos Açúcar e Energia S.A. digital transformation initiatives.',
        ],
      },
      {
        id: 'hosting',
        title: t('hostingTitle'),
        paragraphs: [
          'This website is hosted on modern cloud infrastructure to ensure high availability, performance, and security across all regions.',
        ],
      },
      {
        id: 'copyright',
        title: t('copyrightTitle'),
        paragraphs: [
          'All content, images, and brand materials are the property of Tereos Açúcar e Energia S.A. and may not be reproduced without explicit permission.',
        ],
      },
    ],
  };

  return (
    <LegalDocumentPage
      locale={locale}
      document={document}
      relatedLinks={getLegalRelatedLinks(locale, 'terms')} // Use terms' related links as fallback
      relatedLabel={tLegal('relatedDocuments')}
      tableOfContentsLabel={tLegal('tableOfContents')}
      needHelpLabel={tLegal('needHelp')}
    />
  );
}
