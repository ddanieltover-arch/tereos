import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const assetsDir =
  'C:/Users/User/.cursor/projects/c-Users-User-Desktop-Tereos/assets';

const LOGO_SRC =
  `${assetsDir}/c__Users_User_AppData_Roaming_Cursor_User_workspaceStorage_11d6301dbdc6f7ff0eb1e7cd7c2d4ebf_images_image-ef2d8f97-2545-4f62-bab2-56029a54a429.png`;
const ICON_SRC =
  `${assetsDir}/c__Users_User_AppData_Roaming_Cursor_User_workspaceStorage_11d6301dbdc6f7ff0eb1e7cd7c2d4ebf_images_image-5e9ba348-1e41-4545-aed6-ee7cb6bbf0a8.png`;

const publicImages = join(root, 'public', 'images');
const appDir = join(root, 'app');
const publicDir = join(root, 'public');

mkdirSync(publicImages, { recursive: true });

copyFileSync(LOGO_SRC, join(publicImages, 'tereosa-logo.png'));
copyFileSync(ICON_SRC, join(publicImages, 'tereosa-icon.png'));

const icon = sharp(ICON_SRC);

await Promise.all([
  icon.clone().resize(512, 512).png().toFile(join(publicImages, 'tereosa-icon-512.png')),
  icon.clone().resize(180, 180).png().toFile(join(publicDir, 'apple-touch-icon.png')),
  icon.clone().resize(32, 32).png().toFile(join(publicDir, 'favicon-32x32.png')),
  icon.clone().resize(16, 16).png().toFile(join(publicDir, 'favicon-16x16.png')),
  icon.clone().resize(192, 192).png().toFile(join(publicDir, 'icon-192.png')),
  icon.clone().resize(512, 512).png().toFile(join(publicDir, 'icon-512.png')),
  icon.clone().resize(32, 32).png().toFile(join(appDir, 'icon.png')),
  icon.clone().resize(180, 180).png().toFile(join(appDir, 'apple-icon.png')),
]);

console.log('Brand assets installed.');
