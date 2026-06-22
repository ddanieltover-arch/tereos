import type { MetadataRoute } from 'next';
import { divisionExtras, fallbackProducts } from '@/lib/content/pages';
import { MARKET_SLUGS, PRODUCT_LINE_SLUGS } from '@/lib/content/taxonomy';
import { fallbackNewsArticles } from '@/lib/content/sprint4';
import { locales } from '@/lib/i18n/config';
import { getSitemapSlugs } from '@/lib/sanity/fetch';
import { getSiteUrl } from '@/lib/site';

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  { path: '', changeFrequency: 'daily', priority: 1.0 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/about/governance', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/our-businesses', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/products', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/products/markets', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/products/product-lines', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/consumer-brands', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/sustainability', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/investor-relations', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/investor-relations/annual-results', changeFrequency: 'weekly', priority: 0.75 },
  { path: '/investor-relations/regulated-information', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/investor-relations/financial-calendar', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/investor-relations/presentations', changeFrequency: 'monthly', priority: 0.65 },
  { path: '/news-media', changeFrequency: 'daily', priority: 0.9 },
  { path: '/press-contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/careers', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/global-presence', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/innovation', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/download-center', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/search', changeFrequency: 'monthly', priority: 0.4 },
  { path: '/sitemap', changeFrequency: 'monthly', priority: 0.3 },
  { path: '/legal/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/legal/cookies', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/legal/terms', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/legal/accessibility', changeFrequency: 'yearly', priority: 0.3 },
];

function getFallbackSlugs() {
  return {
    products: fallbackProducts.map((p) => p.slug),
    news: fallbackNewsArticles.map((a) => ({
      slug: a.slug,
      publishedAt: a.publishedAt,
    })),
    divisions: Object.keys(divisionExtras),
  };
}

export async function buildSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const cmsSlugs = await getSitemapSlugs();
  const fallbacks = getFallbackSlugs();

  const productSlugs = cmsSlugs?.products?.length
    ? cmsSlugs.products
    : fallbacks.products;
  const newsSlugs = cmsSlugs?.news?.length ? cmsSlugs.news : fallbacks.news;
  const divisionSlugs = cmsSlugs?.divisions?.length
    ? cmsSlugs.divisions
    : fallbacks.divisions;

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of STATIC_ROUTES) {
      entries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }

    for (const slug of divisionSlugs) {
      entries.push({
        url: `${baseUrl}/${locale}/our-businesses/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }

    for (const slug of productSlugs) {
      entries.push({
        url: `${baseUrl}/${locale}/products/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }

    for (const slug of MARKET_SLUGS) {
      entries.push({
        url: `${baseUrl}/${locale}/products/markets/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.65,
      });
    }

    for (const slug of PRODUCT_LINE_SLUGS) {
      entries.push({
        url: `${baseUrl}/${locale}/products/product-lines/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.65,
      });
    }

    for (const article of newsSlugs) {
      entries.push({
        url: `${baseUrl}/${locale}/news-media/${article.slug}`,
        lastModified: article.publishedAt ? new Date(article.publishedAt) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
