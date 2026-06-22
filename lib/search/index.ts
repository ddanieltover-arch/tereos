import { consumerBrands } from '@/lib/content/consumer-brands';
import { getFallbackDownloadDocuments } from '@/lib/content/documents';
import { getNewsArchive } from '@/lib/content/news-archive';
import { divisionExtras, fallbackProducts } from '@/lib/content/pages';
import { markets, productLines } from '@/lib/content/taxonomy';
import { fallbackJobs, innovationProjects } from '@/lib/content/sprint4';
import { getSearchMessage } from '@/lib/search/i18n';
import type { SearchIndexEntry, SearchOptions, SearchResponse, SearchResultType } from '@/lib/search/types';

export type { SearchIndexEntry, SearchOptions, SearchResponse, SearchResult, SearchResultType } from '@/lib/search/types';

const DIVISION_NAV_KEYS: Record<string, { title: string; business: string }> = {
  sugar: { title: 'navigation.navBusiness.sugar', business: 'home.businesses.sugar' },
  bioenergy: { title: 'navigation.navBusiness.bioenergy', business: 'home.businesses.bioenergy' },
  agriculture: { title: 'navigation.navBusiness.agriculture', business: 'home.businesses.agriculture' },
  'food-ingredients': { title: 'navigation.navBusiness.food', business: 'home.businesses.food' },
  'renewable-solutions': {
    title: 'navigation.navBusiness.renewable',
    business: 'home.businesses.renewable',
  },
};

interface StaticPageDef {
  path: string;
  titleKey: string;
  excerptKey: string;
}

const STATIC_PAGES: StaticPageDef[] = [
  { path: '', titleKey: 'navigation.home', excerptKey: 'metadata.description' },
  { path: '/about', titleKey: 'pages.about.title', excerptKey: 'navigation.navDesc.about' },
  { path: '/about/governance', titleKey: 'pages.governance.title', excerptKey: 'navigation.navDesc.governance' },
  { path: '/our-businesses', titleKey: 'pages.businesses.title', excerptKey: 'navigation.navDesc.businessesOverview' },
  { path: '/products', titleKey: 'pages.products.title', excerptKey: 'navigation.navDesc.products' },
  { path: '/products/markets', titleKey: 'pages.products.marketsTitle', excerptKey: 'navigation.navDesc.marketsOverview' },
  {
    path: '/products/product-lines',
    titleKey: 'pages.products.productLinesTitle',
    excerptKey: 'navigation.navDesc.productLinesOverview',
  },
  { path: '/consumer-brands', titleKey: 'pages.consumerBrands.title', excerptKey: 'navigation.navDesc.consumerBrands' },
  { path: '/sustainability', titleKey: 'pages.sustainability.title', excerptKey: 'navigation.navFeatured.sustainability.description' },
  { path: '/investor-relations', titleKey: 'pages.ir.title', excerptKey: 'pages.ir.description' },
  {
    path: '/investor-relations/annual-results',
    titleKey: 'pages.ir.annualResults.title',
    excerptKey: 'navigation.navDesc.annualResults',
  },
  {
    path: '/investor-relations/regulated-information',
    titleKey: 'pages.ir.regulatedInfo.title',
    excerptKey: 'navigation.navDesc.regulatedInfo',
  },
  {
    path: '/investor-relations/financial-calendar',
    titleKey: 'pages.ir.financialCalendar.title',
    excerptKey: 'navigation.navDesc.financialCalendar',
  },
  {
    path: '/investor-relations/presentations',
    titleKey: 'pages.ir.presentations.title',
    excerptKey: 'navigation.navDesc.irPresentations',
  },
  { path: '/news-media', titleKey: 'pages.news.title', excerptKey: 'navigation.navDesc.news' },
  { path: '/press-contact', titleKey: 'pages.pressContact.title', excerptKey: 'navigation.navDesc.pressContact' },
  { path: '/careers', titleKey: 'pages.careers.title', excerptKey: 'pages.careers.description' },
  { path: '/global-presence', titleKey: 'pages.global.title', excerptKey: 'navigation.navDesc.global' },
  { path: '/innovation', titleKey: 'pages.innovation.title', excerptKey: 'navigation.navDesc.innovation' },
  { path: '/download-center', titleKey: 'pages.downloads.title', excerptKey: 'pages.downloads.description' },
  { path: '/contact', titleKey: 'pages.contact.title', excerptKey: 'pages.contact.description' },
  { path: '/search', titleKey: 'pages.search.title', excerptKey: 'pages.search.description' },
  { path: '/sitemap', titleKey: 'pages.sitemap.title', excerptKey: 'pages.sitemap.description' },
  { path: '/legal/privacy', titleKey: 'pages.legal.privacy', excerptKey: 'pages.legal.privacy' },
  { path: '/legal/cookies', titleKey: 'pages.legal.cookies', excerptKey: 'pages.legal.cookies' },
  { path: '/legal/terms', titleKey: 'pages.legal.terms', excerptKey: 'pages.legal.terms' },
  {
    path: '/legal/accessibility',
    titleKey: 'pages.accessibility.title',
    excerptKey: 'pages.accessibility.description',
  },
];

function localizeLabelKey(locale: string, labelKey: string, englishFallback: string): string {
  return getSearchMessage(locale, `navigation.${labelKey}`, englishFallback);
}

function tokenize(query: string): string[] {
  return query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((token) => token.length >= 2);
}

function scoreEntry(entry: SearchIndexEntry, tokens: string[]): number {
  if (tokens.length === 0) return 0;

  const title = entry.title.toLowerCase();
  const excerpt = entry.excerpt.toLowerCase();
  const keywords = (entry.keywords ?? '').toLowerCase();
  const haystack = `${title} ${excerpt} ${keywords}`;

  let score = 0;

  for (const token of tokens) {
    if (title === token) score += 120;
    else if (title.startsWith(token)) score += 80;
    else if (title.includes(token)) score += 45;
    else if (excerpt.includes(token)) score += 20;
    else if (keywords.includes(token)) score += 12;
    else if (haystack.includes(token)) score += 8;
  }

  return score;
}

export function buildSearchIndex(locale: string): SearchIndexEntry[] {
  const pages: SearchIndexEntry[] = STATIC_PAGES.map((page) => ({
    type: 'page',
    title: getSearchMessage(locale, page.titleKey, page.path || 'Home'),
    url: page.path || '/',
    excerpt: getSearchMessage(locale, page.excerptKey, ''),
    keywords: page.path,
  }));

  const products: SearchIndexEntry[] = fallbackProducts.map((product) => ({
    type: 'product',
    title: product.name,
    url: `/products/${product.slug}`,
    excerpt: product.description,
    keywords: `${product.category} ${product.slug}`,
  }));

  const news: SearchIndexEntry[] = getNewsArchive().map((article) => ({
    type: 'news',
    title: article.title,
    url: `/news-media/${article.slug}`,
    excerpt: article.excerpt,
    keywords: `${article.category} ${article.newsroomType} ${article.author ?? ''}`,
  }));

  const divisions: SearchIndexEntry[] = Object.entries(divisionExtras).map(([slug, division]) => {
    const keys = DIVISION_NAV_KEYS[slug];
    const title = keys
      ? getSearchMessage(locale, keys.title, slug)
      : slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const description = keys
      ? getSearchMessage(locale, `${keys.business}.description`, '')
      : '';
    return {
      type: 'division',
      title,
      url: `/our-businesses/${slug}`,
      excerpt: description,
      keywords: [slug, ...division.markets, ...division.capabilities].join(' '),
    };
  });

  const marketResults: SearchIndexEntry[] = markets.map((market) => ({
    type: 'market',
    title: localizeLabelKey(locale, market.labelKey, market.title),
    url: `/products/markets/${market.slug}`,
    excerpt: market.description,
    keywords: [market.title, market.intro, ...market.highlights].join(' '),
  }));

  const productLineResults: SearchIndexEntry[] = productLines.map((line) => ({
    type: 'product-line',
    title: localizeLabelKey(locale, line.labelKey, line.title),
    url: `/products/product-lines/${line.slug}`,
    excerpt: line.description,
    keywords: [line.title, line.intro, ...line.highlights].join(' '),
  }));

  const jobs: SearchIndexEntry[] = fallbackJobs.map((job) => ({
    type: 'job',
    title: job.title,
    url: '/careers',
    excerpt: job.description,
    keywords: `${job.department} ${job.location} ${job.type}`,
  }));

  const documents: SearchIndexEntry[] = getFallbackDownloadDocuments().map((doc) => ({
    type: 'document',
    title: doc.title,
    url: doc.fileUrl.startsWith('/downloads/') ? doc.fileUrl : '/download-center',
    excerpt: `${doc.category.replace(/-/g, ' ')} · ${doc.year}${doc.fileSize ? ` · ${doc.fileSize}` : ''}`,
    keywords: `${doc.category} ${doc.language} ${doc.year}`,
  }));

  const brands: SearchIndexEntry[] = consumerBrands.map((brand) => ({
    type: 'brand',
    title: brand.name,
    url: '/consumer-brands',
    excerpt: brand.description,
    keywords: `${brand.region} ${brand.tagline} ${brand.highlights.join(' ')}`,
  }));

  const innovation: SearchIndexEntry[] = innovationProjects.map((project) => ({
    type: 'page',
    title: project.title,
    url: '/innovation',
    excerpt: project.description,
    keywords: `${project.category} innovation research`,
  }));

  return [
    ...pages,
    ...products,
    ...news,
    ...divisions,
    ...jobs,
    ...marketResults,
    ...productLineResults,
    ...documents,
    ...brands,
    ...innovation,
  ];
}

export function searchContent(
  query: string,
  locale = 'en',
  options: SearchOptions = {}
): SearchResponse {
  const tokens = tokenize(query);
  const { type = 'all', limit = 30, offset = 0 } = options;

  if (tokens.length === 0) {
    return { query: query.trim(), results: [], total: 0, hasMore: false };
  }

  const ranked = buildSearchIndex(locale)
    .map((entry) => ({ ...entry, score: scoreEntry(entry, tokens) }))
    .filter((entry) => entry.score > 0)
    .filter((entry) => type === 'all' || entry.type === type)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  const total = ranked.length;
  const results = ranked.slice(offset, offset + limit);

  return {
    query: query.trim(),
    results,
    total,
    hasMore: offset + limit < total,
  };
}

/** @deprecated Use searchContent(query, locale) */
export function buildSearchIndexLegacy(): SearchIndexEntry[] {
  return buildSearchIndex('en');
}
