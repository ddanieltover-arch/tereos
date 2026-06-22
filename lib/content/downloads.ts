export type DownloadHubSlug =
  | 'all'
  | 'annual-reports'
  | 'sustainability'
  | 'brochures'
  | 'certifications'
  | 'investor'
  | 'newsroom';

export interface DownloadHubLink {
  slug: DownloadHubSlug;
  href: string;
  category?: string;
  external?: boolean;
}

export const DOWNLOAD_HUB_LINKS: DownloadHubLink[] = [
  { slug: 'all', href: '/download-center' },
  { slug: 'annual-reports', href: '/download-center?category=annual-report', category: 'annual-report' },
  {
    slug: 'sustainability',
    href: '/download-center?category=sustainability-report',
    category: 'sustainability-report',
  },
  { slug: 'brochures', href: '/download-center?category=brochure', category: 'brochure' },
  { slug: 'certifications', href: '/download-center?category=certification', category: 'certification' },
  { slug: 'investor', href: '/investor-relations', external: true },
  { slug: 'newsroom', href: '/news-media?tab=documents', external: true },
];
