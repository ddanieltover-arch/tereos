
# Tereos Açúcar e Energia S.A. — Enterprise Corporate Website

## Project Overview

A world-class, next-generation multinational corporate website for **Tereos Açúcar e Energia S.A. Co., Ltd** (Thailand), built as a premium evolution of the Tereos Group corporate identity.

**Live URL:** https://tereosa.com  
**Reference Philosophy:** https://tereos.com/en/

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15+ (App Router, React Server Components) |
| Language | TypeScript 5.7+ |
| Styling | Tailwind CSS 3.4+ |
| Animation | Framer Motion |
| CMS | Sanity (headless) |
| i18n | next-intl |
| Hosting | Vercel |
| CDN | Cloudflare |

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 95+ |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| Core Web Vitals LCP | < 2.5s |
| Core Web Vitals INP | < 200ms |
| Core Web Vitals CLS | < 0.1 |

## Project Structure

```
tereosa-website/
├── .env.example
├── .prettierrc
├── app
│   ├── [locale]
│   │   ├── (home)
│   │   │   └── page.tsx
│   │   ├── about
│   │   │   └── page.tsx
│   │   ├── careers
│   │   │   └── page.tsx
│   │   ├── contact
│   │   │   └── page.tsx
│   │   ├── download-center
│   │   │   └── page.tsx
│   │   ├── error.tsx
│   │   ├── global-presence
│   │   │   └── page.tsx
│   │   ├── innovation
│   │   │   └── page.tsx
│   │   ├── investor-relations
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── legal
│   │   │   ├── accessibility
│   │   │   │   └── page.tsx
│   │   │   ├── cookies
│   │   │   │   └── page.tsx
│   │   │   ├── privacy
│   │   │   │   └── page.tsx
│   │   │   └── terms
│   │   │       └── page.tsx
│   │   ├── loading.tsx
│   │   ├── news-media
│   │   │   ├── [slug]
│   │   │   └── page.tsx
│   │   ├── not-found.tsx
│   │   ├── our-businesses
│   │   │   ├── agriculture
│   │   │   │   └── page.tsx
│   │   │   ├── bioenergy
│   │   │   │   └── page.tsx
│   │   │   ├── food-ingredients
│   │   │   │   └── page.tsx
│   │   │   ├── page.tsx
│   │   │   ├── renewable-solutions
│   │   │   │   └── page.tsx
│   │   │   └── sugar
│   │   │       └── page.tsx
│   │   ├── products
│   │   │   ├── [slug]
│   │   │   └── page.tsx
│   │   ├── search
│   │   │   └── page.tsx
│   │   ├── sitemap
│   │   │   └── page.tsx
│   │   └── sustainability
│   │       └── page.tsx
│   ├── api
│   │   ├── contact
│   │   │   └── route.ts
│   │   ├── revalidate
│   │   │   └── route.ts
│   │   └── search
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components
│   ├── animations
│   │   ├── count-up.tsx
│   │   ├── fade-in.tsx
│   │   └── stagger-container.tsx
│   ├── forms
│   ├── layout
│   │   ├── footer.tsx
│   │   └── header.tsx
│   ├── providers.tsx
│   ├── sections
│   │   ├── business-cards-section.tsx
│   │   ├── careers-cta.tsx
│   │   ├── contact-cta.tsx
│   │   ├── global-reach-section.tsx
│   │   ├── hero-section.tsx
│   │   ├── innovation-spotlight.tsx
│   │   ├── investor-snapshot.tsx
│   │   ├── latest-news.tsx
│   │   ├── products-showcase.tsx
│   │   ├── stats-section.tsx
│   │   └── sustainability-highlights.tsx
│   └── ui
├── eslint.config.mjs
├── i18n.ts
├── lib
│   ├── i18n
│   │   └── config.ts
│   ├── sanity
│   ├── seo
│   │   └── schemas.ts
│   └── utils.ts
├── messages
│   ├── en.json
│   ├── pt-br.json
│   └── th.json
├── middleware.ts
├── next-env.d.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── public
│   ├── documents
│   ├── images
│   └── videos
├── sanity
│   └── schemas
├── tailwind.config.ts
├── tsconfig.json
└── types
    └── index.ts
```

## Getting Started

### Prerequisites
- Node.js >= 20.0.0
- npm >= 10.0.0

### Installation

```bash
# Clone repository
git clone https://github.com/your-org/tereosa-website.git
cd tereosa-website

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

### Environment Variables

```env
SANITY_PROJECT_ID=xxx
SANITY_DATASET=production
SANITY_API_TOKEN=xxx
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXX
NEXT_PUBLIC_SITE_URL=https://tereosa.com
REVALIDATE_SECRET=xxx
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript checks |
| `npm run format` | Format code with Prettier |

## Multilingual Support

- **English** (`/en/`) — Default
- **Thai** (`/th/`)
- **Brazilian Portuguese** (`/pt-br/`)

## Site Architecture

### Pages (15 categories, 22+ routes)

1. **Home** (`/`) — 11 interactive sections
2. **About Us** (`/about`) — Company info, history, values
3. **Our Businesses** (`/our-businesses`) — 5 business divisions
4. **Products** (`/products`) — Product catalog with search/filter
5. **Sustainability** (`/sustainability`) — ESG dashboard
6. **Investor Relations** (`/investor-relations`) — Financial reports
7. **News & Media** (`/news-media`) — Press releases, galleries
8. **Careers** (`/careers`) — Job listings, applications
9. **Global Presence** (`/global-presence`) — Interactive map
10. **Innovation** (`/innovation`) — R&D showcase
11. **Download Center** (`/download-center`) — Document repository
12. **Contact** (`/contact`) — Department-based forms
13. **Legal** (`/legal/*`) — Privacy, Terms, Cookies, Accessibility
14. **Search** (`/search`) — Global site search
15. **Sitemap** (`/sitemap`) — HTML sitemap

## Key Features

### Design System
- Tereos brand colors (Primary Red `#E30613`, Secondary Blue `#005EB8`, Gold `#F4A900`, Green `#2E7D32`)
- Custom Tailwind configuration with fluid typography
- Premium animations with Framer Motion
- Responsive design (mobile-first)

### SEO
- JSON-LD structured data (Organization, Breadcrumb, Article, Product)
- Auto-generated XML sitemap
- Hreflang support for all locales
- Meta tags, Open Graph, Twitter Cards

### Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader support
- `prefers-reduced-motion` support
- Semantic HTML5 markup

### Security
- HSTS headers
- Content Security Policy
- X-Frame-Options
- Rate limiting on API routes
- Input validation with Zod

## Brand Identity

The website communicates:
- **Global Leadership** — World map, export data, international presence
- **Sustainability** — ESG metrics, green accents, nature imagery
- **Agricultural Innovation** — R&D highlights, technology showcases
- **Bioenergy Excellence** — Energy metrics, renewable solutions
- **Corporate Responsibility** — Governance transparency, community impact

## License

© 2026 Tereos Açúcar e Energia S.A. Co., Ltd. All rights reserved.

## Support

- Email: sales@tereosa.com
- Website: https://tereosa.com
