#!/usr/bin/env node
/**
 * Batch-download IR / presentation PDFs from tereos.com finance pages.
 *
 * Usage: node scripts/download-financial-pdfs.mjs [--dry-run]
 */
import { mkdir, readdir, writeFile, unlink, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'downloads');
const dryRun = process.argv.includes('--dry-run');

const FINANCE_PAGES = [
  'https://www.tereos.com/en/group/finance/financial-information/',
  'https://www.tereos.com/en/group/finance/annual-results/',
  'https://www.tereos.com/en/group/finance/annual-report/',
  'https://www.tereos.com/en/group/finance/regulated-information/',
  'https://www.tereos.com/en/group/finance/',
];

/** Known finance PDFs not always returned by WP media API */
const CURATED_FINANCIAL_PDFS = [
  'https://www.tereos.com/app/uploads/2025/01/tereos-update-january-2025-1.pdf',
  'https://www.tereos.com/app/uploads/2024/11/tereos-presentation-half-year-2024-25-1.pdf',
  'https://www.tereos.com/app/uploads/2024/05/tereos-presentation-full-year-2023-24.pdf',
  'https://www.tereos.com/app/uploads/2023/12/tereos-presentation-half-year-2023-24-1.pdf',
  'https://www.tereos.com/app/uploads/2023/06/tereos-presentation-full-year-2022-23.pdf',
  'https://www.tereos.com/app/uploads/2022/12/tereos-presentation-half-year-2022-23-1.pdf',
  'https://www.tereos.com/app/uploads/2022/06/tereos-presentation-full-year-2021-22.pdf',
  'https://www.tereos.com/app/uploads/2021/11/tereos-bondholders-presentation-h1-2021-22.pdf',
  'https://www.tereos.com/app/uploads/2021/06/tereos-2020-21-annual-results-presentation-2021-06-02-1.pdf',
  'https://www.tereos.com/app/uploads/2020/11/tereos-h1-2020-21-half-year-results-presentation.pdf',
  'https://www.tereos.com/app/uploads/2021/06/tereos-presentation-press-conference-2021-final-version-en.pdf',
];

/** Prefer these filename suffixes when deduping same base name */
const PREFERRED_SUFFIX = ['-1.pdf', '.pdf'];

const IR_PATTERNS = [
  /presentation/i,
  /results-release/i,
  /consolidated-financial/i,
  /financial-statements/i,
  /tereos-update/i,
  /disclosure-document/i,
  /annual-results/i,
  /bondholders/i,
  /credit-update/i,
];

function isIrPdf(filename) {
  return IR_PATTERNS.some((re) => re.test(filename));
}

function basenameFromUrl(url) {
  const clean = url.replace(/%7D$/i, '').split('?')[0];
  return decodeURIComponent(clean.split('/').pop() ?? '');
}

function isPdfBuffer(buffer) {
  return buffer.length > 4 && buffer.subarray(0, 4).toString('ascii') === '%PDF';
}

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TereosAssetSync/1.0)' },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

function extractPdfUrls(html) {
  const urls = new Set();
  for (const m of html.matchAll(/https?:\/\/[^"'\\s<>]+\.pdf/gi)) {
    urls.add(m[0].replace(/%7D$/i, ''));
  }
  return [...urls];
}

async function fetchWpMediaPdfs() {
  const urls = new Set();
  for (let page = 1; page <= 40; page += 1) {
    const api = `https://www.tereos.com/wp-json/wp/v2/media?per_page=100&page=${page}&media_type=application`;
    const res = await fetch(api, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TereosAssetSync/1.0)' },
    });
    if (res.status === 400) break;
    if (!res.ok) throw new Error(`WP API HTTP ${res.status} page ${page}`);
    const items = await res.json();
    if (!Array.isArray(items) || items.length === 0) break;
    for (const item of items) {
      if (item.mime_type === 'application/pdf' && item.source_url) {
        urls.add(item.source_url.replace(/^http:\/\//i, 'https://'));
      }
    }
    if (items.length < 100) break;
  }
  return [...urls];
}

/** When multiple URLs map to similar files, pick best URL per canonical basename */
function dedupeUrls(urls) {
  const byBase = new Map();
  for (const url of urls) {
    const filename = basenameFromUrl(url);
    if (!isIrPdf(filename)) continue;
    const baseKey = filename.replace(/-1\.pdf$/i, '.pdf').replace(/-2\.pdf$/i, '.pdf');
    const existing = byBase.get(baseKey);
    if (!existing) {
      byBase.set(baseKey, url);
      continue;
    }
    const existingName = basenameFromUrl(existing);
    // Prefer -1 variant (reference site canonical)
    if (filename.endsWith('-1.pdf') && !existingName.endsWith('-1.pdf')) {
      byBase.set(baseKey, url);
    }
  }
  return [...byBase.values()];
}

async function downloadOne(url, filename, attempts = 4) {
  const target = path.join(outDir, filename);
  let lastError;
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TereosAssetSync/1.0)' },
        redirect: 'follow',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      if (!isPdfBuffer(buffer)) throw new Error('Not a PDF');
      await writeFile(target, buffer);
      return buffer.length;
    } catch (error) {
      lastError = error;
      if (i < attempts - 1) {
        await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
      }
    }
  }
  throw lastError;
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const existing = new Set((await readdir(outDir)).filter((f) => f.endsWith('.pdf')));

  const discovered = new Set();
  for (const page of FINANCE_PAGES) {
    const html = await fetchText(page);
    for (const u of extractPdfUrls(html)) discovered.add(u);
    console.error(`Scraped ${page}: ${extractPdfUrls(html).length} links`);
  }

  const wpUrls = await fetchWpMediaPdfs();
  console.error(`WP API: ${wpUrls.length} PDF attachments scanned`);
  for (const u of wpUrls) discovered.add(u);
  for (const u of CURATED_FINANCIAL_PDFS) discovered.add(u);

  const candidates = dedupeUrls([...discovered]).sort((a, b) =>
    basenameFromUrl(a).localeCompare(basenameFromUrl(b))
  );

  const toDownload = candidates.filter((url) => {
    const filename = basenameFromUrl(url);
    return !existing.has(filename);
  });

  console.error(`\nIR PDFs discovered: ${candidates.length}`);
  console.error(`Already on disk: ${candidates.length - toDownload.length}`);
  console.error(`To download: ${toDownload.length}\n`);

  if (dryRun) {
    for (const url of toDownload) console.log(basenameFromUrl(url));
    return;
  }

  let ok = 0;
  let failed = 0;
  const manifest = [];

  for (const url of toDownload) {
    const filename = basenameFromUrl(url);
    process.stdout.write(`${filename} ... `);
    try {
      const bytes = await downloadOne(url, filename);
      console.log(`OK (${bytes.toLocaleString()} bytes)`);
      manifest.push({ filename, url, fileSize: formatBytes(bytes) });
      ok += 1;
      await new Promise((r) => setTimeout(r, 400));
    } catch (error) {
      console.log(`FAILED (${error.message}${error.cause?.code ? ` / ${error.cause.code}` : ''})`);
      failed += 1;
      try {
        await unlink(path.join(outDir, filename));
      } catch {
        /* ignore */
      }
    }
  }

  const manifestPath = path.join(__dirname, '.financial-download-manifest.json');
  if (manifest.length > 0) {
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
    console.error(`\nManifest → ${manifestPath}`);
  }

  console.log(`\nDone: ${ok} downloaded, ${failed} failed → public/downloads/`);
  if (failed > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
