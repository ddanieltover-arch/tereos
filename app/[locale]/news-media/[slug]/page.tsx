
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft, Calendar, User, Download } from 'lucide-react';
import { PageHero } from '@/components/shared/page-hero';
import { FadeIn } from '@/components/animations/fade-in';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getAllNews, getNewsBySlug } from '@/lib/sanity/fetch';
import { getNewsArchiveSlugs } from '@/lib/content/news-archive';
import { getPressReleasePdfUrl } from '@/lib/content/documents';
import { fallbackNewsArticles } from '@/lib/content/sprint4';
import { JsonLd } from '@/components/seo/json-ld';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo/schemas';
import { absoluteUrl } from '@/lib/site';

export async function generateStaticParams() {
  return getNewsArchiveSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const cms = await getNewsBySlug(locale, slug);
  const fallback = fallbackNewsArticles.find((a) => a.slug === slug);
  const title = cms?.title || fallback?.title;
  if (!title) return { title: 'Article Not Found' };
  return { title, description: cms?.excerpt || fallback?.excerpt };
}

function formatDate(date: string, locale: string) {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.news' });

  const cms = await getNewsBySlug(locale, slug);
  const fallback = fallbackNewsArticles.find((a) => a.slug === slug);
  if (!cms && !fallback) notFound();

  const article = {
    title: cms?.title || fallback!.title,
    excerpt: cms?.excerpt || fallback!.excerpt,
    content: cms?.content || fallback?.content || cms?.excerpt || fallback!.excerpt,
    image: cms?.image || fallback!.image,
    category: cms?.category || fallback!.category,
    publishedAt: cms?.publishedAt || fallback!.publishedAt,
    author: cms?.author || fallback?.author,
    pdfUrl: cms?.pdfUrl || fallback?.pdfUrl || getPressReleasePdfUrl(slug),
  };

  const related = (await getAllNews(locale)) ?? fallbackNewsArticles;
  const moreNews = related.filter((a) => a.slug !== slug).slice(0, 3);
  const articleUrl = absoluteUrl(`/news-media/${slug}`, locale);

  return (
    <>
      <JsonLd
        data={[
          generateArticleSchema({
            title: article.title,
            description: article.excerpt,
            image: article.image,
            publishedAt: article.publishedAt,
            author: article.author,
            url: articleUrl,
          }),
          generateBreadcrumbSchema(locale, [
            { name: t('title'), url: '/news-media' },
            { name: article.title, url: `/news-media/${slug}` },
          ]),
        ]}
      />
      <PageHero title={article.title} image={article.image} dark />

      <section className="py-section bg-white">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-neutral-500">
              <Badge variant="secondary">{article.category}</Badge>
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(article.publishedAt, locale)}
              </span>
              {article.author && (
                <span className="inline-flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {article.author}
                </span>
              )}
            </div>

            <p className="text-body-lg text-neutral-600 leading-relaxed mb-8 font-medium">
              {article.excerpt}
            </p>

            <div className="prose prose-neutral max-w-none">
              {article.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-neutral-600 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {article.pdfUrl && (
              <a
                href={article.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: 'primary' }), 'mt-8 inline-flex')}
              >
                <Download className="w-4 h-4" />
                {t('downloadPdf')}
              </a>
            )}

            <Link
              href={`/${locale}/news-media`}
              className={cn(buttonVariants({ variant: 'outline' }), 'mt-8')}
            >
              <ArrowLeft className="w-4 h-4" />
              {t('backToNews')}
            </Link>
          </FadeIn>
        </div>
      </section>

      {moreNews.length > 0 && (
        <section className="py-section bg-neutral-50">
          <div className="container-custom">
            <h2 className="text-h3 font-bold text-neutral-900 mb-8">{t('related')}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {moreNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/${locale}/news-media/${item.slug}`}
                  className="group bg-white rounded-xl border overflow-hidden hover:shadow-card transition-all"
                >
                  <div className="relative h-40">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
