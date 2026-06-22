# Public Assets

## Brand (installed)

| File | Purpose |
|------|---------|
| `images/tereosa-logo.png` | Full horizontal logo (header & footer) |
| `images/tereosa-icon.png` | Icon mark only |
| `images/tereosa-icon-512.png` | JSON-LD / social logo reference |
| `favicon-16x16.png`, `favicon-32x32.png` | Browser tab icons |
| `apple-touch-icon.png` | iOS home screen (180×180) |
| `icon-192.png`, `icon-512.png` | PWA manifest icons |
| `app/icon.png`, `app/apple-icon.png` | Next.js metadata icons |

Re-run `node scripts/setup-brand-assets.mjs` after replacing source artwork.

## Photography (Tereos official)

| Path | Purpose |
|------|---------|
| `images/tereos/` | 33 curated photos scraped from tereos.com |
| `lib/content/photography.ts` | Registry (`TEREOS_PHOTOS`, division/market/product maps) |

Sync photography from tereos.com:

```bash
npm run download:photography
```

## Hero & social

| File | Purpose |
|------|---------|
| `videos/hero.mp4` | Homepage hero background video (official Tereos purpose film) |
| `images/hero-poster.png` | Poster frame before video loads (sugar-beet field) |

Sync homepage hero from tereos.com:

```bash
npm run download:hero
```
| `images/tereosa-logo.png` | Open Graph / Twitter share image |

If the hero video fails to load, the site falls back to `images/tereos/agriculture-beet-irrigation.png`.
