export interface ProductBuyInfo {
  title: string;
  slug: string;
  price: string;
  buy_url?: string | null;
}

export function getProductBuyTarget(product: ProductBuyInfo) {
  const url = product.buy_url?.trim();
  if (url && url !== '#' && /^https?:\/\//i.test(url)) {
    return { type: 'external' as const, href: url };
  }
  const params = new URLSearchParams({
    product: product.title,
    price: product.price,
    slug: product.slug,
  });
  return { type: 'internal' as const, href: `/contact?${params.toString()}` };
}
