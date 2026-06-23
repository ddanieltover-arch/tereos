/** Standard PageHero eyebrow across corporate pages. */
export const PAGE_EYEBROW = 'Tereos';

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://tereosa.com';
  return url.replace(/\/$/, '');
}

/** Open Graph / Twitter share image (brand logo). */
export const OG_IMAGE = {
  path: '/images/tereosa-logo.png',
  width: 1024,
  height: 414,
  alt: 'Tereos Açúcar e Energia S.A.',
} as const;

export function absoluteUrl(path: string, locale?: string): string {
  const base = getSiteUrl();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale) {
    return `${base}/${locale}${normalized === '/' ? '' : normalized}`;
  }
  return `${base}${normalized}`;
}
