import { Link } from 'react-router-dom';

const sections = [
  {
    title: '1. Introduction',
    body: 'PixelForge Digital ("we", "us", or "our") respects your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit our website, submit a contact form, purchase a plugin, or use our WordPress development services.',
  },
  {
    title: '2. Information We Collect',
    body: 'We may collect the following types of information:',
    list: [
      'Contact details: name, email address, phone number, and company name',
      'Project information: budget range, project details, and messages you send via our forms',
      'Technical data: IP address, browser type, device information, and pages visited',
      'Purchase enquiries: product name, price, and plugin purchase requests',
      'Admin account data: login credentials for authorized staff only',
    ],
  },
  {
    title: '3. How We Use Your Information',
    body: 'We use your information to:',
    list: [
      'Respond to your enquiries and provide free consultations',
      'Deliver WordPress development, design, and support services',
      'Process plugin purchase requests and send license details',
      'Improve our website, services, and user experience',
      'Send service-related communications you have requested',
      'Comply with legal obligations and prevent fraud or abuse',
    ],
  },
  {
    title: '4. Legal Basis for Processing',
    body: 'We process personal data based on your consent (e.g. contact form submission), our legitimate business interests (e.g. responding to enquiries), and contractual necessity when you engage our services.',
  },
  {
    title: '5. Cookies & Analytics',
    body: 'Our website may use cookies and similar technologies to remember preferences and analyze traffic. You can control cookies through your browser settings. We may use analytics tools such as Google Analytics to understand how visitors use our site.',
  },
  {
    title: '6. Sharing Your Information',
    body: 'We do not sell your personal data. We may share information with trusted third parties only when necessary — such as hosting providers, email services, payment processors, or analytics tools — and only under appropriate data protection agreements.',
  },
  {
    title: '7. Data Retention',
    body: 'We retain contact form submissions and project enquiries for as long as needed to respond to you, deliver services, and meet legal or accounting requirements. You may request deletion of your data at any time, subject to applicable laws.',
  },
  {
    title: '8. Data Security',
    body: 'We implement reasonable technical and organizational measures to protect your information, including secure connections (HTTPS), access controls, and encrypted storage where appropriate. No method of transmission over the internet is 100% secure.',
  },
  {
    title: '9. Your Rights',
    body: 'Depending on your location, you may have the right to:',
    list: [
      'Access the personal data we hold about you',
      'Request correction or deletion of your data',
      'Withdraw consent at any time',
      'Object to or restrict certain processing',
      'Lodge a complaint with a data protection authority',
    ],
  },
  {
    title: '10. Third-Party Links',
    body: 'Our website may contain links to external sites (e.g. plugin stores, social media). We are not responsible for the privacy practices of those third-party websites.',
  },
  {
    title: '11. Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of our website after changes constitutes acceptance of the updated policy.',
  },
  {
    title: '12. Contact Us',
    body: 'If you have questions about this Privacy Policy or wish to exercise your data rights, contact us at:',
    contact: true,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="section-container max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Legal</p>
          <h1 className="mt-2 text-4xl font-extrabold text-gray-900">Privacy Policy</h1>
          <p className="mt-4 text-gray-600">
            Last updated: July 20, 2026
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="section-container max-w-3xl">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-card lg:p-10">
            <p className="text-gray-600 leading-relaxed">
              At PixelForge Digital, we are committed to protecting your privacy. Please read this policy
              carefully to understand how we handle your personal information.
            </p>

            <div className="mt-10 space-y-10">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{section.body}</p>
                  {section.list && (
                    <ul className="mt-3 space-y-2">
                      {section.list.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-gray-600">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.contact && (
                    <ul className="mt-3 space-y-1 text-sm text-gray-600">
                      <li><strong className="text-gray-900">Email:</strong> hello@pixelforge.digital</li>
                      <li><strong className="text-gray-900">Phone:</strong> +1 (800) 555-0199</li>
                      <li><strong className="text-gray-900">Website:</strong> <Link to="/contact" className="text-brand-600 hover:underline">Contact form</Link></li>
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link to="/contact" className="btn-outline text-sm">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
