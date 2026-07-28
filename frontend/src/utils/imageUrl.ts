/** Resize/compress remote images (Unsplash) for display size + WebP. */
export function optimizeImageUrl(url: string | undefined | null, width = 640): string {
  if (!url) return '';
  try {
    if (!url.includes('images.unsplash.com')) return url;
    const u = new URL(url);
    u.searchParams.set('auto', 'format');
    u.searchParams.set('fit', 'crop');
    u.searchParams.set('w', String(width));
    u.searchParams.set('q', '70');
    u.searchParams.set('fm', 'webp');
    return u.toString();
  } catch {
    return url;
  }
}
