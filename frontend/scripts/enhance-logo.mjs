import sharp from 'sharp';
import fs from 'fs';

const SRC = 'public/logo-light.png';
const OUT = 'public/logo-light.png';

const meta = await sharp(SRC).metadata();
console.log('before', meta.width, 'x', meta.height);

// 1) Upscale 3× with Lanczos for detail recovery
let img = sharp(SRC).ensureAlpha().resize({
  width: meta.width * 3,
  height: meta.height * 3,
  kernel: sharp.kernel.lanczos3,
});

// 2) Mild sharpen — clarity without redesign
img = img.sharpen({
  sigma: 1.2,
  m1: 1.0,
  m2: 0.5,
  x1: 2,
  y2: 10,
  y3: 20,
});

let buf = await img.png({ compressionLevel: 6, effort: 10 }).toBuffer();

// 3) Keep 2× master for retina (sharp at 56–68px display)
const targetH = 516; // 2× previous 258
buf = await sharp(buf)
  .resize({
    height: targetH,
    fit: 'inside',
    kernel: sharp.kernel.lanczos3,
  })
  .sharpen({ sigma: 0.6, m1: 0.8, m2: 0.4 })
  .png({ compressionLevel: 6 })
  .toBuffer();

// 4) Soft cleanup of leftover near-white fringe
const { data, info } = await sharp(buf)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const px = Buffer.from(data);
for (let i = 0; i < px.length; i += 4) {
  const r = px[i];
  const g = px[i + 1];
  const b = px[i + 2];
  const a = px[i + 3];
  if (a === 0) continue;
  // kill residual white halo that causes “box” look on white headers
  if (r > 248 && g > 248 && b > 248) {
    px[i + 3] = 0;
  } else if (r > 240 && g > 240 && b > 240 && a < 220) {
    px[i + 3] = Math.max(0, a - 80);
  }
}

buf = await sharp(px, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim({ threshold: 2 })
  .png({ compressionLevel: 6 })
  .toBuffer();

fs.writeFileSync(OUT, buf);
const final = await sharp(buf).metadata();
console.log('after', final.width, 'x', final.height, buf.length, 'bytes');

// Preview strip
await sharp({
  create: {
    width: Math.min(final.width, 900) + 40,
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
  .toFile('public/_enhanced-preview.png');

// Favicon from enhanced icon (same design)
const h = final.height;
const cropW = Math.min(Math.round(h * 1.12), final.width);
const icon = await sharp(buf)
  .extract({ left: 0, top: 0, width: cropW, height: h })
  .resize(512, 512, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
    kernel: sharp.kernel.lanczos3,
  })
  .sharpen({ sigma: 0.8 })
  .png()
  .toBuffer();

fs.writeFileSync('public/logo-icon.png', icon);
await sharp(icon).resize(32, 32).png().toFile('public/favicon-32.png');
await sharp(icon).resize(16, 16).png().toFile('public/favicon-16.png');
await sharp(icon).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(icon).resize(192, 192).png().toFile('public/favicon-192.png');

const icon128 = await sharp(icon).resize(128, 128).png().toBuffer();
fs.writeFileSync(
  'public/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 128" role="img" aria-label="WPServices"><image width="128" height="128" href="data:image/png;base64,${icon128.toString('base64')}"/></svg>`
);

console.log('enhanced logo + matching favicon ready');
