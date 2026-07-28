export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function parseJsonField(val) {
  if (!val) return [];
  return typeof val === 'string' ? JSON.parse(val) : val;
}
