#!/usr/bin/env node
/** Quick scrape of tereos.com pages for /app/uploads/ images */
import { writeFileSync } from 'node:fs';

const pages = [
  'https://www.tereos.com/en/',
  'https://www.tereos.com/en/group/about-us/',
  'https://www.tereos.com/en/group/sustainability/',
  'https://www.tereos.com/en/group/activities-products/sugar/',
  'https://www.tereos.com/en/group/activities-products/bioethanol-biomass/',
  'https://www.tereos.com/en/group/activities-products/starch/',
  'https://www.tereos.com/en/group/activities-products/alcohol/',
  'https://www.tereos.com/en/group/activities-products/proteins/',
  'https://www.tereos.com/en/group/activities-products/organic-products/',
  'https://www.tereos.com/en/group/activities-products/markets/food-and-drink/',
  'https://www.tereos.com/en/group/activities-products/markets/energies/',
  'https://www.tereos.com/en/group/innovation/',
  'https://www.tereos.com/en/group/careers/',
];

const urls = new Set();
for (const page of pages) {
  const r = await fetch(page, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TereosAssetSync/1.0)' } });
  const html = await r.text();
  for (const m of html.matchAll(/(?:https:\/\/www\.tereos\.com)?(\/app\/uploads\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp))/gi)) {
    urls.add(`https://www.tereos.com${m[1].split('?')[0]}`);
  }
}

writeFileSync('scripts/.tereos-image-urls.txt', [...urls].sort().join('\n'));
console.log('Found', urls.size, 'images');
