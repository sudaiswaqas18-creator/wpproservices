import sharp from 'sharp';
import fs from 'fs';

const SRC =
  'C:/Users/User/.cursor/projects/c-Users-User-Downloads-wpproservices/assets/logo-light-enhanced.png';

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const w = info.width;
const h = info.height;
const px = Buffer.from(data);

// Transparent out light gray / white canvas
for (let i = 0; i < px.length; i += 4) {
  const r = px[i];
  const g = px[i + 1];
  const b = px[i + 2];
  if (r > 230 && g > 230 && b > 230) {
    px[i + 3] = 0;
  } else if (r > 210 && g > 210 && b > 210 && Math.abs(r - g) < 12 && Math.abs(g - b) < 12) {
    px[i + 3] = 0;
  }
}

let minX = w;
let minY = h;
let maxX = 0;
let maxY = 0;
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const o = (y * w + x) * 4;
    const a = px[o + 3];
    if (a < 40) continue;
    const r = px[o];
    const g = px[o + 1];
    const b = px[o + 2];
    if (r > 230 && g > 230 && b > 230) continue;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
}

const pad = 12;
const left = Math.max(0, minX - pad);
const top = Math.max(0, minY - pad);
const width = Math.min(w - left, maxX - minX + 1 + pad * 2);
const height = Math.min(h - top, maxY - minY + 1 + pad * 2);
console.log({ left, top, width, height, ratio: (width / height).toFixed(2) });

let buf = await sharp(px, { raw: { width: w, height: h, channels: 4 } })
  .extract({ left, top, width, height })
  .png()
  .toBuffer();

buf = await sharp(buf)
  .resize({ height: 516, fit: 'inside', kernel: sharp.kernel.lanczos3 })
  .png({ compressionLevel: 6 })
  .toBuffer();

fs.writeFileSync('public/logo-light.png', buf);
const m = await sharp(buf).metadata();
console.log('logo-light', m.width, 'x', m.height, buf.length);

const cropW = Math.min(Math.round(m.height * 1.08), m.width);
const icon = await sharp(buf)
  .extract({ left: 0, top: 0, width: cropW, height: m.height })
  .resize(512, 512, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();

fs.writeFileSync('public/logo-icon.png', icon);
await sharp(icon).resize(32, 32).png().toFile('public/favicon-32.png');
await sharp(icon).resize(16, 16).png().toFile('public/favicon-16.png');
await sharp(icon).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(icon).resize(192, 192).png().toFile('public/favicon-192.png');

const b64 = (await sharp(icon).resize(128, 128).png().toBuffer()).toString('base64');
fs.writeFileSync(
  'public/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="WPServices"><image width="128" height="128" href="data:image/png;base64,${b64}"/></svg>`
);

await sharp({
  create: {
    width: Math.min(m.width, 900) + 40,
    height: 100,
    channels: 4,
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  },
})
  .composite([
    {
      input: await sharp(buf).resize({ height: 64 }).png().toBuffer(),
      left: 20,
      top: 18,
    },
  ])
  .png()
  .toFile('public/_final-preview.png');

console.log('ok');
