import sharp from 'sharp';
import fs from 'fs';

const SRC =
  'C:/Users/User/.cursor/projects/c-Users-User-Downloads-wpproservices/assets/logo-light-enhanced.png';

const meta = await sharp(SRC).metadata();
console.log('gen', meta.width, meta.height);

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const w = info.width;
const h = info.height;
const px = Buffer.from(data);
const visited = new Uint8Array(w * h);
const q = [];

const isBg = (o) => px[o] >= 248 && px[o + 1] >= 248 && px[o + 2] >= 248;
const push = (x, y) => {
  if (x < 0 || y < 0 || x >= w || y >= h) return;
  const i = y * w + x;
  if (visited[i]) return;
  visited[i] = 1;
  q.push(i);
};

for (let x = 0; x < w; x++) {
  push(x, 0);
  push(x, h - 1);
}
for (let y = 0; y < h; y++) {
  push(0, y);
  push(w - 1, y);
}

while (q.length) {
  const i = q.shift();
  const o = i * 4;
  if (!isBg(o)) continue;
  px[o + 3] = 0;
  const x = i % w;
  const y = (i / w) | 0;
  push(x + 1, y);
  push(x - 1, y);
  push(x, y + 1);
  push(x, y - 1);
}

for (let i = 0; i < px.length; i += 4) {
  if (px[i + 3] && px[i] > 250 && px[i + 1] > 250 && px[i + 2] > 250) {
    px[i + 3] = 0;
  }
}

let buf = await sharp(px, {
  raw: { width: w, height: h, channels: 4 },
})
  .trim({ threshold: 5 })
  .png()
  .toBuffer();

buf = await sharp(buf)
  .resize({ height: 516, fit: 'inside', kernel: sharp.kernel.lanczos3 })
  .png()
  .toBuffer();

fs.writeFileSync('public/logo-light.png', buf);
const fm = await sharp(buf).metadata();
console.log('logo-light', fm.width, 'x', fm.height, buf.length);

const cropW = Math.min(Math.round(fm.height * 1.12), fm.width);
const icon = await sharp(buf)
  .extract({ left: 0, top: 0, width: cropW, height: fm.height })
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
    width: 720,
    height: 100,
    channels: 4,
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  },
})
  .composite([
    {
      input: await sharp(buf).resize({ height: 64 }).png().toBuffer(),
      left: 24,
      top: 18,
    },
  ])
  .png()
  .toFile('public/_final-preview.png');

console.log('done');
