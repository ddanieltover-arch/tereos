export type SearchResultType =
  | 'page'
  | 'product'
  | 'news'
  | 'division'
  | 'job'
  | 'market'
  | 'product-line'
  | 'document'
  | 'brand';

export interface SearchIndexEntry {
  type: SearchResultType;
  title: string;
  url: string;
  excerpt: string;
  keywords?: string;
}

export interface SearchResult extends SearchIndexEntry {
  score?: number;
}

export interface SearchOptions {
  type?: SearchResultType | 'all';
  limit?: number;
  offset?: number;
}

export interface SearchResponse {
  query: string;
  results: SearchResult[];
  total: number;
  hasMore: boolean;
}
