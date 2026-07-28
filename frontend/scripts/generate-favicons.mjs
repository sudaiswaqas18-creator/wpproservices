import sharp from 'sharp';
import { writeFileSync } from 'fs';

const input = 'public/logo-light.png';
const meta = await sharp(input).metadata();
const { width = 849, height = 258 } = meta;

// Square crop of the icon mark on the left of the full logo
const cropWidth = Math.round(height * 1.05);
const icon = await sharp(input)
  .extract({ left: 0, top: 0, width: Math.min(cropWidth, width), height })
  .resize(height, height, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();

const sizes = [
  ['public/logo-icon.png', 512],
  ['public/favicon-32.png', 32],
  ['public/favicon-16.png', 16],
  ['public/apple-touch-icon.png', 180],
  ['public/favicon-192.png', 192],
];

for (const [out, size] of sizes) {
  await sharp(icon).resize(size, size).png().toFile(out);
  console.log('wrote', out, size);
}

// SVG favicon with embedded high-res icon for crisp tab display
const base64 = icon.toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${height} ${height}" role="img" aria-label="WPServices">
  <image width="${height}" height="${height}" xlink:href="data:image/png;base64,${base64}"/>
</svg>`;
writeFileSync('public/favicon.svg', svg);
console.log('wrote public/favicon.svg');
