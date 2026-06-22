
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { LegalDocumentPage } from '@/components/legal/legal-document';
import { getLegalDocument, getLegalRelatedLinks } from '@/lib/content/legal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = getLegalDocument(locale, 'terms');
  return { title: doc.title, description: doc.description };
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.legal' });
  const document = getLegalDocument(locale, 'terms');

  return (
    <LegalDocumentPage
      locale={locale}
      document={document}
      relatedLinks={getLegalRelatedLinks(locale, 'terms')}
      relatedLabel={t('relatedDocuments')}
      tableOfContentsLabel={t('tableOfContents')}
      needHelpLabel={t('needHelp')}
    />
  );
}
