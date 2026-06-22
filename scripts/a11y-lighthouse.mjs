#!/usr/bin/env node
/**
 * Lighthouse accessibility score gate for CI.
 *
 * Usage:
 *   npm run build && npm run start &
 *   npm run audit:a11y:lighthouse
 */
import { spawn } from 'node:child_process';
import { A11Y_LIGHTHOUSE_MIN_SCORE, A11Y_PAGES } from './a11y-config.mjs';

const BASE_URL = process.env.AUDIT_URL || 'http://localhost:3000';

function runLighthouse(url) {
  return new Promise((resolve, reject) => {
    const args = [
      url,
      '--quiet',
      '--chrome-flags=--headless --no-sandbox',
      '--only-categories=accessibility',
      '--output=json',
      '--output-path=stdout',
    ];

    const child = spawn('npx', ['lighthouse', ...args], {
      shell: true,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    child.stdout.on('data', (chunk) => {
      stdout += chunk;
    });
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
  console.log('Tereos Lighthouse accessibility gate');
  console.log('===================================\n');
  console.log(`Minimum score: ${A11Y_LIGHTHOUSE_MIN_SCORE}\n`);

  let failed = false;

  for (const path of A11Y_PAGES) {
    const url = `${BASE_URL}${path}`;
    process.stdout.write(`${path}... `);
    try {
      const report = await runLighthouse(url);
      const score = Math.round((report.categories.accessibility?.score ?? 0) * 100);
      const ok = score >= A11Y_LIGHTHOUSE_MIN_SCORE;
      console.log(`${score}/100 ${ok ? 'OK' : 'FAIL'}`);
      if (!ok) failed = true;
    } catch (error) {
      console.log('ERROR');
      console.error(`  ${error instanceof Error ? error.message : error}`);
      failed = true;
    }
  }

  if (failed) {
    console.error('\nLighthouse accessibility gate failed.');
    process.exit(1);
  }

  console.log('\nLighthouse accessibility gate passed.');
}

main();
