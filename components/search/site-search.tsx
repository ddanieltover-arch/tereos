'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, ExternalLink, Loader2, Search } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { SearchResult, SearchResultType } from '@/lib/search/types';

interface SearchLabels {
  placeholder: string;
  submit: string;
  loading: string;
  resultsFor: string;
  resultCount: string;
  noResults: string;
  emptyPrompt: string;
  error: string;
  rateLimit: string;
  loadMore: string;
  filterAll: string;
  typePage: string;
  typeProduct: string;
  typeNews: string;
  typeDivision: string;
  typeJob: string;
  typeMarket: string;
  typeProductLine: string;
  typeDocument: string;
  typeBrand: string;
}

interface SiteSearchProps {
  locale: string;
  labels: SearchLabels;
}

interface SearchApiResponse {
  success: boolean;
  query: string;
  results: SearchResult[];
  total: number;
  hasMore: boolean;
  message?: string;
}

const FILTER_TYPES: Array<SearchResultType | 'all'> = [
  'all',
  'page',
  'product',
  'news',
  'document',
  'division',
  'market',
  'product-line',
  'brand',
  'job',
];

function formatLabel(template: string, values: Record<string, string>): string {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(new RegExp(`\\{${key}\\}`, 'g'), value),
    template
  );
}

function getTypeLabel(type: SearchResult['type'], labels: SearchLabels): string {
  const map: Record<SearchResult['type'], string> = {
    page: labels.typePage,
    product: labels.typeProduct,
    news: labels.typeNews,
    division: labels.typeDivision,
    job: labels.typeJob,
    market: labels.typeMarket,
    'product-line': labels.typeProductLine,
    document: labels.typeDocument,
    brand: labels.typeBrand,
  };
  return map[type];
}

function isExternalResult(url: string): boolean {
  return url.startsWith('/downloads/') || url.startsWith('http');
}

export function SiteSearch({ locale, labels }: SiteSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') ?? '';
  const typeParam = (searchParams.get('type') as SearchResultType | 'all' | null) ?? 'all';

  const [query, setQuery] = useState(queryParam);
  const [activeQuery, setActiveQuery] = useState(queryParam);
  const [activeType, setActiveType] = useState<SearchResultType | 'all'>(typeParam);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const typeLabels = useMemo(
    () => ({
      all: labels.filterAll,
      page: labels.typePage,
      product: labels.typeProduct,
      news: labels.typeNews,
      document: labels.typeDocument,
      division: labels.typeDivision,
      market: labels.typeMarket,
      'product-line': labels.typeProductLine,
      brand: labels.typeBrand,
      job: labels.typeJob,
    }),
    [labels]
  );

  const fetchResults = useCallback(
    async (searchQuery: string, type: SearchResultType | 'all', nextOffset: number, append: boolean) => {
      const trimmed = searchQuery.trim();
      setActiveQuery(trimmed);
      setActiveType(type);

      if (trimmed.length < 2) {
        setResults([]);
        setTotal(0);
        setHasMore(false);
        setOffset(0);
        setError(null);
        setLoading(false);
        setLoadingMore(false);
        return;
      }

      if (append) setLoadingMore(true);
      else setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          q: trimmed,
          locale,
          type,
          offset: String(nextOffset),
          limit: '30',
        });
        const response = await fetch(`/api/search?${params.toString()}`);

        if (response.status === 429) {
          setResults([]);
          setTotal(0);
          setHasMore(false);
          setError(labels.rateLimit);
          return;
        }

        if (!response.ok) {
          setResults([]);
          setTotal(0);
          setHasMore(false);
          setError(labels.error);
          return;
        }

        const data = (await response.json()) as SearchApiResponse;
        setResults((current) => (append ? [...current, ...(data.results ?? [])] : data.results ?? []));
        setTotal(data.total ?? 0);
        setHasMore(Boolean(data.hasMore));
        setOffset(nextOffset + (data.results?.length ?? 0));
      } catch {
        if (!append) {
          setResults([]);
          setTotal(0);
        }
        setHasMore(false);
        setError(labels.error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [locale, labels.error, labels.rateLimit]
  );

  useEffect(() => {
    setQuery(queryParam);
    setActiveType(typeParam);
    setOffset(0);
    void fetchResults(queryParam, typeParam, 0, false);
  }, [queryParam, typeParam, fetchResults]);

  const updateUrl = (nextQuery: string, nextType: SearchResultType | 'all') => {
    const params = new URLSearchParams();
    if (nextQuery.trim()) params.set('q', nextQuery.trim());
    if (nextType !== 'all') params.set('type', nextType);
    const queryString = params.toString();
    router.replace(`/${locale}/search${queryString ? `?${queryString}` : ''}`, { scroll: false });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUrl(query, activeType);
  };

  const handleTypeChange = (type: SearchResultType | 'all') => {
    updateUrl(query, type);
  };

  const showEmptyPrompt = activeQuery.length < 2 && !loading;
  const showNoResults = activeQuery.length >= 2 && !loading && !error && total === 0;

  return (
    <div>
      <form role="search" onSubmit={handleSubmit} className="mb-8">
        <label htmlFor="site-search" className="sr-only">
          {labels.placeholder}
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none"
              aria-hidden
            />
            <input
              id="site-search"
              type="search"
              name="q"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={labels.placeholder}
              autoComplete="off"
              className="w-full pl-12 pr-4 py-3.5 border border-neutral-200 rounded-full text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition-colors shrink-0"
          >
            {labels.submit}
          </button>
        </div>
      </form>

      {activeQuery.length >= 2 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTER_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleTypeChange(type)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                activeType === type
                  ? 'bg-primary text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              )}
            >
              {typeLabels[type]}
            </button>
          ))}
        </div>
      )}

      <div aria-live="polite" aria-atomic="true">
        {loading && (
          <div className="flex items-center justify-center gap-3 py-16 text-neutral-600">
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden />
            <span>{labels.loading}…</span>
          </div>
        )}

        {error && !loading && <p className="text-center py-12 text-red-600">{error}</p>}

        {showEmptyPrompt && !error && (
          <p className="text-center py-12 text-neutral-600">{labels.emptyPrompt}</p>
        )}

        {showNoResults && (
          <p className="text-center py-12 text-neutral-600">
            {formatLabel(labels.noResults, { query: activeQuery })}
          </p>
        )}

        {!loading && !error && total > 0 && (
          <div>
            <FadeIn>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-neutral-900">
                  {formatLabel(labels.resultsFor, { query: activeQuery })}
                </h2>
                <p className="text-sm text-neutral-500 mt-1">
                  {formatLabel(labels.resultCount, { count: String(total) })}
                </p>
              </div>
            </FadeIn>

            <ul className="space-y-3">
              {results.map((result, index) => {
                const external = isExternalResult(result.url);
                const content = (
                  <>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="muted">{getTypeLabel(result.type, labels)}</Badge>
                        <h3 className="font-semibold text-neutral-900 group-hover:text-primary transition-colors">
                          {result.title}
                        </h3>
                      </div>
                      <p className="text-sm text-neutral-500 line-clamp-2">{result.excerpt}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary shrink-0">
                      {external ? (
                        <ExternalLink className="w-4 h-4" aria-hidden />
                      ) : (
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      )}
                    </span>
                  </>
                );

                return (
                  <FadeIn key={`${result.type}-${result.url}-${index}`} delay={Math.min(index * 0.02, 0.3)}>
                    <li>
                      {external ? (
                        <a
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 rounded-2xl border border-neutral-100 bg-white hover:border-primary/20 hover:shadow-card transition-all"
                        >
                          {content}
                        </a>
                      ) : (
                        <Link
                          href={result.url}
                          className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 rounded-2xl border border-neutral-100 bg-white hover:border-primary/20 hover:shadow-card transition-all"
                        >
                          {content}
                        </Link>
                      )}
                    </li>
                  </FadeIn>
                );
              })}
            </ul>

            {hasMore && (
              <div className="text-center mt-10">
                <Button
                  variant="outline"
                  disabled={loadingMore}
                  onClick={() => void fetchResults(activeQuery, activeType, offset, true)}
                >
                  {loadingMore ? `${labels.loading}…` : labels.loadMore}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
