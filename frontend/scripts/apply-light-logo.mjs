import sharp from 'sharp';
import fs from 'fs';

const SRC =
  'C:/Users/User/.cursor/projects/c-Users-User-Downloads-wpproservices/assets/c__Users_User_AppData_Roaming_Cursor_User_workspaceStorage_f93e27646bc910cfd86c19c7a047ef7c_images_wan2.7-image_a_is_image_ko_enhanced__1_-8d3ab287-78db-4347-8950-a44d25f6e42d.png';

const OUT = 'public/logo-light.png';

const meta = await sharp(SRC).metadata();
console.log('source', meta.width, 'x', meta.height);

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const w = info.width;
const h = info.height;
const px = Buffer.from(data);
const visited = new Uint8Array(w * h);
const queue = [];

function isNearWhite(o) {
  const r = px[o];
  const g = px[o + 1];
  const b = px[o + 2];
  // Strict white only — keep grey tagline & purple/orange intact
  return r >= 250 && g >= 250 && b >= 250;
}

function push(x, y) {
  if (x < 0 || y < 0 || x >= w || y >= h) return;
  const idx = y * w + x;
  if (visited[idx]) return;
  visited[idx] = 1;
  queue.push(idx);
}

for (let x = 0; x < w; x++) {
  push(x, 0);
  push(x, h - 1);
}
for (let y = 0; y < h; y++) {
  push(0, y);
  push(w - 1, y);
}

while (queue.length) {
  const idx = queue.shift();
  const o = idx * 4;
  if (!isNearWhite(o)) continue;
  px[o + 3] = 0;
  const x = idx % w;
  const y = (idx / w) | 0;
  push(x + 1, y);
  push(x - 1, y);
  push(x, y + 1);
  push(x, y - 1);
}

// Soften hard white fringe on edges (anti-alias)
for (let i = 0; i < px.length; i += 4) {
  if (px[i + 3] === 0) continue;
  const r = px[i];
  const g = px[i + 1];
  const b = px[i + 2];
  if (r >= 252 && g >= 252 && b >= 252) {
    px[i + 3] = 0;
  }
}

let buf = await sharp(px, {
  raw: { width: w, height: h, channels: 4 },
})
  .trim({ threshold: 5 })
  .png()
  .toBuffer();

const trimmed = await sharp(buf).metadata();
console.log('trimmed', trimmed.width, 'x', trimmed.height);

// Match previous light logo canvas height used on site (~258)
buf = await sharp(buf)
  .resize({
    height: 258,
    fit: 'inside',
    kernel: sharp.kernel.lanczos3,
  })
  .png({ compressionLevel: 6, effort: 10 })
  .toBuffer();

fs.writeFileSync(OUT, buf);
const final = await sharp(buf).metadata();
console.log('wrote', OUT, final.width, 'x', final.height, buf.length, 'bytes');

// Preview on white header-like strip
await sharp({
  create: {
    width: final.width + 48,
    height: 72,
    channels: 4,
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  },
})
  .composite([
    {
      input: await sharp(buf).resize({ height: 56 }).png().toBuffer(),
      left: 24,
      top: Math.round((72 - 56) / 2),
    },
  ])
  .png()
  .toFile('public/_header-logo-preview.png');

console.log('preview written public/_header-logo-preview.png');
