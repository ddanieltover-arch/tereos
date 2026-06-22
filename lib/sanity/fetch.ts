import type { BusinessCard, DownloadDocument, NewsArticle, Product } from '@/types';
import { getDocumentFileUrl, getPressReleasePdfUrl } from '@/lib/content/documents';
import { enrichDownloadDocument } from '@/lib/investor/document-filters';
import { getNewsArchive } from '@/lib/content/news-archive';
import { resolveNewsroomType } from '@/lib/content/newsroom';
import { unstable_cache } from 'next/cache';
import { sanityClient } from './client';
import { isSanityConfigured } from './config';
import { localizedField } from './locale';
import {
  allNewsArticlesQuery,
  allDivisionSlugsQuery,
  allNewsSlugsQuery,
  allProductSlugsQuery,
  allProductsQuery,
  businessDivisionsQuery,
  divisionBySlugQuery,
  downloadDocumentsQuery,
  featuredProductsQuery,
  latestNewsQuery,
  newsArticleBySlugQuery,
  productBySlugQuery,
} from './queries';

const CATEGORY_LABELS: Record<string, string> = {
  'press-release': 'Press Release',
  announcement: 'Announcement',
  news: 'News',
  media: 'Media',
  sustainability: 'Sustainability',
  investor: 'Investor',
  community: 'Community',
};

const PRODUCT_CATEGORY_LABELS: Record<string, string> = {
  sugar: 'Sugar',
  bioenergy: 'Bioenergy',
  agriculture: 'Agriculture',
  'food-ingredients': 'Food Ingredients',
  renewable: 'Renewable Solutions',
};

interface SanityBusinessDivision {
  _id: string;
  slug: { current: string };
  title: string;
  description: string;
  image?: string;
}

interface SanityProduct {
  _id: string;
  slug: { current: string };
  name: string;
  description: string;
  category: string;
  image?: string;
}

interface SanityNewsArticle {
  _id: string;
  slug: { current: string };
  title: string;
  excerpt: string;
  body?: string;
  category: string;
  publishedAt: string;
  image?: string;
  author?: string;
  pdfUrl?: string;
}

function getSlug(slug: { current: string } | string): string {
  return typeof slug === 'string' ? slug : slug.current;
}

export async function getBusinessDivisions(
  locale: string
): Promise<BusinessCard[] | null> {
  if (!isSanityConfigured()) return null;

  try {
    const field = localizedField(locale);
    const divisions = await sanityClient.fetch<SanityBusinessDivision[]>(
      businessDivisionsQuery,
      { locale: field }
    );

    if (!divisions?.length) return null;

    return divisions.map((division) => ({
      title: division.title,
      description: division.description,
      image: division.image || '',
      href: `/${locale}/our-businesses/${getSlug(division.slug)}`,
    }));
  } catch (error) {
    console.error('[Sanity] Failed to fetch business divisions:', error);
    return null;
  }
}

export async function getAllProducts(locale: string): Promise<Product[] | null> {
  if (!isSanityConfigured()) return null;
  try {
    const field = localizedField(locale);
    const products = await sanityClient.fetch<SanityProduct[]>(allProductsQuery, { locale: field });
    if (!products?.length) return null;
    return products.map((p) => mapProduct(p));
  } catch (error) {
    console.error('[Sanity] Failed to fetch products:', error);
    return null;
  }
}

export async function getProductBySlug(
  locale: string,
  slug: string
): Promise<Product | null> {
  if (!isSanityConfigured()) return null;
  try {
    const field = localizedField(locale);
    const product = await sanityClient.fetch<SanityProduct | null>(productBySlugQuery, {
      locale: field,
      slug,
    });
    if (!product) return null;
    return mapProduct(product);
  } catch (error) {
    console.error('[Sanity] Failed to fetch product:', error);
    return null;
  }
}

export interface DivisionDetail {
  title: string;
  description: string;
  tagline?: string;
  image: string;
  slug: string;
}

export async function getDivisionBySlug(
  locale: string,
  slug: string
): Promise<DivisionDetail | null> {
  if (!isSanityConfigured()) return null;
  try {
    const field = localizedField(locale);
    const division = await sanityClient.fetch<{
      title: string;
      description: string;
      tagline?: string;
      image?: string;
      slug: { current: string };
    } | null>(divisionBySlugQuery, { locale: field, slug });
    if (!division) return null;
    return {
      title: division.title,
      description: division.description,
      tagline: division.tagline,
      image: division.image || '',
      slug: getSlug(division.slug),
    };
  } catch (error) {
    console.error('[Sanity] Failed to fetch division:', error);
    return null;
  }
}

interface SanityDownloadDocument {
  _id: string;
  title: string;
  category: string;
  year: number;
  language: string;
  fileUrl?: string;
  coverImage?: string;
  gated?: boolean;
  documentKey?: string;
}

function mapNewsArticle(article: SanityNewsArticle): NewsArticle {
  const rawCategory = article.category;
  const slug = getSlug(article.slug);
  return {
    id: article._id,
    slug,
    title: article.title,
    excerpt: article.excerpt,
    content: article.body,
    category: CATEGORY_LABELS[rawCategory] || rawCategory,
    newsroomType: resolveNewsroomType(rawCategory),
    publishedAt: article.publishedAt,
    image: article.image || '',
    author: article.author,
    pdfUrl: article.pdfUrl || getPressReleasePdfUrl(slug),
  };
}

function mapDownloadDocument(doc: SanityDownloadDocument): DownloadDocument {
  const registryUrl = doc.documentKey ? getDocumentFileUrl(doc.documentKey) : undefined;
  const fileUrl = doc.fileUrl || (registryUrl !== '#' ? registryUrl : undefined) || '#';
  return enrichDownloadDocument({
    id: doc._id,
    title: doc.title,
    fileUrl,
    category: doc.category,
    language: doc.language,
    year: doc.year,
    coverImage: doc.coverImage,
    gated: doc.gated,
  });
}

export async function getDownloadDocuments(locale: string): Promise<DownloadDocument[] | null> {
  if (!isSanityConfigured()) return null;
  try {
    const field = localizedField(locale);
    const docs = await sanityClient.fetch<SanityDownloadDocument[]>(downloadDocumentsQuery, {
      locale: field,
    });
    if (!docs?.length) return null;
    return docs.map(mapDownloadDocument);
  } catch (error) {
    console.error('[Sanity] Failed to fetch downloads:', error);
    return null;
  }
}

export async function getAllNews(locale: string): Promise<NewsArticle[] | null> {
  if (!isSanityConfigured()) return getNewsArchive();

  try {
    const field = localizedField(locale);
    const articles = await sanityClient.fetch<SanityNewsArticle[]>(allNewsArticlesQuery, {
      locale: field,
    });
    if (!articles?.length) return getNewsArchive();
    return articles.map(mapNewsArticle);
  } catch (error) {
    console.error('[Sanity] Failed to fetch news:', error);
    return getNewsArchive();
  }
}

export async function getNewsBySlug(locale: string, slug: string): Promise<NewsArticle | null> {
  const fallback = getNewsArchive().find((article) => article.slug === slug);

  if (!isSanityConfigured()) return fallback ?? null;

  try {
    const field = localizedField(locale);
    const article = await sanityClient.fetch<SanityNewsArticle | null>(newsArticleBySlugQuery, {
      locale: field,
      slug,
    });
    if (!article) return fallback ?? null;
    return mapNewsArticle(article);
  } catch (error) {
    console.error('[Sanity] Failed to fetch news article:', error);
    return fallback ?? null;
  }
}

function mapProduct(product: SanityProduct): Product {
  return {
    id: product._id,
    slug: getSlug(product.slug),
    name: product.name,
    description: product.description,
    category: PRODUCT_CATEGORY_LABELS[product.category] || product.category,
    image: product.image || '',
  };
}

export async function getFeaturedProducts(locale: string): Promise<Product[] | null> {
  if (!isSanityConfigured()) return null;

  try {
    const field = localizedField(locale);
    const products = await sanityClient.fetch<SanityProduct[]>(featuredProductsQuery, {
      locale: field,
    });

    if (!products?.length) return null;

    return products.map((product) => mapProduct(product));
  } catch (error) {
    console.error('[Sanity] Failed to fetch featured products:', error);
    return null;
  }
}

export async function getLatestNews(locale: string): Promise<NewsArticle[] | null> {
  if (!isSanityConfigured()) {
    return getNewsArchive().slice(0, 3);
  }

  try {
    const field = localizedField(locale);
    const articles = await sanityClient.fetch<SanityNewsArticle[]>(latestNewsQuery, {
      locale: field,
    });

    if (!articles?.length) {
      return getNewsArchive().slice(0, 3);
    }

    return articles.map(mapNewsArticle);
  } catch (error) {
    console.error('[Sanity] Failed to fetch latest news:', error);
    return getNewsArchive().slice(0, 3);
  }
}

export async function getHomePageContent(locale: string) {
  return unstable_cache(
    async () => {
      const [businesses, products, news] = await Promise.all([
        getBusinessDivisions(locale),
        getFeaturedProducts(locale),
        getLatestNews(locale),
      ]);
      return { businesses, products, news };
    },
    [`home-page-${locale}`],
    { tags: ['sanity'], revalidate: 3600 }
  )();
}

export async function getSitemapSlugs() {
  if (!isSanityConfigured()) return null;

  try {
    const [products, news, divisions] = await Promise.all([
      sanityClient.fetch<Array<{ slug: string }>>(allProductSlugsQuery),
      sanityClient.fetch<Array<{ slug: string; publishedAt?: string }>>(allNewsSlugsQuery),
      sanityClient.fetch<Array<{ slug: string }>>(allDivisionSlugsQuery),
    ]);

    return {
      products: products?.map((p) => p.slug).filter(Boolean) || [],
      news: news?.filter((n) => n.slug) || [],
      divisions: divisions?.map((d) => d.slug).filter(Boolean) || [],
    };
  } catch (error) {
    console.error('[Sanity] Failed to fetch sitemap slugs:', error);
    return null;
  }
}
