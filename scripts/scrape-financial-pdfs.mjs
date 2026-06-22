#!/usr/bin/env node
/** Scrape PDF links from tereos.com financial-information page(s). */
const PAGES = [
  'https://www.tereos.com/en/group/finance/financial-information/',
  'https://www.tereos.com/en/group/finance/annual-results/',
  'https://www.tereos.com/en/group/finance/annual-report/',
  'https://www.tereos.com/en/group/finance/regulated-information/',
];

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TereosAssetSync/1.0)' },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.text();
}

function extractPdfs(html) {
  const urls = new Set();
  for (const m of html.matchAll(/https?:\/\/[^"'\\s<>]+\.pdf/gi)) {
    urls.add(m[0].replace(/%7D$/, '').replace(/\\$/, ''));
  }
  return [...urls];
}

async function main() {
  const all = new Set();
  for (const page of PAGES) {
    const html = await fetchHtml(page);
    for (const u of extractPdfs(html)) all.add(u);
    console.error(`${page}: ${extractPdfs(html).length} PDFs`);
  }
  console.log(JSON.stringify([...all].sort(), null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
