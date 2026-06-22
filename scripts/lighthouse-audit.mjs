#!/usr/bin/env node
/**
 * Lighthouse audit helper for Tereos corporate site.
 * Usage: npm run build && npm run start & npm run audit:lighthouse
 */
import { spawn } from 'node:child_process';

const BASE_URL = process.env.AUDIT_URL || 'http://localhost:3000';
const PAGES = [
  '/en',
  '/en/about',
  '/en/products',
  '/en/sustainability',
  '/en/news-media',
  '/en/contact',
];

const categories = ['performance', 'accessibility', 'best-practices', 'seo'];

function runLighthouse(url) {
  return new Promise((resolve, reject) => {
    const args = [
      url,
      '--quiet',
      '--chrome-flags=--headless --no-sandbox',
      `--only-categories=${categories.join(',')}`,
      '--output=json',
      '--output-path=stdout',
    ];

    const child = spawn('npx', ['lighthouse', ...args], {
      shell: true,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    child.stdout.on('data', (d) => (stdout += d));
    child.on('close', (code) => {
      if (code !== 0) return reject(new Error(`Lighthouse failed for ${url}`));
      try {
        resolve(JSON.parse(stdout));
      } catch {
        reject(new Error(`Invalid JSON from Lighthouse for ${url}`));
      }
    });
  });
}

async function main() {
  console.log('Tereos Lighthouse Audit');
  console.log('=======================\n');

  const results = [];

  for (const path of PAGES) {
    const url = `${BASE_URL}${path}`;
    process.stdout.write(`Auditing ${path}... `);
    try {
      const report = await runLighthouse(url);
      const scores = Object.fromEntries(
        categories.map((cat) => [
          cat,
          Math.round((report.categories[cat]?.score ?? 0) * 100),
        ])
      );
      results.push({ path, scores });
      console.log(
        `P:${scores.performance} A:${scores.accessibility} BP:${scores['best-practices']} SEO:${scores.seo}`
      );
    } catch (err) {
      console.log('FAILED');
      console.error(`  ${err.message}`);
      console.error('  Ensure the server is running and lighthouse is available via npx.');
    }
  }

  if (results.length) {
    console.log('\n--- Summary ---');
    for (const cat of categories) {
      const avg = Math.round(
        results.reduce((sum, r) => sum + r.scores[cat], 0) / results.length
      );
      console.log(`${cat}: ${avg}/100 avg`);
    }
  }
}

main();
