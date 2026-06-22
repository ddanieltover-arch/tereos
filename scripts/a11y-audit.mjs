#!/usr/bin/env node
/**
 * Automated WCAG accessibility audit using axe-core + Playwright.
 *
 * Usage:
 *   npm run build && npm run start &
 *   npm run audit:a11y
 *
 * Env:
 *   AUDIT_URL                  Base URL (default http://localhost:3000)
 *   A11Y_FAIL_ON_VIOLATIONS    Set to "false" to report without failing (default "true")
 */
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { A11Y_PAGES } from './a11y-config.mjs';

const BASE_URL = process.env.AUDIT_URL || 'http://localhost:3000';
const FAIL_ON_VIOLATIONS = process.env.A11Y_FAIL_ON_VIOLATIONS !== 'false';

async function auditPage(page, path) {
  const url = `${BASE_URL}${path}`;
  await page.goto(url, { waitUntil: 'load', timeout: 120_000 });
  await page.waitForFunction(
    () => document.documentElement.lang.length > 0 && document.title.trim().length > 0,
    { timeout: 60_000 }
  );
  await page.waitForTimeout(750);

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  return { path, url, violations: results.violations };
}

async function main() {
  console.log('Tereos axe accessibility audit');
  console.log('================================\n');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Pages: ${A11Y_PAGES.length}\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  let totalViolations = 0;
  const summary = [];

  for (const path of A11Y_PAGES) {
    process.stdout.write(`Scanning ${path}... `);
    try {
      const { violations } = await auditPage(page, path);
      totalViolations += violations.length;
      summary.push({ path, count: violations.length });
      console.log(`${violations.length} violation(s)`);

      for (const violation of violations) {
        console.log(`  [${violation.impact}] ${violation.id}: ${violation.help}`);
        for (const node of violation.nodes.slice(0, 3)) {
          console.log(`    → ${node.target.join(' ')}`);
        }
        if (violation.nodes.length > 3) {
          console.log(`    … and ${violation.nodes.length - 3} more node(s)`);
        }
      }
    } catch (error) {
      console.log('FAILED');
      console.error(`  ${error instanceof Error ? error.message : error}`);
      totalViolations += 1;
    }
  }

  await browser.close();

  console.log('\n--- Summary ---');
  for (const row of summary) {
    console.log(`${row.path}: ${row.count}`);
  }
  console.log(`Total violations: ${totalViolations}`);

  if (FAIL_ON_VIOLATIONS && totalViolations > 0) {
    console.error('\nAccessibility audit failed.');
    process.exit(1);
  }

  console.log('\nAccessibility audit passed.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
