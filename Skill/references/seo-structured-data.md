# SEO & Structured Data Reference

## Overview

This file contains implementation patterns for enterprise-grade SEO on Next.js 15. Read this during Phase 6 (SEO Implementation).

---

## Root Layout Metadata

```typescript
// app/[locale]/layout.tsx
import { Metadata } from 'next';

const COMPANY_NAME = 'Tereos Açúcar e Energia S.A. Co., Ltd';
const DOMAIN = 'https://tereosa.com';

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  title: { default: COMPANY_NAME, template: `%s | ${COMPANY_NAME}` },
  description: 'Global leader in sugar, bioenergy, and sustainable agricultural solutions.',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: COMPANY_NAME,
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};
```

---

## Organization Schema (root layout)

```tsx
// components/layout/OrganizationSchema.tsx
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": COMPANY_NAME,
    "url": DOMAIN,
    "logo": `${DOMAIN}/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@tereosa.com",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.linkedin.com/company/tereosa",
    ]
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
```

---

## Product Schema

```typescript
// For each product page:
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "image": product.imageUrl,
  "brand": {
    "@type": "Brand",
    "name": COMPANY_NAME
  },
  "manufacturer": {
    "@type": "Organization",
    "name": COMPANY_NAME,
    "url": DOMAIN
  }
};
```

---

## BreadcrumbList Schema

```typescript
// Helper to generate breadcrumb schema for any inner page
function generateBreadcrumbs(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// Usage:
generateBreadcrumbs([
  { name: 'Home', url: `${DOMAIN}/en` },
  { name: 'Products', url: `${DOMAIN}/en/products` },
  { name: productName, url: `${DOMAIN}/en/products/${slug}` },
]);
```

---

## Article Schema (News Pages)

```typescript
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": article.title,
  "datePublished": article.publishedAt,
  "dateModified": article.updatedAt,
  "author": {
    "@type": "Organization",
    "name": COMPANY_NAME
  },
  "publisher": {
    "@type": "Organization",
    "name": COMPANY_NAME,
    "logo": { "@type": "ImageObject", "url": `${DOMAIN}/logo.png` }
  },
  "image": article.heroImageUrl,
  "description": article.excerpt,
};
```

---

## JobPosting Schema (Careers)

```typescript
const jobSchema = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": job.title,
  "description": job.description,
  "datePosted": job.publishedAt,
  "validThrough": job.closingDate,
  "employmentType": job.type.toUpperCase(), // FULL_TIME, PART_TIME, CONTRACTOR
  "hiringOrganization": {
    "@type": "Organization",
    "name": COMPANY_NAME,
    "sameAs": DOMAIN
  },
  "jobLocation": {
    "@type": "Place",
    "address": { "@type": "PostalAddress", "addressCountry": "TH" }
  }
};
```

---

## XML Sitemap (app/sitemap.ts)

```typescript
import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';

const DOMAIN = 'https://tereosa.com';

const staticRoutes = [
  '', '/about', '/businesses', '/products', '/sustainability',
  '/investor-relations', '/news', '/careers', '/global-presence',
  '/innovation', '/downloads', '/contact'
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = staticRoutes.flatMap(route =>
    locales.map(locale => ({
      url: `${DOMAIN}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  );

  // Dynamic pages from CMS (products, news, etc.)
  // const products = await getAllProducts();
  // const dynamicPages = products.flatMap(p => locales.map(l => ({ url: ... })));

  return [...staticPages /*, ...dynamicPages */];
}
```

---

## robots.txt (app/robots.ts)

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/studio/'],
    },
    sitemap: 'https://tereosa.com/sitemap.xml',
    host: 'https://tereosa.com',
  };
}
```

---

## Security Headers (next.config.ts)

```typescript
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com *.google-analytics.com",
      "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
      "img-src 'self' data: *.sanity.io *.googleapis.com",
      "font-src 'self' fonts.gstatic.com",
      "connect-src 'self' *.sanity.io *.google-analytics.com",
      "frame-src 'self' *.youtube.com *.vimeo.com",
    ].join('; ')
  },
];
```

---

## Hreflang Implementation

```tsx
// In each page's generateMetadata:
alternates: {
  canonical: `${DOMAIN}/${locale}${pathname}`,
  languages: Object.fromEntries(
    locales.map(l => [
      l === 'pt-br' ? 'pt-BR' : l,
      `${DOMAIN}/${l}${pathname}`
    ])
  )
}
```

---

## Internal Linking Strategy

1. **Every product page** links to:
   - Its parent business division
   - Related products (3–4)
   - Relevant downloads

2. **Every news article** links to:
   - Relevant product or division mentioned
   - Related articles

3. **Home page** links to:
   - All major sections (anchor links)
   - Featured products
   - Latest 3 news articles

4. **Global presence page** links to:
   - Regional contact pages
   - Products available in each market

5. **Footer** links to:
   - All primary navigation pages
   - Privacy Policy, Terms, Cookie Policy
   - Sitemap
