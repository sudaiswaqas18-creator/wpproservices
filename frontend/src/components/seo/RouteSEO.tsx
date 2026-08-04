import { useLocation } from 'react-router-dom';
import { getStaticSEO } from '../../config/seo';
import SEO from './SEO';

export default function RouteSEO() {
  const { pathname } = useLocation();
  const seo = getStaticSEO(pathname);

  if (pathname.startsWith('/admin')) return null;
  if (pathname.match(/^\/services\/[^/]+$/)) return null;
  if (pathname.match(/^\/blog\/[^/]+$/)) return null;
  if (pathname.match(/^\/case-studies\/[^/]+$/)) return null;
  if (pathname.match(/^\/resources\//)) return null;

  return (
    <SEO
      title={seo.title}
      description={seo.description}
      path={seo.path}
      keywords={seo.keywords}
      noindex={seo.noindex}
    />
  );
}
