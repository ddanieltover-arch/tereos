#!/usr/bin/env node
/**
 * Download official Tereos homepage hero video and poster.
 * Video: tereos.com purpose film (EN). Poster: sugar-beet irrigation (Michel Blossier).
 *
 * Usage: npm run download:hero
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const ASSETS = [
  {
    url: 'https://www.tereos.com/app/uploads/2024/06/2024-06-05-raison-detre-tereos-eng-35mo.mp4',
    target: path.join(root, 'public', 'videos', 'hero.mp4'),
  },
  {
    url: 'https://www.tereos.com/app/uploads/2023/09/hev-sugar-beet-irrigation-pivotmichel-blossier1504-1-1-1920x751-c-default.png',
    target: path.join(root, 'public', 'images', 'hero-poster.png'),
  },
];

async function download({ url, target }) {
  await mkdir(path.dirname(target), { recursive: true });
  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TereosAssetSync/1.0)' },
  });
  if (!response.ok) {
    throw new Error(`${url} → HTTP ${response.status}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(target, buffer);
  const kb = Math.round(buffer.length / 1024);
  console.log(`ok ${path.relative(root, target)} (${kb} KB)`);
}

for (const asset of ASSETS) {
  await download(asset);
}

console.log('Homepage hero assets updated.');
