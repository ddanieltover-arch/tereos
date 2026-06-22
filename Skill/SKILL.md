---
name: enterprise-corporate-website
description: >
  Build a world-class multinational enterprise corporate website for large-scale industrial, agricultural,
  commodity, energy, or B2B corporations — modeled after Tereos, Cargill, ADM, Bunge, or Louis Dreyfus.
  Use this skill whenever the user wants to build, scaffold, design, or extend ANY enterprise corporate
  website, especially in sugar, bioenergy, agriculture, food ingredients, commodities, or renewable energy.
  Trigger for: "build our corporate site", "create a multinational company website", "investor relations
  portal", "add sustainability section", "clone the Tereos website", "premium B2B corporate site", or any
  request to replicate or modernize a corporate reference website into Next.js + Tailwind. Always use this
  skill for enterprise corporate web development — never build without it.
---

# Enterprise Corporate Website Builder

You are an elite enterprise software architect, senior full-stack developer, brand designer, UX strategist, SEO specialist, and multilingual content architect. Your task is to build a premium, production-ready corporate website for a multinational company.

---

## PHASE 0 — Brief Capture

Before writing any code, extract the following from the user's specification document or conversation:

| Field | Description |
|---|---|
| `COMPANY_NAME` | Full legal company name |
| `WEBSITE_DOMAIN` | Target domain (e.g., tereosa.com) |
| `CONTACT_EMAIL` | Corporate email |
| `REFERENCE_WEBSITE` | URL to replicate/inspire from |
| `INDUSTRY` | Sugar / Bioenergy / Agriculture / Chemicals / etc. |
| `LANGUAGES` | e.g., English (default), Thai, Portuguese |
| `LANG_CODES` | e.g., en, th, pt-br |
| `CMS_PREFERENCE` | Sanity or Contentful |
| `BRAND_KEYWORDS` | 5–10 brand personality words |

If any field is missing, ask before proceeding. Don't assume industry-specific content.

---

## PHASE 1 — Reference Website Analysis

Before designing anything, **scrape and analyze the reference website**:

```bash
# Fetch reference website structure
curl -s <REFERENCE_WEBSITE> | grep -E "(nav|href|section|class)" | head -100
```

Extract:
- Color palette (primary, secondary, accent, background, text)
- Typography system (font families, sizes, weights)
- Navigation structure and mega-menu patterns
- Hero section patterns (video, image, overlay, CTA style)
- Section layout rhythm (padding, spacing, grid)
- Brand voice and copywriting tone
- Information architecture (page tree)

Document findings in `design-tokens.md` before proceeding to Phase 2.

---

## PHASE 2 — Technology Stack Setup

### Required Stack

```
Frontend:     Next.js 15 (App Router) + TypeScript
Styling:      Tailwind CSS v4 + CSS Variables
Animation:    Framer Motion v11
CMS:          Sanity v3 (or Contentful)
i18n:         next-intl
Icons:        Lucide React
Images:       Next.js Image (with Cloudflare CDN config)
Hosting:      Vercel
Analytics:    GA4 + GTM
```

### Project Scaffold

```bash
npx create-next-app@latest <project-name> \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd <project-name>
npm install framer-motion next-intl lucide-react @sanity/client @sanity/image-url
npm install -D @types/node
```

### Directory Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Home
│   │   ├── about/page.tsx
│   │   ├── businesses/
│   │   │   ├── page.tsx
│   │   │   └── [division]/page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── sustainability/page.tsx
│   │   ├── investor-relations/page.tsx
│   │   ├── news/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── careers/page.tsx
│   │   ├── global-presence/page.tsx
│   │   ├── innovation/page.tsx
│   │   ├── downloads/page.tsx
│   │   └── contact/page.tsx
│   └── api/
│       ├── contact/route.ts
│       └── newsletter/route.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── MegaMenu.tsx
│   │   ├── Footer.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── CorporateOverview.tsx
│   │   ├── BusinessDivisions.tsx
│   │   ├── ProductsShowcase.tsx
│   │   ├── GlobalReach.tsx
│   │   ├── SustainabilityHighlights.tsx
│   │   ├── InnovationHighlights.tsx
│   │   ├── LatestNews.tsx
│   │   └── InvestorHighlights.tsx
│   ├── shared/
│   │   ├── StatCounter.tsx
│   │   ├── AnimatedSection.tsx
│   │   ├── WorldMap.tsx
│   │   ├── VideoBackground.tsx
│   │   ├── ESGDashboard.tsx
│   │   └── DocumentCard.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Card.tsx
│       └── Modal.tsx
├── lib/
│   ├── sanity.ts
│   ├── i18n.ts
│   └── analytics.ts
├── messages/
│   ├── en.json
│   ├── th.json
│   └── pt-br.json
└── styles/
    └── globals.css
```

---

## PHASE 3 — Design System

### CSS Variables (in `globals.css`)

Base these on the reference website's extracted palette:

```css
:root {
  /* Primary — extract from reference */
  --color-primary:       #1a2b4a;   /* Deep corporate navy */
  --color-primary-light: #2d4a7a;
  --color-accent:        #c8a84b;   /* Gold / premium accent */
  --color-accent-light:  #e8c96a;

  /* Neutrals */
  --color-bg:            #ffffff;
  --color-surface:       #f8f9fa;
  --color-border:        #e2e8f0;
  --color-text-primary:  #1a202c;
  --color-text-secondary:#4a5568;
  --color-text-muted:    #718096;

  /* Enterprise Typography */
  --font-display:        'Playfair Display', Georgia, serif;
  --font-body:           'Inter', system-ui, sans-serif;

  /* Spacing Scale */
  --section-padding:     clamp(4rem, 8vw, 8rem);
  --container-max:       1320px;
  --gutter:              clamp(1rem, 4vw, 2rem);
}
```

> ⚠️ Always update these variables after Phase 1 analysis. The above are defaults — the real values come from the reference website.

### Component Design Patterns

**Hero Section:**
- Full-viewport height (100svh)
- Video background or large imagery with dark overlay (rgba 0.4–0.6)
- Company tagline: 2–3 lines max, display font, white
- Two CTAs: primary (filled, accent color) + secondary (outline, white)
- Animated scroll indicator

**Section Layout:**
- Alternating light/dark backgrounds (bg-white / bg-gray-50)
- Max-width container centered, responsive gutters
- Reveal animations: `useInView` from Framer Motion, fade-up 60px, 0.6s ease
- Section headers: small uppercase label + large heading + body copy

**Statistics / KPIs:**
- Animated count-up on scroll entry
- Large numerals in display font + accent color
- Supporting label in muted text
- Grid: 2–4 columns responsive

---

## PHASE 4 — Multilingual System

### next-intl Configuration

```typescript
// src/lib/i18n.ts
export const locales = ['en', 'th', 'pt-br'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'en';

// middleware.ts (root)
import createMiddleware from 'next-intl/middleware';
export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});
```

### Translation File Pattern

```json
// messages/en.json
{
  "nav": {
    "about": "About Us",
    "businesses": "Our Businesses",
    "products": "Products",
    "sustainability": "Sustainability",
    "ir": "Investor Relations",
    "news": "News & Media",
    "careers": "Careers",
    "global": "Global Presence",
    "innovation": "Innovation",
    "downloads": "Downloads",
    "contact": "Contact"
  },
  "home": {
    "hero_tagline": "...",
    "hero_cta_primary": "Explore Our Business",
    "hero_cta_secondary": "Investor Relations"
  }
}
```

> Build all 3 language files in parallel. For Thai and Portuguese, use placeholder text initially, then note where professional translation is needed.

### Language Switcher Component

```tsx
// Always visible in header, right side
// Shows flag emoji + language code
// On mobile: dropdown / bottom sheet
// Persists locale preference to localStorage
// Updates <html lang=""> attribute
// Implements hreflang link tags in <head>
```

---

## PHASE 5 — Page-by-Page Build Order

Build in this order (each page must be fully responsive before moving on):

### 5.1 — Layout Shell (Header + Footer)

Build first. Every other page depends on it.

**Header:**
- Sticky on scroll
- Logo (left) + Desktop MegaMenu (center/right) + Language Switcher + CTA Button
- Mobile: Hamburger → full-screen overlay menu
- Scroll-aware: transparent on hero, white + shadow when scrolled

**MegaMenu:**
- Multi-column dropdown per nav item
- Featured image or highlight panel on right
- Smooth opacity + translateY animation (Framer Motion)
- Keyboard accessible, trap focus

**Footer:**
- 4–5 column grid: Company info / Products / Quick Links / Sustainability / Contact
- Social links with hover animations
- Copyright + Legal links
- Back to top button

### 5.2 — Home Page

Build all sections in this order:
1. `HeroSection` — video or large image, tagline, dual CTA
2. `CorporateOverview` — intro text + animated stats (revenue, countries, employees, years)
3. `BusinessDivisions` — interactive cards per division with hover reveal
4. `ProductsShowcase` — featured products grid with filter tabs
5. `GlobalReach` — SVG world map with animated dots per export market
6. `SustainabilityHighlights` — ESG metrics dashboard, animated KPI bars
7. `InnovationHighlights` — R&D / bioenergy showcase cards
8. `LatestNews` — dynamic feed from CMS (3–4 cards)
9. `InvestorHighlights` — financial report links, stock ticker if applicable
10. `ContactCTA` — full-width section with form or link

### 5.3 — About Us

Sections: Company History (timeline), Vision + Mission, Leadership team (grid with modal bios), Corporate Governance, Values, Global Strategy.

### 5.4 — Our Businesses

Overview landing + individual division pages. Each division: hero image, description, markets served, capabilities list, sustainability impact metrics, related products.

### 5.5 — Products

Catalog page: search bar + category filters + product cards.
Product detail page: hero, specs table, applications, downloads section, inquiry form, related products.

### 5.6 — Sustainability

ESG strategy overview, animated metric bars, Carbon / Water / Energy / Community tabs, ESG reports download section, interactive infographics.

### 5.7 — Investor Relations

Financial reports archive (filterable by year/type), annual reports, corporate governance documents, investor presentations, contact IR team form.

### 5.8 — News & Media

Grid/list toggle, search + category filter, press releases, announcements, photo gallery, video gallery, individual article pages with rich text.

### 5.9 — Careers

Job listings with department filter, employee story cards, benefits section, graduate program info, job application modal form.

### 5.10 — Global Presence

Interactive SVG world map (or react-simple-maps), animated country dots per export market, regional office cards, distribution partner list.

### 5.11 — Innovation Center

R&D showcase, technology cards, bioenergy research highlights, agricultural innovation projects, partnerships with universities/institutions.

### 5.12 — Download Center

Filterable document library: brochures, catalogs, certifications, IR docs, sustainability reports. Gated download option (email capture) for sensitive documents.

### 5.13 — Contact

Department-based routing form (Sales / Export / IR / Media / Careers / General), smart validation, file upload for trade documents, reCAPTCHA, email routing config.

---

## PHASE 6 — SEO Implementation

### Metadata Pattern (per page)

```typescript
// app/[locale]/about/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: `About Us | ${COMPANY_NAME}`,
    description: '...',
    alternates: {
      canonical: `https://${DOMAIN}/${locale}/about`,
      languages: {
        'en': `https://${DOMAIN}/en/about`,
        'th': `https://${DOMAIN}/th/about`,
        'pt-BR': `https://${DOMAIN}/pt-br/about`,
      }
    },
    openGraph: {
      title: `...`,
      description: `...`,
      images: [{ url: `...`, width: 1200, height: 630 }],
      locale: locale,
    }
  };
}
```

### Structured Data (JSON-LD)

Add these schemas to relevant pages:

- `Organization` (site-wide in root layout)
- `WebSite` with `SearchAction` (root layout)
- `Product` (each product page)
- `Article` (each news page)
- `BreadcrumbList` (all inner pages)
- `JobPosting` (each career listing)

### Auto-Generated Files

```typescript
// app/sitemap.ts — generate XML sitemap
// app/robots.ts — generate robots.txt
```

---

## PHASE 7 — CMS Schema (Sanity v3)

### Core Document Types

```typescript
// schemas/index.ts — register all:
// - page (generic)
// - product
// - newsArticle
// - careerListing
// - downloadDocument
// - businessDivision
// - teamMember
// - sustainabilityReport
// - siteSettings (singleton)
```

### Multilingual Pattern

```typescript
// Use @sanity/document-internationalization plugin
// Each document gets a language field
// Use 'strong' references between translations
// Studio UI shows language badge per document
```

---

## PHASE 8 — Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse Best Practices | ≥ 95 |
| Lighthouse SEO | 100 |
| Mobile Score | ≥ 95 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID/INP | < 200ms |

### Optimization Checklist

- [ ] `next/image` for all images with blur placeholder
- [ ] Lazy load below-fold sections
- [ ] Route-level code splitting
- [ ] Font optimization via `next/font`
- [ ] Critical CSS inlined
- [ ] Framer Motion: use `useInView` with `once: true` to avoid re-animating
- [ ] Videos: poster image + preload="none" + autoplay muted loop playsInline
- [ ] Bundle analyzer run: `ANALYZE=true npm run build`

---

## PHASE 9 — Accessibility (WCAG 2.1 AA)

- All interactive elements keyboard accessible + visible focus ring
- Skip-to-content link at top of page
- `aria-label` on icon-only buttons
- `aria-expanded` on accordions/dropdowns
- Color contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text
- All images have descriptive `alt` text
- Form labels explicitly associated with inputs
- Language attribute set correctly per locale (`<html lang="en">`)
- Reduced motion: respect `prefers-reduced-motion` media query in all animations

---

## PHASE 10 — Delivery & Handoff

### Final File Checklist

- [ ] All pages built and responsive (mobile, tablet, desktop, wide)
- [ ] All 3 languages wired up
- [ ] CMS schemas deployed and studio accessible
- [ ] `.env.example` with all required keys documented
- [ ] `README.md` with setup, dev, build, deploy instructions
- [ ] Vercel project config (`vercel.json`) with headers, rewrites
- [ ] Security headers configured (CSP, X-Frame-Options, HSTS)
- [ ] GA4 + GTM integrated
- [ ] XML Sitemap + robots.txt auto-generated
- [ ] All Lighthouse targets met
- [ ] Accessibility audit passed

### Required Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
SANITY_PROJECT_ID=xxxxxxxxx
SANITY_DATASET=production
SANITY_API_TOKEN=sk...
RESEND_API_KEY=re_...
RECAPTCHA_SECRET_KEY=...
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=...
```

---

## QUICK REFERENCE: Common Patterns

### Animated Section Wrapper

```tsx
'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function AnimatedSection({ children, className }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### Animated Stat Counter

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export function StatCounter({ end, suffix = '', duration = 2 }: Props) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const step = end / (duration * 60);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, end);
      setCount(Math.floor(current));
      if (current >= end) clearInterval(timer);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}
```

---

## Notes for the Builder

1. **Build iteratively.** Don't wait until everything is done to test. After each phase, verify in browser.
2. **Mobile first.** Write mobile styles first, then add `md:` and `lg:` breakpoints.
3. **Real content placeholders.** Use the company's actual industry for placeholder text — not "Lorem ipsum".
4. **Reference site parity check.** After building each page, compare side-by-side with the reference. Ask: does this feel as premium?
5. **CMS first for content.** Don't hardcode content that editors will need to change — get it in Sanity from the start.
6. **Document every env variable** as you add it. Clients cannot deploy without this.
