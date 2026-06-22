
import { NextRequest, NextResponse } from 'next/server';
import { getClientIp, rateLimit } from '@/lib/api/rate-limit';
import { searchContent, type SearchResultType } from '@/lib/search/index';

const VALID_TYPES = new Set<SearchResultType | 'all'>([
  'all',
  'page',
  'product',
  'news',
  'division',
  'job',
  'market',
  'product-line',
  'document',
  'brand',
]);

function localizeResultUrl(url: string, locale: string): string {
  if (url.startsWith('/downloads/') || url.startsWith('http')) {
    return url;
  }
  return `/${locale}${url === '/' ? '' : url}`;
}

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const limit = rateLimit(`search:${ip}`, { limit: 60, windowMs: 60 * 1000 });

  if (!limit.success) {
    return NextResponse.json(
      { success: false, message: 'Rate limit exceeded', results: [], total: 0, hasMore: false },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const locale = searchParams.get('locale') || 'en';
  const typeParam = searchParams.get('type') || 'all';
  const type = VALID_TYPES.has(typeParam as SearchResultType | 'all')
    ? (typeParam as SearchResultType | 'all')
    : 'all';
  const offset = Math.max(0, Number(searchParams.get('offset') || 0));
  const pageLimit = Math.min(Math.max(Number(searchParams.get('limit') || 30), 1), 100);

  if (!query || query.length < 2) {
    return NextResponse.json({
      success: true,
      query,
      results: [],
      total: 0,
      hasMore: false,
    });
  }

  const search = searchContent(query, locale, { type, limit: pageLimit, offset });
  const results = search.results.map((item) => ({
    ...item,
    url: localizeResultUrl(item.url, locale),
  }));

  return NextResponse.json({
    success: true,
    query: search.query,
    results,
    total: search.total,
    hasMore: search.hasMore,
  });
}
