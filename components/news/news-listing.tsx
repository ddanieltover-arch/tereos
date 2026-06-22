'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { NewsArticle } from '@/types';

interface NewsListingProps {
  locale: string;
  articles: NewsArticle[];
  labels: {
    all: string;
    readMore: string;
    noResults: string;
  };
}

function formatDate(date: string, locale: string) {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function NewsListing({ locale, articles, labels }: NewsListingProps) {
  const categories = useMemo(
    () => ['all', ...Array.from(new Set(articles.map((a) => a.category)))],
    [articles]
  );
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => {
    if (category === 'all') return articles;
    return articles.filter((a) => a.category === category);
  }, [articles, category]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              category === cat
                ? 'bg-primary text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            )}
          >
            {cat === 'all' ? labels.all : cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-neutral-500 text-center py-16">{labels.noResults}</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((article, i) => (
            <FadeIn key={article.id} delay={i * 0.05}>
              <article className="group flex flex-col h-full bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-card-hover transition-all">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">{article.category}</Badge>
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(article.publishedAt, locale)}
                  </div>
                  <h2 className="text-h4 font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-4 line-clamp-3 flex-1">
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/${locale}/news-media/${article.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
                  >
                    {labels.readMore} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
