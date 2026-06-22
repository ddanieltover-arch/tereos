'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, ArrowRight, Download, FileText, Mail } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from '@/components/ui/modal';
import {
  filterArticlesByTab,
  filterNewsroomDocuments,
  NEWSROOM_DOCUMENT_TYPE_LABELS,
  type NewsroomTab,
  parseNewsroomTab,
} from '@/lib/content/newsroom';
import { filterArticlesByYear, getNewsArchiveStats } from '@/lib/content/news-archive';
import { cn } from '@/lib/utils';
import type { DownloadDocument, NewsArticle } from '@/types';

const PAGE_SIZE = 12;

interface NewsroomProps {
  locale: string;
  articles: NewsArticle[];
  documents: DownloadDocument[];
  initialTab?: NewsroomTab;
  labels: {
    all: string;
    pressReleases: string;
    news: string;
    documents: string;
    readMore: string;
    download: string;
    noResults: string;
    loadMore: string;
    pressContact: string;
    pressContactDescription: string;
    pressEmail: string;
    pressContactLink: string;
    gatedTitle: string;
    gatedDescription: string;
    email: string;
    submit: string;
    gatedSuccess: string;
    archiveStats: string;
    filterYear: string;
    allYears: string;
    statYears: string;
  };
}

function formatDate(date: string, locale: string) {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function ArticleGrid({
  articles,
  locale,
  readMoreLabel,
  downloadLabel,
}: {
  articles: NewsArticle[];
  locale: string;
  readMoreLabel: string;
  downloadLabel: string;
}) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article, i) => (
        <FadeIn key={article.id} delay={i * 0.05}>
          <article className="group flex flex-col h-full bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-card-hover transition-all">
            <div className="relative h-52 overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <Badge variant="secondary">{article.category}</Badge>
                <Badge variant="outline" className="bg-white/90">
                  {article.newsroomType === 'press-release' ? 'Press Release' : 'News'}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col flex-1 p-6">
              <div className="flex items-center gap-2 text-xs text-neutral-600 mb-3">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(article.publishedAt, locale)}
              </div>
              <h2 className="text-h4 font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-3 flex-1">
                {article.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-auto">
                <Link
                  href={`/${locale}/news-media/${article.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
                >
                  {readMoreLabel} <ArrowRight className="w-4 h-4" />
                </Link>
                {article.pdfUrl && article.newsroomType === 'press-release' && (
                  <a
                    href={article.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-700 hover:text-primary transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    {downloadLabel}
                  </a>
                )}
              </div>
            </div>
          </article>
        </FadeIn>
      ))}
    </div>
  );
}

export function Newsroom({
  locale,
  articles,
  documents,
  initialTab = 'all',
  labels,
}: NewsroomProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabFromUrl = parseNewsroomTab(searchParams.get('tab') || initialTab);
  const yearFromUrl = searchParams.get('year') ?? 'all';

  const [activeTab, setActiveTab] = useState<NewsroomTab>(tabFromUrl);
  const [year, setYear] = useState(yearFromUrl);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [gatedDoc, setGatedDoc] = useState<DownloadDocument | null>(null);
  const [email, setEmail] = useState('');
  const [gatedSubmitted, setGatedSubmitted] = useState(false);

  useEffect(() => {
    setActiveTab(tabFromUrl);
    setYear(yearFromUrl);
    setVisibleCount(PAGE_SIZE);
  }, [tabFromUrl, yearFromUrl]);

  const archiveStats = useMemo(() => getNewsArchiveStats(articles), [articles]);

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (!value || value === 'all') params.delete(key);
      else params.set(key, value);
    }
    const query = params.toString();
    router.replace(`/${locale}/news-media${query ? `?${query}` : ''}`, { scroll: false });
  };

  const newsroomDocs = useMemo(() => filterNewsroomDocuments(documents), [documents]);

  const tabs: { id: NewsroomTab; label: string }[] = [
    { id: 'all', label: labels.all },
    { id: 'press-releases', label: labels.pressReleases },
    { id: 'news', label: labels.news },
    { id: 'documents', label: labels.documents },
  ];

  const filteredArticles = useMemo(() => {
    const byTab = filterArticlesByTab(articles, activeTab);
    return filterArticlesByYear(byTab, year);
  }, [articles, activeTab, year]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const visibleDocuments = newsroomDocs.slice(0, visibleCount);
  const hasMoreArticles =
    activeTab !== 'documents' && visibleCount < filteredArticles.length;
  const hasMoreDocuments =
    activeTab === 'documents' && visibleCount < newsroomDocs.length;

  const handleTabChange = (tab: NewsroomTab) => {
    setActiveTab(tab);
    setVisibleCount(PAGE_SIZE);
    updateSearchParams({ tab: tab === 'all' ? null : tab });
  };

  const handleYearChange = (value: string) => {
    setYear(value);
    setVisibleCount(PAGE_SIZE);
    updateSearchParams({ year: value === 'all' ? null : value });
  };

  const handleDownload = (doc: DownloadDocument) => {
    if (doc.gated) {
      setGatedDoc(doc);
      setGatedSubmitted(false);
      setEmail('');
      return;
    }
    if (doc.fileUrl && doc.fileUrl !== '#') {
      window.open(doc.fileUrl, '_blank');
    }
  };

  const handleGatedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gatedDoc) return;
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Download',
        lastName: 'Request',
        email,
        department: 'media',
        subject: `Document request: ${gatedDoc.title}`,
        message: `Please send "${gatedDoc.title}" (${gatedDoc.year}) to ${email}.`,
      }),
    });
    setGatedSubmitted(true);
    if (gatedDoc.fileUrl && gatedDoc.fileUrl !== '#') {
      window.open(gatedDoc.fileUrl, '_blank');
    }
  };

  const isEmpty =
    activeTab === 'documents' ? newsroomDocs.length === 0 : filteredArticles.length === 0;

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { value: archiveStats.total, label: labels.archiveStats },
          { value: archiveStats.pressReleases, label: labels.pressReleases },
          { value: archiveStats.news, label: labels.news },
          { value: archiveStats.years.length, label: labels.statYears },
        ].map((stat) => (
          <div key={stat.label} className="p-4 bg-neutral-50 rounded-2xl text-center">
            <p className="text-2xl font-bold text-primary">{stat.value}</p>
            <p className="text-xs text-neutral-600 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mb-10 border-b border-neutral-200 pb-4">
        <div className="flex flex-wrap gap-2 flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'px-5 py-2.5 text-sm font-semibold rounded-full transition-colors',
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-neutral-600 hover:bg-neutral-100'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab !== 'documents' && archiveStats.years.length > 0 && (
          <select
            value={year}
            onChange={(e) => handleYearChange(e.target.value)}
            aria-label={labels.filterYear}
            className="px-4 py-2.5 rounded-full text-sm border border-neutral-200 bg-white focus:outline-none focus:border-primary lg:ml-auto"
          >
            <option value="all">{labels.allYears}</option>
            {archiveStats.years.map((y) => (
              <option key={y} value={String(y)}>
                {y}
              </option>
            ))}
          </select>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {isEmpty ? (
            <p className="text-neutral-500 text-center py-16">{labels.noResults}</p>
          ) : activeTab === 'documents' ? (
            <div className="space-y-4">
              {visibleDocuments.map((doc, i) => (
                <FadeIn key={doc.id} delay={i * 0.03}>
                  <article className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 bg-white rounded-2xl border border-neutral-100 hover:shadow-card transition-all">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-neutral-50 flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-neutral-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant="secondary">
                            {NEWSROOM_DOCUMENT_TYPE_LABELS[doc.category] || doc.category}
                          </Badge>
                          <span className="text-xs text-neutral-500">{doc.year}</span>
                          {doc.fileSize && (
                            <span className="text-xs text-neutral-500">· {doc.fileSize}</span>
                          )}
                        </div>
                        <h3 className="font-bold text-neutral-900">{doc.title}</h3>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                      onClick={() => handleDownload(doc)}
                    >
                      <Download className="w-4 h-4" />
                      {labels.download}
                    </Button>
                  </article>
                </FadeIn>
              ))}
            </div>
          ) : (
            <ArticleGrid
              articles={visibleArticles}
              locale={locale}
              readMoreLabel={labels.readMore}
              downloadLabel={labels.download}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {(hasMoreArticles || hasMoreDocuments) && (
        <div className="text-center mt-12">
          <Button variant="outline" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
            {labels.loadMore}
          </Button>
        </div>
      )}

      <FadeIn className="mt-16 p-8 bg-neutral-50 rounded-2xl border border-neutral-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h3 className="font-bold text-neutral-900 mb-1">{labels.pressContact}</h3>
          <p className="text-sm text-neutral-500">{labels.pressContactDescription}</p>
          <a
            href={`mailto:${labels.pressEmail}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline mt-3"
          >
            <Mail className="w-4 h-4" aria-hidden />
            {labels.pressEmail}
          </a>
        </div>
        <Link
          href={`/${locale}/press-contact`}
          className={cn(buttonVariants({ variant: 'primary' }), 'shrink-0 inline-flex items-center gap-2')}
        >
          {labels.pressContactLink}
          <ArrowRight className="w-4 h-4" aria-hidden />
        </Link>
      </FadeIn>

      <Modal open={!!gatedDoc} onOpenChange={(open) => !open && setGatedDoc(null)}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{labels.gatedTitle}</ModalTitle>
            <ModalDescription>{labels.gatedDescription}</ModalDescription>
          </ModalHeader>
          {gatedSubmitted ? (
            <p className="text-primary font-medium py-4">{labels.gatedSuccess}</p>
          ) : (
            <form onSubmit={handleGatedSubmit} className="space-y-4">
              <input
                type="email"
                required
                placeholder={labels.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary"
              />
              <Button type="submit" variant="primary" className="w-full">
                {labels.submit}
              </Button>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
