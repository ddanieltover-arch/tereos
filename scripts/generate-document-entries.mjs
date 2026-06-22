import fs from 'node:fs';
import path from 'node:path';

const downloadsDir = path.join(process.cwd(), 'public', 'downloads');

const SKIP_DUPLICATES = new Set([
  'annual-report-24-25.pdf',
  'ethical-charter-2025.pdf',
  'tereos-non-financial-statement-2024-25.pdf',
  'sustainability-report-2024.pdf',
  'press-annual-results-2025-26.pdf',
  'press-bioenergy-saf-2026.pdf',
  'press-cdp-rating-2026.pdf',
  'press-half-year-2025.pdf',
  'press-q1-results-2026.pdf',
  'tereos-prospectus-2016-visa-1.pdf',
]);

const REGISTERED = new Set([
  'annual-report-2024-25.pdf',
  '2022-23-annual-report-1.pdf',
  '2022-annual-report-web.pdf',
  'annual-report-18-19.pdf',
  'non-financial-statement-2024-25.pdf',
  'memoria-sostenibilidad-2024.pdf',
  'memoria-sostenibilidad-2023.pdf',
  'sustain-2030-leaflet-en.pdf',
  'ethical-charter-2025-tereos.pdf',
  'quality-charter-2023-eng.pdf',
  'cp-sbti-flag-net-zero-eng.pdf',
  'tereos-2019-20-full-year-results-presentation-v2.pdf',
  '2020-06-03-tereos-presentation-annual-results-19-20-eng.pdf',
  'finance-fy-18-19-results-and-perspectives-presentation-eng-vf.pdf',
  'tereos-group---2017-18-annual-results---investor-presentation---gb.pdf',
  'h1-16-17-bondholders-results-presentation.pdf',
  'tereos-2025-26-financial-results-press-release.pdf',
  '20251121-pr-tereos-half-year-financial-results.pdf',
  'cp-tereos-cdp-rating.pdf',
  '20251120-cp-tereos-cogeca-award.pdf',
  'pr-tereos-rebound-.pdf',
  'tereos-group-audited-consolidated-financial-statements-19-20.pdf',
  'press-release-tereos-targets-net-zero-emissions-throughout-the-value-chain-final.pdf',
  'tereos-essentiel2015-gb-hd.pdf',
  'tereos-cp-actifiber-en.pdf',
]);

/** Curated id, title, category, year for each new file */
const CURATED = {
  '200722-dpef-eng.pdf': { id: 'dpef-2020', title: 'DPEF / Non-Financial Statement 2020', category: 'sustainability-report', year: 2020 },
  '2015-16-results---tereos-group---communication-to-bondholders--def1.pdf': {
    id: 'ir-bondholders-2015-16',
    title: '2015/16 Results — Communication to Bondholders',
    category: 'ir-document',
    year: 2016,
  },
  '2019-06-12-cp-rsultats-annuels-tereos-eng-version-longue.pdf': {
    id: 'press-annual-results-2018-19',
    title: 'Annual Results 2018/19 — Press Release',
    category: 'ir-document',
    year: 2019,
  },
  '20250923avantiumlvmhandtereosformstrategicalliancetoscalereleafregproductionacrosseurope.pdf': {
    id: 'press-avantium-leaf-alliance-2025',
    title: 'Avantium, LVMH & Tereos — Releaf Strategic Alliance',
    category: 'ir-document',
    year: 2025,
  },
  'annual-report-2024.pdf': { id: 'annual-report-2024', title: 'Annual Report 2024', category: 'annual-report', year: 2024, gated: true },
  'cp-en-tereos-pr-redemption-06-january-2020.pdf': {
    id: 'ir-redemption-notice-2020-01',
    title: 'Bond Redemption Notice — January 2020',
    category: 'ir-document',
    year: 2020,
  },
  'cp-en-tereos-pr-redemption.pdf': {
    id: 'ir-redemption-notice',
    title: 'Bond Redemption Notice',
    category: 'ir-document',
    year: 2019,
  },
  'dpef-2021-en.pdf': { id: 'dpef-2021', title: 'DPEF / Non-Financial Statement 2021', category: 'sustainability-report', year: 2021 },
  'fy-2016-17-bondholders-annual-results-presentation-.pdf': {
    id: 'presentation-fy-2016-17',
    title: 'FY 2016/17 Bondholders Annual Results Presentation',
    category: 'presentation',
    year: 2017,
  },
  'pr-raison-detre-award.pdf': {
    id: 'press-raison-detre-award',
    title: 'Raison d\'Être Award — Press Release',
    category: 'ir-document',
    year: 2023,
  },
  'pr-tereos-brazil-operation.pdf': {
    id: 'press-brazil-operation',
    title: 'Brazil Operations — Press Release',
    category: 'ir-document',
    year: 2022,
  },
  'pr-tereos-tsoi-operation.pdf': {
    id: 'press-tsoi-operation',
    title: 'TSOI Operation — Press Release',
    category: 'ir-document',
    year: 2021,
  },
  'press-release---tereos-increases-its-outlook-for-the-2016-17-financial-year.pdf': {
    id: 'press-outlook-2016-17',
    title: 'Increased Outlook for FY 2016/17 — Press Release',
    category: 'ir-document',
    year: 2017,
  },
  'press-release-tereos-announces-the-sale-of-its-uk-production-site-to-tl-sugars-limited.pdf': {
    id: 'press-uk-site-sale-tl-sugars',
    title: 'UK Production Site Sale to TL Sugars — Press Release',
    category: 'ir-document',
    year: 2024,
  },
  'press-release-tereos-escaut-river-restoration-october-2023.pdf': {
    id: 'press-escaut-river-2023',
    title: 'Escaut River Restoration — Press Release',
    category: 'ir-document',
    year: 2023,
  },
  'press-release-tereos-half-year-results-2023-24-final.pdf': {
    id: 'press-half-year-2023-24',
    title: 'Half-Year Results 2023/24 — Press Release',
    category: 'ir-document',
    year: 2024,
  },
  'press-release-tereos-joins-the-fret21-scheme-eng-final.pdf': {
    id: 'press-fret21-scheme',
    title: 'Fret21 Transport Scheme — Press Release',
    category: 'ir-document',
    year: 2022,
  },
  'press-release-tereos-results-halfyear-2024-2025-en.pdf': {
    id: 'press-half-year-2024-25-alt',
    title: 'Half-Year Results 2024/25 — Press Release',
    category: 'ir-document',
    year: 2025,
  },
  'press-release-tereos-uk-tl-141024.pdf': {
    id: 'press-uk-tl-2024',
    title: 'UK TL Sugars Transaction — Press Release',
    category: 'ir-document',
    year: 2024,
  },
  'press-release-tereos-unveils-new-customer-innovation-centre.pdf': {
    id: 'press-customer-innovation-centre',
    title: 'Customer Innovation Centre — Press Release',
    category: 'ir-document',
    year: 2023,
  },
  'press-release-tereos-x-futerro-from-wheat-to-bioplastics-final.pdf': {
    id: 'press-futerro-bioplastics',
    title: 'Futerro Wheat-to-Bioplastics Partnership — Press Release',
    category: 'ir-document',
    year: 2022,
  },
  'rate016-gb-planche-web.pdf': { id: 'product-brochure-rate016', title: 'Product Brochure — Rate 016', category: 'catalog', year: 2020 },
  'rate017-gb-web-reduce.pdf': { id: 'product-brochure-rate017', title: 'Product Brochure — Rate 017', category: 'catalog', year: 2020 },
  'release-14042025-tereos-has-sold-its-natural-products-trading-activities-1.pdf': {
    id: 'press-natural-products-sale-2025',
    title: 'Sale of Natural Products Trading Activities — Press Release',
    category: 'ir-document',
    year: 2025,
  },
  'results-18-19.pdf': {
    id: 'ir-results-2018-19',
    title: 'FY 2018/19 Results Release',
    category: 'ir-document',
    year: 2019,
  },
  'tereos--cp-prime-filiere--projet-label-bas-carbone.pdf': {
    id: 'press-label-bas-carbone',
    title: 'Label Bas Carbone Project — Press Release',
    category: 'ir-document',
    year: 2023,
  },
  'tereos-2016-10-12---notice-to-the-market.pdf': {
    id: 'ir-notice-market-2016-10',
    title: 'Notice to the Market — October 2016',
    category: 'ir-document',
    year: 2016,
  },
  'tereos-2019-20-annual-results.pdf': {
    id: 'ir-annual-results-2019-20',
    title: 'Annual Results 2019/20 — Financial Release',
    category: 'ir-document',
    year: 2020,
  },
  'tereos-2020-21-annual-results-press-release-2021-06-02-eng.pdf': {
    id: 'press-annual-results-2020-21',
    title: 'Annual Results 2020/21 — Press Release',
    category: 'ir-document',
    year: 2021,
  },
  'tereos-announces-a-potential-subordinated-perpetual-securities-issue.pdf': {
    id: 'ir-subordinated-securities-issue',
    title: 'Potential Subordinated Perpetual Securities Issue',
    category: 'ir-document',
    year: 2020,
  },
  'tereos-cp-280525-en.pdf': {
    id: 'press-2025-05-28',
    title: 'Press Release — 28 May 2025',
    category: 'ir-document',
    year: 2025,
  },
  'tereos-group-audited-consolidated-financial-statements-18-19.pdf': {
    id: 'financial-statements-2018-19',
    title: 'Audited Consolidated Financial Statements 2018/19',
    category: 'ir-document',
    year: 2019,
  },
  'tereos-group-financial-release-02182019-0.pdf': {
    id: 'ir-financial-release-2019-02',
    title: 'Financial Release — February 2019',
    category: 'ir-document',
    year: 2019,
  },
  'tereos-group-fy-2017-18-annual-results-gb-investor-relations.pdf': {
    id: 'ir-annual-results-2017-18',
    title: 'Annual Results 2017/18 — Investor Relations Release',
    category: 'ir-document',
    year: 2018,
  },
  'tereos-group-h1-2016-17-en-investors-relations.pdf': {
    id: 'ir-half-year-2016-17',
    title: 'Half-Year Results 2016/17 — Investor Relations Release',
    category: 'ir-document',
    year: 2017,
  },
  'tereos-group-results-release-q3-2023-24.pdf': {
    id: 'ir-q3-results-2023-24',
    title: 'Q3 Results 2023/24 — Release',
    category: 'ir-document',
    year: 2024,
  },
  'tereos-notice-euroclear-06-january-2020.pdf': {
    id: 'ir-euroclear-notice-2020-01',
    title: 'Euroclear Notice — January 2020',
    category: 'ir-document',
    year: 2020,
  },
  'tereos-notice-euroclear.pdf': {
    id: 'ir-euroclear-notice',
    title: 'Euroclear Notice',
    category: 'ir-document',
    year: 2019,
  },
  'tereos-offer-announcement-en-12-oct-2020.pdf': {
    id: 'ir-offer-announcement-2020-10',
    title: 'Offer Announcement — October 2020',
    category: 'ir-document',
    year: 2020,
  },
  'tereos-places-succesffully-a-eu400m-7-year-bond-eng.pdf': {
    id: 'ir-bond-placement-eu400m',
    title: '€400m 7-Year Bond Placement — Press Release',
    category: 'ir-document',
    year: 2016,
  },
  'tereos-press-release-2023-24-annual-results.pdf': {
    id: 'press-annual-results-2023-24',
    title: 'Annual Results 2023/24 — Press Release',
    category: 'ir-document',
    year: 2024,
  },
  'tereos-press-release-ensemble-final.pdf': {
    id: 'press-ensemble-partnership',
    title: 'Ensemble Partnership — Press Release',
    category: 'ir-document',
    year: 2023,
  },
  'tereos-prospectus-2016-visa.pdf': {
    id: 'ir-prospectus-2016',
    title: 'Bond Prospectus 2016',
    category: 'ir-document',
    year: 2016,
  },
  'tereos-tap-2016-prospectus-final.pdf': {
    id: 'ir-tap-prospectus-2016',
    title: 'TAP Prospectus 2016',
    category: 'ir-document',
    year: 2016,
  },
};

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function emitEntry(e) {
  const lines = [
    '  {',
    `    id: '${e.id}',`,
    `    path: '${e.path}',`,
    `    filename: '${e.filename}',`,
    `    fileSize: '${e.fileSize}',`,
    `    category: '${e.category}',`,
    `    year: ${e.year},`,
    `    language: 'en',`,
    `    title: '${e.title.replace(/'/g, "\\'")}',`,
  ];
  if (e.category === 'annual-report') lines.push('    coverImage: ANNUAL_COVER,');
  if (e.category === 'sustainability-report') lines.push('    coverImage: ESG_COVER,');
  if (e.category === 'presentation' || e.category === 'ir-document') lines.push('    coverImage: IR_COVER,');
  if (e.gated) lines.push('    gated: true,');
  lines.push('  },');
  return lines.join('\n');
}

const files = fs
  .readdirSync(downloadsDir)
  .filter((f) => f.endsWith('.pdf') && !REGISTERED.has(f) && !SKIP_DUPLICATES.has(f))
  .sort((a, b) => a.localeCompare(b));

const entries = files.map((filename) => {
  const stat = fs.statSync(path.join(downloadsDir, filename));
  const meta = CURATED[filename];
  if (!meta) throw new Error(`Missing curated metadata for ${filename}`);
  return {
    id: meta.id,
    path: `/downloads/${filename}`,
    filename,
    fileSize: formatBytes(stat.size),
    category: meta.category,
    year: meta.year,
    title: meta.title,
    gated: meta.gated,
  };
});

const outPath = path.join(process.cwd(), 'scripts', '.document-entries.generated.txt');
fs.writeFileSync(outPath, entries.map(emitEntry).join('\n'));
console.log(`Wrote ${entries.length} entries to ${outPath}`);
