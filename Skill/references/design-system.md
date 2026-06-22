# Enterprise Corporate Design System Reference

## How to Use This File

This file documents repeatable design patterns for large-scale corporate websites modeled after global companies like Tereos, Cargill, ADM, Bunge, and Louis Dreyfus. Read this file during Phase 3 (Design System) and reference it when building any section.

---

## Color Philosophy

Enterprise corporate websites use 2–3 color tiers:

| Tier | Role | Typical Value |
|------|------|---------------|
| Primary | Navigation, headlines, dark sections | Deep navy, forest green, charcoal |
| Accent | CTAs, highlights, hover states | Gold, bright green, vivid orange |
| Neutral | Backgrounds, borders, text hierarchy | Whites, light grays, dark grays |

**Never use more than 3 primary brand colors.** Enterprise brands communicate authority through restraint, not vibrancy.

---

## Typography System

### Font Pairing Strategy
- **Display / Serif:** For headlines, section titles, hero taglines — communicates heritage, authority, gravitas
- **Sans-serif / Body:** For navigation, body copy, labels, UI — communicates clarity, modernity

### Typical Scale
```css
--text-hero:    clamp(2.5rem, 6vw, 5rem);    /* Hero tagline */
--text-h1:      clamp(2rem, 4vw, 3.5rem);     /* Page titles */
--text-h2:      clamp(1.5rem, 3vw, 2.5rem);   /* Section headers */
--text-h3:      clamp(1.25rem, 2vw, 1.75rem); /* Sub-headers */
--text-body:    1rem;                          /* Body copy */
--text-small:   0.875rem;                      /* Labels, captions */
--text-tiny:    0.75rem;                       /* Legal, footnotes */
```

### Section Header Pattern
Every major section follows this pattern:
```
[SMALL UPPERCASE LABEL — accent color, letter-spacing wide]
[LARGE SECTION TITLE — display font, 2–3 lines max]
[SHORT DESCRIPTION — body text, muted color, max 2 sentences]
```

---

## Layout Grid System

### Container Strategy
```css
.container {
  width: 100%;
  max-width: var(--container-max); /* 1320px or 1440px */
  margin: 0 auto;
  padding: 0 var(--gutter);        /* clamp(1rem, 4vw, 2rem) */
}
```

### Section Rhythm
- Each section: `padding-block: clamp(4rem, 8vw, 8rem)`
- Alternating: white bg → gray-50 bg → primary color bg (dark)
- Every 3–4 sections, use a full-bleed dark section to break monotony

### Column Grid Patterns
```
Stats grid:      2 cols mobile / 4 cols desktop
Division cards:  1 col mobile / 2 col tablet / 3 col desktop
Product grid:    1 col mobile / 2 col tablet / 3–4 col desktop
News grid:       1 col mobile / 2 col tablet / 3 col desktop
Team grid:       2 col mobile / 3 col tablet / 4 col desktop
```

---

## Hero Section Architecture

### Structure
```
[VIDEO or IMAGE — full viewport, object-cover]
  [OVERLAY — dark gradient, rgba(0,0,0,0.45)]
    [CONTENT — centered or left-aligned]
      [EYEBROW LABEL — small, uppercase, accent color]
      [HEADLINE — large, white, 2–3 lines]
      [SUBHEADLINE — body, white, 60% opacity]
      [CTA GROUP]
        [PRIMARY CTA — filled, accent color]
        [SECONDARY CTA — outline, white]
    [SCROLL INDICATOR — animated arrow or chevron, bottom-center]
```

### Video Background Pattern
```html
<!-- Always: poster + autoplay + muted + loop + playsInline -->
<video
  autoPlay muted loop playsInline
  poster="/hero-poster.jpg"
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/hero-video.mp4" type="video/mp4" />
</video>
```

---

## Navigation Patterns

### Desktop MegaMenu Structure
```
[LOGO]    [NAV ITEMS WITH DROPDOWNS]    [LANG SWITCHER] [CTA BUTTON]

On hover over nav item:
  ┌─────────────────────────────────────────────────────┐
  │ COLUMN 1: Links    COLUMN 2: Links    COLUMN 3:     │
  │ - Sub page 1       - Sub page 4      FEATURED CARD  │
  │ - Sub page 2       - Sub page 5      [Image + Link] │
  │ - Sub page 3       - Sub page 6                     │
  └─────────────────────────────────────────────────────┘
```

### Header States
- **Default (on hero):** Transparent background, white text + logo
- **Scrolled:** White background, dark text + colored logo, box-shadow
- **Active page:** Nav item underlined or highlighted

---

## Animation Guidelines

### Scroll Reveal (useInView)
```typescript
const variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};
// Use `once: true` — never re-animate on scroll-up
// Use `margin: '-10%'` — trigger slightly before element enters viewport
```

### Stagger Children
```typescript
const containerVariants = {
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};
// Apply to grid parent, use `variants` on each child card
```

### Reduced Motion
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// If true: set duration to 0, skip translateY, keep opacity only
```

### What to Animate vs What to Skip
| Animate | Don't Animate |
|---------|---------------|
| Section entrances (scroll reveal) | Navigation links |
| Stat counters | Form inputs |
| Card hover states | Text content |
| Mega menu open/close | Tables |
| Hero text entrance | Inline code |

---

## Card Component Patterns

### Business Division Card
```
[IMAGE — aspect-ratio 4/3, object-cover]
[CONTENT AREA — padding: 1.5rem]
  [ICON — brand color, 40px]
  [TITLE — h3, bold]
  [DESCRIPTION — 2–3 lines]
  [LINK — "Learn More →", accent color]
[HOVER STATE]
  - Image scale: 1.05
  - Card: lift (translateY -4px, shadow-lg)
  - Link: color transition
  - Transition: all 0.3s ease
```

### News/Article Card
```
[IMAGE — aspect-ratio 16/9]
[CATEGORY BADGE — small, uppercase, accent bg]
[DATE — small, muted]
[TITLE — 2 lines max, truncate]
[EXCERPT — 3 lines max, truncate, muted]
[READ MORE LINK]
```

### Download Document Card
```
[ICON — file type icon, large, primary color]
[TITLE — bold]
[TYPE + YEAR — small, muted]
[FILE SIZE — small, muted]
[DOWNLOAD BUTTON — outline style]
```

---

## Sustainability / ESG Section Patterns

### ESG Metric Bar
```
[LABEL]            [VALUE / TARGET]
████████████░░░░░  [ANIMATED on scroll entry]
[DESCRIPTION — one line]
```

### ESG Category Tabs
```
[Carbon] [Water] [Energy] [Community] [Governance]
  ↑ Active: accent underline

[TAB CONTENT AREA]
  - Key metrics (animated)
  - Progress toward targets
  - YoY comparison
  - Report download link
```

---

## Interactive World Map

### Implementation Options (in order of preference)
1. **react-simple-maps** — SVG world map, lightweight, customizable
2. **Leaflet.js** — tile-based, more complex, more interactive
3. **Static SVG** — hand-crafted, maximum control, no JS dependency

### Dot Animation Pattern
```typescript
// Each country dot:
// - starts at scale 0, opacity 0
// - animates to scale 1, opacity 1 with delay based on index
// - pulses on hover
// - shows tooltip with country name + stats on hover
```

---

## Contact Form Architecture

### Department Routing
```typescript
const departments = [
  { id: 'sales',    label: 'Sales & Trading',      email: 'sales@...' },
  { id: 'export',   label: 'Export Inquiries',      email: 'export@...' },
  { id: 'ir',       label: 'Investor Relations',    email: 'ir@...' },
  { id: 'media',    label: 'Media & Press',         email: 'media@...' },
  { id: 'careers',  label: 'Careers',               email: 'hr@...' },
  { id: 'general',  label: 'General Inquiry',       email: 'info@...' },
];
// On submit: route to department-specific email via Resend API
// Always CC: info@[domain]
```

### Form Field Set
```
[SELECT: Department]
[INPUT: Full Name *]
[INPUT: Company Name]
[INPUT: Email *]
[INPUT: Phone]
[SELECT: Country]
[TEXTAREA: Message *]
[FILE UPLOAD: Attachments (PDF, max 10MB)]
[RECAPTCHA]
[SUBMIT BUTTON]
```

---

## Investor Relations Portal

### Document Library Structure
```typescript
type IRDocument = {
  title: string;
  type: 'annual_report' | 'interim_report' | 'presentation' | 'governance' | 'circular';
  year: number;
  quarter?: 1 | 2 | 3 | 4;
  fileUrl: string;
  fileSize: string;
  language: Locale;
};
```

### Filter System
```
[Year: All | 2024 | 2023 | 2022 | ...]
[Type: All | Annual Reports | Presentations | Governance | ...]
[Language: All | EN | TH | PT-BR]
```

---

## Common Anti-Patterns to Avoid

| ❌ Avoid | ✅ Do Instead |
|---------|-------------|
| Centered body text (>3 lines) | Left-align body copy always |
| Too many font sizes | Stick to the defined scale |
| Thin border buttons on dark bg | Use solid or high-contrast outlines |
| Generic stock photography | Industry-specific imagery (sugar cane, bioenergy plant, agriculture) |
| Long paragraphs (>5 lines) | Break into shorter chunks |
| Missing hover states on interactive elements | Every card, link, button needs hover |
| Animations that replay on scroll-up | Use `once: true` in useInView |
| Hard-coded text content that editors will need to change | Push to CMS from day 1 |
| Missing mobile menu close button | Always: X button + swipe/click-outside to close |
