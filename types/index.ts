
export interface LocaleParams {
  locale: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface StatItem {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface BusinessCard {
  title: string;
  description: string;
  image: string;
  href: string;
}

export type NewsroomType = 'press-release' | 'news';

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  category: string;
  newsroomType: NewsroomType;
  publishedAt: string;
  author?: string;
  slug: string;
  /** Direct PDF attachment for press releases */
  pdfUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  specifications?: Record<string, string>;
  applications?: string[];
  slug: string;
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  description: string;
  requirements?: string[];
  postedAt: string;
  slug: string;
  /** External ATS job ID (e.g. Workday requisition ID) */
  externalId?: string;
  /** Override apply URL; takes precedence over ATS portal pattern */
  applyUrl?: string;
}

export type IrDocumentType = 'presentation' | 'regulated' | 'results';

export interface DownloadDocument {
  id: string;
  title: string;
  fileUrl: string;
  category: string;
  language: string;
  year: number;
  fileSize?: string;
  coverImage?: string;
  gated?: boolean;
  /** Fiscal year label, e.g. 2025-2026 (April–March). */
  fiscalYear?: string;
  /** Investor document type for financial filters. */
  irType?: IrDocumentType;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department: string;
  subject: string;
  message: string;
  file?: File;
}

export interface ESGMetric {
  label: string;
  value: number;
  target: number;
  prefix?: string;
  suffix: string;
}

export interface GlobalLocation {
  id: string;
  name: string;
  type: 'office' | 'facility' | 'partner';
  country: string;
  city: string;
  coordinates: [number, number];
  description?: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}
