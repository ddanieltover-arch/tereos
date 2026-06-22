#!/usr/bin/env node
/**
 * Download public PDFs from tereos.com into public/downloads/.
 *
 * Usage: node scripts/download-reference-pdfs.mjs
 */
import { mkdir, writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'downloads');

const REFERENCE_PDFS = [
  {
    filename: 'annual-report-2024-25.pdf',
    url: 'https://www.tereos.com/app/uploads/2025/07/annual-report-24-25.pdf',
  },
  {
    filename: 'non-financial-statement-2024-25.pdf',
    url: 'https://www.tereos.com/app/uploads/2025/07/tereos-non-financial-statement-2024-25.pdf',
  },
  {
    filename: 'ethical-charter-2025.pdf',
    url: 'https://www.tereos.com/app/uploads/2025/07/ethical-charter-2025-tereos.pdf',
  },
  {
    filename: 'sustainability-report-2024.pdf',
    url: 'https://www.tereos.com/app/uploads/2025/10/memoria-sostenibilidad-2024.pdf',
  },
  {
    filename: 'press-annual-results-2025-26.pdf',
    url: 'https://www.tereos.com/app/uploads/2026/05/tereos-2025-26-financial-results-press-release.pdf',
  },
  {
    filename: 'press-half-year-2025.pdf',
    url: 'https://www.tereos.com/app/uploads/2025/11/20251121-pr-tereos-half-year-financial-results.pdf',
  },
  {
    filename: 'press-cdp-rating-2026.pdf',
    url: 'https://www.tereos.com/app/uploads/2026/01/cp-tereos-cdp-rating.pdf',
  },
  {
    filename: 'press-bioenergy-saf-2026.pdf',
    url: 'https://www.tereos.com/app/uploads/2026/06/pr-tereos-rebound-.pdf',
  },
];

function isPdf(buffer) {
  return buffer.length > 4 && buffer.subarray(0, 4).toString('ascii') === '%PDF';
}

async function downloadOne({ filename, url }) {
  const target = path.join(outDir, filename);
  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TereosAssetSync/1.0)' },
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  if (!isPdf(buffer)) {
    throw new Error('Response is not a PDF');
  }

  await writeFile(target, buffer);
  return buffer.length;
}

async function main() {
  await mkdir(outDir, { recursive: true });

  let ok = 0;
  let failed = 0;

  for (const item of REFERENCE_PDFS) {
    process.stdout.write(`${item.filename} ... `);
    try {
      const bytes = await downloadOne(item);
      console.log(`OK (${bytes.toLocaleString()} bytes)`);
      ok += 1;
    } catch (error) {
      console.log(`FAILED (${error.message})`);
      failed += 1;
      try {
        await unlink(path.join(outDir, item.filename));
      } catch {
        /* ignore */
      }
    }
  }

  console.log(`\nDone: ${ok} downloaded, ${failed} failed → public/downloads/`);
  if (failed > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
