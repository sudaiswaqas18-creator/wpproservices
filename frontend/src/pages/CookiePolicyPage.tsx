import {
  Cookie, BarChart3, Settings, Sliders,
  Globe, Mail, FileText,
} from 'lucide-react';
import LegalPageLayout, { LegalP, LegalUl } from '../components/legal/LegalPageLayout';
import { SITE } from '../config/site';
import { Link } from 'react-router-dom';

const cookieTable = [
  { name: '_ga', type: 'Analytics', duration: '2 years', purpose: 'Google Analytics — distinguishes users' },
  { name: '_gid', type: 'Analytics', duration: '24 hours', purpose: 'Google Analytics — distinguishes users' },
  { name: 'cookie_consent', type: 'Essential', duration: '1 year', purpose: 'Stores your cookie preference' },
  { name: 'session_id', type: 'Essential', duration: 'Session', purpose: 'Maintains session state' },
];

const sections = [
  {
    id: 'what-are-cookies',
    number: 1,
    title: 'What Are Cookies',
    icon: Cookie,
    content: (
      <LegalP>
        Cookies are small text files stored on your device when you visit a website. They help websites function properly, remember preferences, and understand how visitors use the site.
      </LegalP>
    ),
  },
  {
    id: 'types',
    number: 2,
    title: 'Types of Cookies We Use',
    icon: Settings,
    content: (
      <>
        <LegalP>We use the following categories of cookies:</LegalP>
        <LegalUl items={[
          'Essential cookies — required for core site functionality and security',
          'Analytics cookies — help us understand traffic and improve performance (e.g., Google Analytics)',
          'Marketing cookies — used only with consent for campaign measurement',
          'Preference cookies — remember settings such as language or consent choices',
        ]} />
      </>
    ),
  },
  {
    id: 'control',
    number: 3,
    title: 'How to Control Cookies',
    icon: Sliders,
    content: (
      <>
        <LegalP>You can manage cookies through:</LegalP>
        <LegalUl items={[
          'Our cookie consent banner (Accept All / Reject Non-Essential)',
          'Your browser settings to block or delete cookies',
          'Google Analytics opt-out: https://tools.google.com/dlpage/gaoptout',
        ]} />
        <LegalP>Disabling essential cookies may affect site functionality.</LegalP>
      </>
    ),
  },
  {
    id: 'third-party',
    number: 4,
    title: 'Third-Party Cookies',
    icon: Globe,
    content: (
      <LegalP>
        Third-party services such as analytics providers may set their own cookies. We review partners for privacy compliance and limit data sharing to what is necessary.
      </LegalP>
    ),
  },
  {
    id: 'cookie-list',
    number: 5,
    title: 'Cookie List',
    icon: BarChart3,
    content: (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-surface-50">
              <th className="px-3 py-2 font-semibold text-gray-900">Cookie</th>
              <th className="px-3 py-2 font-semibold text-gray-900">Type</th>
              <th className="px-3 py-2 font-semibold text-gray-900">Duration</th>
              <th className="px-3 py-2 font-semibold text-gray-900">Purpose</th>
            </tr>
          </thead>
          <tbody>
            {cookieTable.map((row) => (
              <tr key={row.name} className="border-b border-gray-100">
                <td className="px-3 py-2 font-mono text-xs">{row.name}</td>
                <td className="px-3 py-2">{row.type}</td>
                <td className="px-3 py-2">{row.duration}</td>
                <td className="px-3 py-2">{row.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: 'changes',
    number: 6,
    title: 'Changes to Cookie Policy',
    icon: FileText,
    content: (
      <LegalP>
        We may update this Cookie Policy periodically. Changes will be posted on this page with an updated date. See also our{' '}
        <Link to="/privacy-policy" className="font-semibold text-brand-600 hover:underline">Privacy Policy</Link>.
      </LegalP>
    ),
  },
  {
    id: 'contact',
    number: 7,
    title: 'Contact',
    icon: Mail,
    content: (
      <LegalP>
        Questions about cookies? Email us at {SITE.email}. Last updated: {SITE.lastUpdated.cookies}.
      </LegalP>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      subtitle="How WPServices uses cookies and similar technologies on our website."
      lastUpdated={SITE.lastUpdated.cookies}
      readingMinutes={5}
      seoTitle="Cookie Policy | WPServices"
      seoDescription="Learn about essential, analytics, and preference cookies used on the WPServices website and how to control them."
      seoPath="/cookie-policy"
      sections={sections}
    />
  );
}
