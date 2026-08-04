export const SITE = {
  name: 'WPServices',
  tagline: 'WordPress Development Agency',
  url: 'https://wpproservices.vercel.app',
  email: 'info@technogiallc.com',
  phone: '+1 (904) 243-5044',
  whatsapp: '19042435044',
  themeColor: '#1A1A1A',
  ogImage: '/logo/wp-services-black.png',
  lastUpdated: {
    privacy: 'July 21, 2026',
    terms: 'July 22, 2026',
    cookies: 'July 22, 2026',
  },
} as const;

export const OFFICES = [
  {
    city: 'UAE',
    address: 'Sahara Health Care City, Regus 524, Dubai',
    phone: '00971585847929',
  },
  {
    city: 'Pakistan',
    address: 'Gujranwala, Punjab',
    phone: '03149496789',
  },
  {
    city: 'USA',
    address: 'St. Petersburg, FL 33702',
    phone: '+1 (904) 243-5044',
  },
] as const;

export const SOCIAL_LINKS: {
  label: string;
  href: string;
  icon: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'github' | 'youtube';
}[] = [
  // Add only verified profiles you own. Empty until then — avoids false Organization sameAs claims.
];
