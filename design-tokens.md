# Tereos Açúcar e Energia — Design Tokens

> Extracted from [tereos.com](https://tereos.com/en/) reference philosophy and adapted for the Thailand corporate brand (tereosa.com).

## Brand Positioning

- **Tagline:** "Day by day, cultivating the future"
- **Tone:** Authoritative, sustainable, multinational, premium B2B
- **Visual restraint:** 2–3 primary colors, generous whitespace, strong photography

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#E30613` | CTAs, active nav, brand accent, logo |
| `primary-dark` | `#B8050F` | Hover states, pressed buttons |
| `secondary` | `#005EB8` | Links, secondary CTAs, sky/earth logo gradient |
| `accent-gold` | `#F4A900` | Highlights, premium badges, stats |
| `accent-green` | `#2E7D32` | Sustainability, ESG metrics |
| `dark` | `#0F172A` | Hero overlays, dark sections |
| `neutral-50` | `#FAFAFA` | Page background |
| `neutral-900` | `#1A1A1A` | Body text |

## Typography

| Role | Font | Scale |
|------|------|-------|
| Display / Headlines | Inter (600–700) | `text-display-xl` → `text-h4` |
| Body | Inter (400–500) | `text-body-lg`, `text-body`, `text-body-sm` |
| Labels | Inter (600, uppercase) | `text-label` — wide tracking |
| Thai | Noto Sans Thai | Fallback for `th` locale |

## Spacing & Layout

| Token | Value |
|-------|-------|
| `container-custom` | max-width 1440px, responsive gutters |
| `section-padding` | `clamp(4rem, 10vw, 10rem)` |
| Section rhythm | Alternate `bg-white` / `bg-neutral-50` / dark sections |

## Component Patterns

### Header
- **On hero:** transparent bg, white text
- **Scrolled:** white/95 + blur, dark text, subtle shadow
- **MegaMenu:** multi-column links + featured image panel on right

### Hero
- Full viewport (`100svh`), video or image with dark overlay (40–60%)
- Dual CTA: primary filled red + secondary outline white
- Animated scroll indicator at bottom

### Cards
- `rounded-2xl`, border `neutral-100`, hover lift + shadow
- Image scale 1.05–1.10 on hover

## Animation

- Scroll reveal: fade-up 60px, 0.6s, `once: true`
- Stagger children: 0.1s delay
- Respect `prefers-reduced-motion`

## Reference IA (tereos.com)

Primary nav clusters:
1. **About** — Company, governance, global presence
2. **Businesses** — Sugar, bioenergy, agriculture, food ingredients, renewable
3. **Products** — Catalog by market/category
4. **Sustainability** — ESG, reports, commitments
5. **Investors** — Reports, governance, presentations
6. **News & Media** — Press releases, announcements
7. **Careers** — Jobs, culture, graduate programs
