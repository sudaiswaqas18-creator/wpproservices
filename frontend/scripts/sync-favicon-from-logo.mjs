import sharp from 'sharp';
import fs from 'fs';

const logoPath = 'public/logo-light.png';
const meta = await sharp(logoPath).metadata();
console.log('logo', meta.width, meta.height, 'alpha=', meta.hasAlpha);

await sharp({
  create: {
    width: meta.width + 40,
    height: 80,
    channels: 4,
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  },
})
  .composite([
    {
      input: await sharp(logoPath).resize({ height: 56 }).png().toBuffer(),
      left: 20,
      top: 12,
    },
  ])
  .png()
  .toFile('public/_preview-current.png');

const h = meta.height;
const cropW = Math.min(Math.round(h * 1.12), meta.width);
const iconRaw = await sharp(logoPath)
  .extract({ left: 0, top: 0, width: cropW, height: h })
  .png()
  .toBuffer();

const icon512 = await sharp(iconRaw)
  .resize(512, 512, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();

fs.writeFileSync('public/logo-icon.png', icon512);
await sharp(icon512).resize(32, 32).png().toFile('public/favicon-32.png');
await sharp(icon512).resize(16, 16).png().toFile('public/favicon-16.png');
await sharp(icon512).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(icon512).resize(192, 192).png().toFile('public/favicon-192.png');

const icon128 = await sharp(icon512).resize(128, 128).png().toBuffer();
const b64 = icon128.toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 128" role="img" aria-label="WPServices">
  <image width="128" height="128" href="data:image/png;base64,${b64}"/>
</svg>`;
fs.writeFileSync('public/favicon.svg', svg);

console.log('done — favicon matches logo icon');
