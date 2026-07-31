import { Helmet } from 'react-helmet-async';
import { OFFICES, SITE } from '../../config/site';

const usOffice = OFFICES.find((o) => o.city === 'USA') ?? OFFICES[0];

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/logo-light.png`,
  email: SITE.email,
  description:
    'WordPress development studio for custom themes, WooCommerce stores, LearnDash LMS, plugins, migrations, and care retainers.',
};

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE.name,
  image: `${SITE.url}/logo-light.png`,
  url: SITE.url,
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: usOffice.address,
    addressLocality: 'St. Petersburg',
    addressRegion: 'FL',
    postalCode: '33702',
    addressCountry: 'US',
  },
  telephone: SITE.phone,
  areaServed: 'Worldwide',
  priceRange: '$$',
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
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
