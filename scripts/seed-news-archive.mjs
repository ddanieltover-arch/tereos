/**
 * Seed the full news archive into Sanity CMS.
 *
 * Prerequisites:
 *   1. npm run generate:news-archive   (refresh seed JSON from document registry)
 *   2. Sanity project configured in .env.local
 *   3. npm run sanity:deploy
 *
 * Usage: npm run sanity:seed:news
 */

import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';

config({ path: '.env.local' });

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('Missing SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

const seedPath = path.join(process.cwd(), 'lib/content/news-archive.seed.json');
if (!fs.existsSync(seedPath)) {
  console.error('Missing lib/content/news-archive.seed.json — run npm run generate:news-archive first');
  process.exit(1);
}

const entries = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

const id = (slug) => `newsArticle-${slug}`;

async function seedNewsArchive() {
  console.log(`Seeding ${entries.length} news articles to ${projectId}/${dataset}...`);

  const batchSize = 50;
  for (let i = 0; i < entries.length; i += batchSize) {
    const batch = entries.slice(i, i + batchSize);
    const transaction = client.transaction();

    for (const entry of batch) {
      transaction.createOrReplace({
        _id: id(entry.slug),
        _type: 'newsArticle',
        title: entry.title,
        slug: { _type: 'slug', current: entry.slug },
        category: entry.category,
        publishedAt: entry.publishedAt,
        excerpt: entry.excerpt,
        body: entry.body,
        imageUrl: entry.imageUrl,
        author: entry.author,
        pdfUrl: entry.pdfUrl,
        featured: entry.featured ?? false,
      });
    }

    await transaction.commit();
    console.log(`  committed ${Math.min(i + batchSize, entries.length)} / ${entries.length}`);
  }

  console.log('News archive seed complete.');
}

seedNewsArchive().catch((err) => {
  console.error('News seed failed:', err.message);
  process.exit(1);
});
