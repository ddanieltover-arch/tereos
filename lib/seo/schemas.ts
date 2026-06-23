import { HTML_LANG } from '@/lib/i18n/locale-meta';
import { isValidLocale } from '@/lib/i18n/config';
import { getSiteUrl } from '@/lib/site';

export function generateOrganizationSchema() {
  const siteUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tereos Açúcar e Energia S.A. Co., Ltd',
    alternateName: 'Tereos Açúcar e Energia',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/images/tereosa-icon-512.png`,
      width: 512,
      height: 512,
    },
    email: 'sales@tereosa.com',
    sameAs: [
      'https://linkedin.com/company/tereosa',
      'https://twitter.com/tereosa',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TH',
      addressLocality: 'Bangkok',
    },
    description:
      'Global leader in sugar production, bioenergy, agricultural innovation, and sustainable food solutions.',
  };
}

export function generateWebSiteSchema(locale: string) {
  const siteUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tereos Açúcar e Energia S.A.',
    url: `${siteUrl}/${locale}`,
    inLanguage: isValidLocale(locale) ? HTML_LANG[locale] : locale,
    publisher: {
      '@type': 'Organization',
      name: 'Tereos Açúcar e Energia S.A.',
      logo: `${siteUrl}/images/tereosa-icon-512.png`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/${locale}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateBreadcrumbSchema(
  locale: string,
  items?: Array<{ name: string; url: string }>
) {
  const siteUrl = getSiteUrl();
  const baseItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${siteUrl}/${locale}`,
    },
  ];

  const additionalItems = (items || []).map((item, index) => ({
    '@type': 'ListItem',
    position: index + 2,
    name: item.name,
    item: item.url.startsWith('http') ? item.url : `${siteUrl}/${locale}${item.url}`,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [...baseItems, ...additionalItems],
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  modifiedAt?: string;
  author?: string;
  url: string;
}) {
  const siteUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt || article.publishedAt,
    author: {
      '@type': article.author ? 'Person' : 'Organization',
      name: article.author || 'Tereos Açúcar e Energia S.A.',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tereos Açúcar e Energia S.A.',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/tereosa-icon-512.png`,
      },
    },
    url: article.url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  image: string;
  url: string;
  category?: string;
  sku?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    url: product.url,
    brand: {
      '@type': 'Brand',
      name: 'Tereos Açúcar e Energia',
    },
    category: product.category,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Tereos Açúcar e Energia S.A.',
      },
    },
  };
}

export function generateJobPostingSchema(job: {
  title: string;
  description: string;
  location: string;
  type: string;
  postedAt: string;
  url: string;
}) {
  const employmentTypeMap: Record<string, string> = {
    'full-time': 'FULL_TIME',
    'part-time': 'PART_TIME',
    contract: 'CONTRACTOR',
    internship: 'INTERN',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.postedAt,
    employmentType: employmentTypeMap[job.type] || 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Tereos Açúcar e Energia S.A.',
      sameAs: getSiteUrl(),
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
      },
    },
    url: job.url,
  };
}
