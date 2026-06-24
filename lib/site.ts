/** Standard PageHero eyebrow across corporate pages. */
export const PAGE_EYEBROW = 'Tereos';

export const THAILAND_OFFICE_ADDRESS =
  'Chomphu, Mueang Lampang District, Lampang 52100, Thailand' as const;

export const BRAZIL_OFFICE_ADDRESS = 'SP-345, 146, Guaíra - SP, 14790-000, Brazil' as const;

export const EUROPE_OFFICE_ADDRESS = 'Tereos Europe Campus, Seine-et-Marne, France' as const;

export const COMPANY_PHONE = '+55 11 98343-6274' as const;

export const COMPANY_PHONE_HREF = 'tel:+5511983436274' as const;

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
