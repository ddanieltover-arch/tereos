# Download PDFs

Place corporate PDFs here. After adding files, register them in `lib/content/documents.ts`.

## Refresh from tereos.com (automated subset)

```bash
npm run download:pdfs
npm run download:financial-pdfs
```

## Currently registered on the site

See `lib/content/documents.ts` — registered documents wired to:

- Download center (`/download-center`)
- Investor relations subpages
- Newsroom press downloads
- Sustainability page

## Your full library

There are **~80 PDFs** in this folder. **72 are registered** on the site; **10 duplicate copies** on disk are skipped (same bytes, alternate filename). To register a new file after adding it here, add one entry to `DOCUMENT_ASSETS` in `lib/content/documents.ts` (or run `node scripts/generate-document-entries.mjs` after updating the curated map in that script).

To add more: drop the PDF here, then add one entry to `DOCUMENT_ASSETS` in `lib/content/documents.ts`.
