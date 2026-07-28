import { Helmet } from 'react-helmet-async';
import { SITE } from '../../config/site';

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  keywords?: string;
  noindex?: boolean;
  image?: string;
  type?: string;
}

export default function SEO({
  title,
  description,
  path = '',
  keywords,
  noindex = false,
  image,
  type = 'website',
}: SEOProps) {
  const url = `${SITE.url}${path || ''}`;
  const ogImage = image ? (image.startsWith('http') ? image : `${SITE.url}${image}`) : `${SITE.url}${SITE.ogImage}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
