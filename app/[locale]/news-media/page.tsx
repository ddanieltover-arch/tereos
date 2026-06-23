
import { Metadata } from 'next';
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import { Newsroom } from '@/components/news/newsroom';
import { getAllNews, getDownloadDocuments } from '@/lib/sanity/fetch';
import { parseNewsroomTab } from '@/lib/content/newsroom';
import { fallbackDownloads, fallbackNewsArticles } from '@/lib/content/sprint4';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.news' });
  return { title: t('title'), description: t('description') };
}

export default async function NewsMediaPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { locale } = await params;
  const { tab } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'pages.news' });

  const [cmsNews, cmsDocs] = await Promise.all([
    getAllNews(locale),
    getDownloadDocuments(locale),
  ]);

  const articles = cmsNews ?? fallbackNewsArticles;
  const documents = cmsDocs || fallbackDownloads;

  return (
    <>
      <PageHero eyebrow="Tereos" title={t('title')} description={t('description')} />
      <section className="py-section bg-white">
        <div className="container-custom">
          <Suspense fallback={<div className="h-96 animate-pulse bg-neutral-50 rounded-2xl" />}>
            <Newsroom
              locale={locale}
              articles={articles}
              documents={documents}
              initialTab={parseNewsroomTab(tab)}
              labels={{
                all: t('tabAll'),
                pressReleases: t('tabPressReleases'),
                news: t('tabNews'),
                documents: t('tabDocuments'),
                readMore: t('readMore'),
                download: t('download'),
                noResults: t('noResults'),
                loadMore: t('loadMore'),
                archiveStats: t('statArticles'),
                filterYear: t('filterYear'),
                allYears: t('allYears'),
                statYears: t('statYears'),
                pressContact: t('pressContact'),
                pressContactDescription: t('pressContactDescription'),
                pressEmail: t('pressEmail'),
                pressContactLink: t('pressContactLink'),
                gatedTitle: t('gatedTitle'),
                gatedDescription: t('gatedDescription'),
                email: t('email'),
                submit: t('submit'),
                gatedSuccess: t('gatedSuccess'),
              }}
            />
          </Suspense>
        </div>
      </section>
    </>
  );
}
