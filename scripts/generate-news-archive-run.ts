import { getNewsArchive, getNewsArchiveForSanitySeed } from '../lib/content/news-archive';
import fs from 'fs';

const archive = getNewsArchive();
const seed = getNewsArchiveForSanitySeed();
fs.writeFileSync('lib/content/news-archive.seed.json', JSON.stringify(seed, null, 2) + '\n');
console.log(
  'Generated',
  seed.length,
  'entries (' + archive.filter((a) => a.newsroomType === 'press-release').length + ' press releases)'
);
