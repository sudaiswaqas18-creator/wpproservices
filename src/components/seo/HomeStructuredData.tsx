import { Helmet } from 'react-helmet-async';
import { SITE } from '../../config/site';

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/logo-light.png`,
  email: SITE.email,
  description:
    'Premium WordPress development agency specializing in custom websites, WooCommerce, plugins, and ongoing maintenance.',
  sameAs: [
    'https://facebook.com/wpservices',
    'https://twitter.com/wpservices',
    'https://linkedin.com/company/wpservices',
    'https://github.com/wpservices',
  ],
};

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE.name,
  image: `${SITE.url}/logo-light.png`,
  url: SITE.url,
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2035 Sunset Lake Road, Suite B-2',
    addressLocality: 'Newark',
    addressRegion: 'DE',
    postalCode: '19702',
    addressCountry: 'US',
  },
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE.url}/services?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function HomeStructuredData() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(organization)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>
      <script type="application/ld+json">{JSON.stringify(website)}</script>
    </Helmet>
  );
}
