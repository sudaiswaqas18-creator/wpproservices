import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield, Lock, Eye, Cookie, Mail, Globe, FileText, ChevronRight,
} from 'lucide-react';
import CTA from '../components/CTA';

const sections = [
  {
    id: 'introduction',
    icon: FileText,
    title: 'Introduction',
    content: `WPServices ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us through any communication channel.

By using our website or submitting your information through our contact forms, you agree to the collection and use of information in accordance with this policy.`,
  },
  {
    id: 'information-we-collect',
    icon: Eye,
    title: 'Information We Collect',
    content: `We may collect the following types of information:

**Personal Information You Provide**
• Name, email address, phone number, and company name when you fill out contact forms
• Project details, budget range, and business requirements you share with us
• Communications you send us via email or other channels

**Automatically Collected Information**
• IP address, browser type, operating system, and device information
• Pages visited, time spent on pages, and referring URLs
• Cookies and similar tracking technologies (see Cookies section below)

We do not knowingly collect personal information from children under 16.`,
  },
  {
    id: 'how-we-use',
    icon: Globe,
    title: 'How We Use Your Information',
    content: `We use the information we collect to:

• Respond to your inquiries and provide requested services
• Send project proposals, quotes, and service-related communications
• Improve our website, services, and user experience
• Analyze website traffic and usage patterns
• Comply with legal obligations and protect our rights
• Send marketing communications (only with your explicit consent)

We will never sell your personal information to third parties.`,
  },
  {
    id: 'data-sharing',
    icon: Shield,
    title: 'Data Sharing & Third Parties',
    content: `We may share your information with:

• **Service Providers** — trusted partners who assist with hosting, analytics, email delivery, and payment processing, bound by confidentiality agreements
• **Legal Requirements** — when required by law, court order, or government request
• **Business Transfers** — in connection with a merger, acquisition, or sale of assets

All third-party providers are required to maintain the security of your personal information and use it only for the purposes we specify.`,
  },
  {
    id: 'data-security',
    icon: Lock,
    title: 'Data Security',
    content: `We implement industry-standard security measures to protect your personal information, including:

• SSL/TLS encryption for data in transit
• Secure server infrastructure with access controls
• Regular security audits and vulnerability assessments
• Employee training on data protection best practices

While we strive to protect your information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security but are committed to promptly addressing any breaches in accordance with applicable law.`,
  },
  {
    id: 'cookies',
    icon: Cookie,
    title: 'Cookies & Tracking',
    content: `Our website uses cookies and similar technologies to:

• Remember your preferences and settings
• Analyze website traffic via analytics tools (e.g., Google Analytics)
• Improve site performance and user experience

You can control cookies through your browser settings. Disabling cookies may affect certain website functionality. We use both session cookies (deleted when you close your browser) and persistent cookies (stored for a defined period).`,
  },
  {
    id: 'your-rights',
    icon: Shield,
    title: 'Your Rights',
    content: `Depending on your location, you may have the following rights regarding your personal data:

• **Access** — request a copy of the personal data we hold about you
• **Correction** — request correction of inaccurate or incomplete data
• **Deletion** — request deletion of your personal data ("right to be forgotten")
• **Portability** — request your data in a structured, machine-readable format
• **Objection** — object to processing of your data for direct marketing
• **Withdraw Consent** — withdraw consent at any time where processing is based on consent

To exercise any of these rights, contact us at info@technogiallc.com. We will respond within 30 days.`,
  },
  {
    id: 'data-retention',
    icon: FileText,
    title: 'Data Retention',
    content: `We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.

• Contact form submissions: retained for up to 3 years after last interaction
• Client project data: retained for the duration of the engagement plus 5 years
• Analytics data: anonymized after 26 months

When data is no longer needed, we securely delete or anonymize it.`,
  },
  {
    id: 'international',
    icon: Globe,
    title: 'International Data Transfers',
    content: `WPServices operates with team presence in the United States, the United Arab Emirates, and Pakistan. Your information may be transferred to and processed in countries other than your own.

We ensure appropriate safeguards are in place for international transfers, including standard contractual clauses and compliance with applicable data protection frameworks such as GDPR and applicable local regulations.`,
  },
  {
    id: 'contact',
    icon: Mail,
    title: 'Contact Us',
    content: `If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

**WPServices**
Email: info@technogiallc.com
USA: St. Petersburg, FL 33702
UAE: Sahara Health Care City, Regus 524, Dubai
Pakistan: Gujranwala, Punjab

We aim to respond to all privacy-related inquiries within 5 business days.`,
  },
];

function renderContent(text: string) {
  return text.split('\n\n').map((block) => {
    if (block.startsWith('**') && block.includes('**\n')) {
      const [heading, ...rest] = block.split('\n');
      const cleanHeading = heading.replace(/\*\*/g, '');
      return (
        <div key={block.slice(0, 30)} className="mt-4">
          <p className="font-semibold text-gray-900">{cleanHeading}</p>
          {rest.map((line) => (
            <p key={line} className="mt-2 text-gray-600 leading-relaxed">{line.replace(/^• /, '· ')}</p>
          ))}
        </div>
      );
    }
    return (
      <p key={block.slice(0, 30)} className="mt-4 leading-relaxed text-gray-600">
        {block.split('\n').map((line, i) => (
          <span key={i}>
            {line.startsWith('• ') ? `· ${line.slice(2)}` : line}
            {i < block.split('\n').length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  });
}

export default function PrivacyPolicyPage() {
  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent-soft via-surface to-surface-elevated py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(26, 26, 26,0.08),_transparent_60%)]" />
        <div className="section-container relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 ring-1 ring-brand-200">
              <Shield size={28} className="text-brand-600" />
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
              Your privacy matters to us. Learn how WPServices collects, uses, and protects your personal information.
            </p>
            <p className="mt-4 text-sm text-slate-400">Last updated: July 21, 2026</p>
          </motion.div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="border-b border-gray-100 bg-white py-8">
        <div className="section-container grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Data Sold', value: 'Never' },
            { label: 'Encryption', value: 'SSL/TLS' },
            { label: 'Response Time', value: '< 5 days' },
            { label: 'Compliance', value: 'GDPR Ready' },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-gray-100 bg-surface-50 px-4 py-3 text-center">
              <p className="text-lg font-bold text-brand-600">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Content with sticky sidebar */}
      <section className="py-16 lg:py-20">
        <div className="section-container grid gap-12 lg:grid-cols-4">
          {/* Sidebar TOC */}
          <nav className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">On this page</p>
            <ul className="mt-4 space-y-1">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                      activeId === s.id
                        ? 'bg-brand-50 font-semibold text-brand-600'
                        : 'text-gray-600 hover:bg-surface-50 hover:text-gray-900'
                    }`}
                  >
                    <ChevronRight size={14} className={activeId === s.id ? 'text-brand-500' : 'text-gray-300'} />
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl border border-brand-100 bg-brand-50 p-4">
              <p className="text-sm font-semibold text-gray-900">Have a question?</p>
              <p className="mt-1 text-xs text-gray-600">Our team is happy to clarify anything about your data.</p>
              <Link to="/contact" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline">
                Contact Us <ChevronRight size={14} />
              </Link>
            </div>
          </nav>

          {/* Sections */}
          <div className="lg:col-span-3 space-y-6">
            {sections.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.article
                  key={s.id}
                  id={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-6 shadow-card sm:p-8"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{s.title}</h2>
                  </div>
                  <div className="mt-2 text-sm">{renderContent(s.content)}</div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
