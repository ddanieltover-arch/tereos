import type { DownloadDocument, NewsArticle, NewsroomType } from '@/types';

export type NewsroomTab = 'all' | 'press-releases' | 'news' | 'documents';

const PRESS_RELEASE_KEYS = new Set(['press-release', 'press release', 'investor']);

export function resolveNewsroomType(category: string): NewsroomType {
  const key = category.toLowerCase().trim();
  if (PRESS_RELEASE_KEYS.has(key) || key.includes('press release')) {
    return 'press-release';
  }
  return 'news';
}

export function filterArticlesByTab(articles: NewsArticle[], tab: NewsroomTab): NewsArticle[] {
  if (tab === 'all') return articles;
  if (tab === 'press-releases') return articles.filter((a) => a.newsroomType === 'press-release');
  if (tab === 'news') return articles.filter((a) => a.newsroomType === 'news');
  return [];
}

export const NEWSROOM_DOCUMENT_CATEGORIES = [
  'annual-report',
  'sustainability-report',
  'ir-document',
  'presentation',
  'brochure',
] as const;

export function filterNewsroomDocuments(documents: DownloadDocument[]): DownloadDocument[] {
  return documents
    .filter((d) =>
      (NEWSROOM_DOCUMENT_CATEGORIES as readonly string[]).includes(d.category)
    )
    .sort((a, b) => b.year - a.year);
}

export const NEWSROOM_DOCUMENT_TYPE_LABELS: Record<string, string> = {
  'annual-report': 'Annual Report',
  'sustainability-report': 'Sustainability Report',
  'ir-document': 'IR Document',
  presentation: 'Presentation',
  brochure: 'Brochure',
};

export function parseNewsroomTab(value?: string): NewsroomTab {
  if (
    value === 'press-releases' ||
    value === 'news' ||
    value === 'documents' ||
    value === 'all'
  ) {
    return value;
  }
  return 'all';
}
