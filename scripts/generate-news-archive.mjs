/**
 * Regenerate lib/content/news-archive.seed.json from the TypeScript archive builder.
 */

import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const runScript = join(root, 'scripts', 'generate-news-archive-run.ts');

execSync(`npx --yes tsx "${runScript}"`, {
  stdio: 'inherit',
  cwd: root,
});
