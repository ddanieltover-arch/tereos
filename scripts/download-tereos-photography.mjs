#!/usr/bin/env node
/**
 * Download curated photography from tereos.com into public/images/tereos/.
 * Sources: Michel Blossier, Greg Gonzalez, and official Tereos media library.
 *
 * Usage: npm run download:photography
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'images', 'tereos');

/** Curated assets — prefer Tereos-credited photography over stock filenames on CDN */
const PHOTOGRAPHY = [
  {
    filename: 'agriculture-beet-irrigation.png',
    url: 'https://www.tereos.com/app/uploads/2023/09/hev-sugar-beet-irrigation-pivotmichel-blossier1504-1-1-1366x534-c-default.png',
  },
  {
    filename: 'factory-connantre.png',
    url: 'https://www.tereos.com/app/uploads/2023/06/connantre-s-factorymichel-blossier3098-1-1366x534-c-default.png',
  },
  {
    filename: 'field-partners.png',
    url: 'https://www.tereos.com/app/uploads/2019/02/tereos-partner-s-field-near-arques--aphidmichel-blossier2368-1-720x540-c-default.png',
  },
  {
    filename: 'lab-origny.jpg',
    url: 'https://www.tereos.com/app/uploads/2023/06/origny-s-plant-analysis-laboratorygreg-gonzalez8725-scaled-1366x534-c-default.jpg',
  },
  {
    filename: 'plant-worker.png',
    url: 'https://www.tereos.com/app/uploads/2023/06/woman-working-in-the-plant-with-ppegreg-gonzalez8774-2-1-1-1-1366x534-c-default.png',
  },
  {
    filename: 'food-ingredients.png',
    url: 'https://www.tereos.com/app/uploads/2023/06/family-breakfastgetty-images1941-1366x534-c-default.png',
  },
  {
    filename: 'market-food.jpg',
    url: 'https://www.tereos.com/app/uploads/2018/08/marche-alimentaire-et-boisson-1120x418-c-default.jpg',
  },
  {
    filename: 'market-energy.jpg',
    url: 'https://www.tereos.com/app/uploads/2020/09/gettyimages-1126391661-1-1120x418-c-default.jpg',
  },
  {
    filename: 'market-animal-feed.jpg',
    url: 'https://www.tereos.com/app/uploads/2019/02/gettyimages-875237010-1120x418-c-default.jpg',
  },
  {
    filename: 'market-green-chemistry.jpg',
    url: 'https://www.tereos.com/app/uploads/2018/07/green-chemistry-1120x418-c-default.jpg',
  },
  {
    filename: 'market-pharma.jpg',
    url: 'https://www.tereos.com/app/uploads/2018/06/pharma-1120x418-c-default.jpg',
  },
  {
    filename: 'market-paper.jpg',
    url: 'https://www.tereos.com/app/uploads/2019/01/marche-carton-1120x418-c-default.jpg',
  },
  {
    filename: 'market-personal-care.jpg',
    url: 'https://www.tereos.com/app/uploads/2019/01/shutterstock-790705522-1120x418-c-default.jpg',
  },
  {
    filename: 'sustainability-2030.jpg',
    url: 'https://www.tereos.com/app/uploads/2024/03/sustain2030-1920x0-c-center.jpg',
  },
  {
    filename: 'careers-hero.jpeg',
    url: 'https://www.tereos.com/app/uploads/2024/03/carrieres-hero-scaled-2-1920x751-c-default.jpeg',
  },
  {
    filename: 'innovation-lab.jpg',
    url: 'https://www.tereos.com/app/uploads/2023/06/pipette-with-liquidshutterstock7403-scaled-1920x1079-c-default.jpg',
  },
  {
    filename: 'campus.jpg',
    url: 'https://www.tereos.com/app/uploads/2024/03/campus-1080x648-c-center.jpg',
  },
  {
    filename: 'brazil-operations.jpg',
    url: 'https://www.tereos.com/app/uploads/2024/03/femmebrasil-1920x0-c-center.jpg',
  },
  {
    filename: 'renewable-biomass.jpg',
    url: 'https://www.tereos.com/app/uploads/2023/06/shutterstock-737475256-1-scaled-1366x534-c-default.jpg',
  },
  {
    filename: 'news-operations.jpg',
    url: 'https://www.tereos.com/app/uploads/2023/06/woman-working-in-the-plant-with-ppegreg-gonzalez8774-2-1-1-1-1366x534-c-default.png',
  },
  {
    filename: 'news-sustainability.jpg',
    url: 'https://www.tereos.com/app/uploads/2024/03/sustain2030-1920x0-c-center.jpg',
  },
  {
    filename: 'news-investor.jpg',
    url: 'https://www.tereos.com/app/uploads/2023/06/connantre-s-factorymichel-blossier3098-1-1366x534-c-default.png',
  },
  {
    filename: 'product-sugar.jpg',
    url: 'https://www.tereos.com/app/uploads/2018/08/marche-alimentaire-et-boisson-1120x418-c-default.jpg',
  },
  {
    filename: 'product-bioenergy.jpg',
    url: 'https://www.tereos.com/app/uploads/2020/09/gettyimages-1126391661-1-1120x418-c-default.jpg',
  },
  {
    filename: 'product-molasses.jpg',
    url: 'https://www.tereos.com/app/uploads/2019/02/gettyimages-875237010-1120x418-c-default.jpg',
  },
  {
    filename: 'product-biomass.jpg',
    url: 'https://www.tereos.com/app/uploads/2023/06/shutterstock-737475256-1-scaled-1366x534-c-default.jpg',
  },
  {
    filename: 'brand-sugar.jpg',
    url: 'https://www.tereos.com/app/uploads/2018/08/marche-alimentaire-et-boisson-1120x418-c-default.jpg',
  },
  {
    filename: 'brand-premium.jpg',
    url: 'https://www.tereos.com/app/uploads/2023/06/family-breakfastgetty-images1941-1366x534-c-default.png',
  },
  {
    filename: 'brand-brazil.jpg',
    url: 'https://www.tereos.com/app/uploads/2024/03/femmebrasil-1920x0-c-center.jpg',
  },
  {
    filename: 'brand-organic.jpg',
    url: 'https://www.tereos.com/app/uploads/2023/09/hev-sugar-beet-irrigation-pivotmichel-blossier1504-1-1-1366x534-c-default.png',
  },
  {
    filename: 'brand-protein.jpg',
    url: 'https://www.tereos.com/app/uploads/2023/06/pipette-with-liquidshutterstock7403-scaled-1920x1079-c-default.jpg',
  },
  {
    filename: 'brand-ensemble.jpg',
    url: 'https://www.tereos.com/app/uploads/2023/06/family-breakfastgetty-images1941-1366x534-c-default.png',
  },
  {
    filename: 'gerard-clay.jpg',
    url: 'https://www.tereos.com/app/uploads/2022/02/gerard-clay.png',
  },
  {
    filename: 'olivier-leducq.jpg',
    url: 'https://www.tereos.com/app/uploads/2023/09/olivier-leducq-directeur-general-tereos-scaled.jpg',
  },
  {
    filename: 'gwenael-elies.jpg',
    url: 'https://www.tereos.com/app/uploads/2022/02/sans-titre-1.png',
  },
  {
    filename: 'jerome-verrie.jpg',
    url: 'https://www.tereos.com/app/uploads/2020/08/sans-titre.png',
  },
];

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function downloadOne({ filename, url }) {
  const target = path.join(outDir, filename);
  if (await fileExists(target)) {
    return { filename, skipped: true };
  }

  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TereosAssetSync/1.0)' },
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length < 1024) {
    throw new Error('File too small');
  }

  await writeFile(target, buffer);
  return { filename, bytes: buffer.length };
}

async function main() {
  await mkdir(outDir, { recursive: true });

  let ok = 0;
  let skipped = 0;
  let failed = 0;

  for (const item of PHOTOGRAPHY) {
    process.stdout.write(`${item.filename} ... `);
    try {
      const result = await downloadOne(item);
      if (result.skipped) {
        skipped++;
        console.log('skip (exists)');
      } else {
        ok++;
        console.log(`ok (${Math.round(result.bytes / 1024)} KB)`);
      }
    } catch (error) {
      failed++;
      console.log(`FAIL — ${error.message}`);
    }
  }

  console.log(`\nDone: ${ok} downloaded, ${skipped} skipped, ${failed} failed.`);
  if (failed > 0) process.exitCode = 1;
}

main();
