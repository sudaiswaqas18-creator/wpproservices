import {
  FileText, Handshake, Briefcase, Users, Clock, CreditCard, Scale,
  Shield, Lock, Gavel, Globe, Mail, AlertTriangle,
} from 'lucide-react';
import LegalPageLayout, { LegalP, LegalUl } from '../components/legal/LegalPageLayout';
import { SITE } from '../config/site';

const sections = [
  {
    id: 'acceptance',
    number: 1,
    title: 'Acceptance of Terms',
    icon: Handshake,
    content: (
      <>
        <LegalP>
          By accessing or using the WPServices website and engaging our services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.
        </LegalP>
        <LegalP>These terms apply to all visitors, clients, and partners who interact with WPServices.</LegalP>
      </>
    ),
  },
  {
    id: 'services',
    number: 2,
    title: 'Services Description',
    icon: Briefcase,
    content: (
      <>
        <LegalP>WPServices provides professional WordPress-related services including:</LegalP>
        <LegalUl items={[
          'Custom WordPress website development',
          'WooCommerce store development and optimization',
          'Custom plugin and theme development',
          'Website maintenance and support retainers',
          'SEO and speed optimization',
          'Website redesign, migration, and AI automation workflows',
        ]} />
      </>
    ),
  },
  {
    id: 'client-responsibilities',
    number: 3,
    title: 'Client Responsibilities',
    icon: Users,
    content: (
      <>
        <LegalP>To ensure successful project delivery, clients agree to:</LegalP>
        <LegalUl items={[
          'Provide content, assets, brand guidelines, and approvals in a timely manner',
          'Respond to feedback requests within agreed timeframes',
          'Supply necessary hosting, domain, and platform access credentials securely',
          'Designate a primary point of contact for project communications',
        ]} />
      </>
    ),
  },
  {
    id: 'timeline',
    number: 4,
    title: 'Project Timeline & Delivery',
    icon: Clock,
    content: (
      <>
        <LegalP>
          Project timelines are estimated during discovery and confirmed in the proposal or statement of work. Delays caused by missing assets, scope changes, or delayed client feedback may extend delivery dates.
        </LegalP>
        <LegalP>We deliver work in milestones with staging previews for review before launch.</LegalP>
      </>
    ),
  },
  {
    id: 'payment',
    number: 5,
    title: 'Payment Terms',
    icon: CreditCard,
    content: (
      <>
        <LegalP>Pricing is based on project scope, complexity, and timeline. Unless otherwise stated:</LegalP>
        <LegalUl items={[
          'Projects follow milestone-based payment schedules (e.g., deposit, design approval, development, launch)',
          'Invoices are due within 7–14 days unless agreed otherwise',
          'Late payments may pause work and incur administrative fees',
          'Refunds are evaluated case-by-case for work not yet performed; completed milestones are non-refundable',
        ]} />
      </>
    ),
  },
  {
    id: 'ip',
    number: 6,
    title: 'Intellectual Property',
    icon: FileText,
    content: (
      <>
        <LegalP>Upon full payment, clients receive ownership of custom deliverables created specifically for their project, excluding third-party licenses and open-source components.</LegalP>
        <LegalUl items={[
          'Third-party themes, plugins, fonts, and stock assets remain under their respective licenses',
          'Open-source components are provided under their original licenses',
          'WPServices may showcase completed work in portfolios unless a confidentiality agreement states otherwise',
        ]} />
      </>
    ),
  },
  {
    id: 'warranties',
    number: 7,
    title: 'Warranties & Disclaimers',
    icon: AlertTriangle,
    content: (
      <>
        <LegalP>We warrant that services will be performed in a professional manner consistent with industry standards. We do not guarantee specific business outcomes such as rankings, revenue, or traffic.</LegalP>
        <LegalP>Services are provided &quot;as is&quot; where permitted by law, except as expressly stated in a signed agreement.</LegalP>
      </>
    ),
  },
  {
    id: 'liability',
    number: 8,
    title: 'Limitation of Liability',
    icon: Scale,
    content: (
      <LegalP>
        To the maximum extent permitted by law, WPServices shall not be liable for indirect, incidental, special, or consequential damages. Our total liability for any claim shall not exceed the fees paid for the specific project giving rise to the claim during the preceding twelve months.
      </LegalP>
    ),
  },
  {
    id: 'confidentiality',
    number: 9,
    title: 'Confidentiality',
    icon: Lock,
    content: (
      <LegalP>
        Both parties agree to keep confidential any proprietary business information shared during the engagement, except where disclosure is required by law or with written consent.
      </LegalP>
    ),
  },
  {
    id: 'termination',
    number: 10,
    title: 'Termination',
    icon: Shield,
    content: (
      <LegalP>
        Either party may terminate an engagement with written notice. Client is responsible for payment of work completed through the termination date. We may suspend services for non-payment or material breach of these terms.
      </LegalP>
    ),
  },
  {
    id: 'disputes',
    number: 11,
    title: 'Dispute Resolution',
    icon: Gavel,
    content: (
      <LegalP>
        Parties agree to attempt good-faith resolution before pursuing formal remedies. If unresolved, disputes shall be handled under the governing law below through appropriate courts or arbitration as specified in the project agreement.
      </LegalP>
    ),
  },
  {
    id: 'governing-law',
    number: 12,
    title: 'Governing Law',
    icon: Globe,
    content: (
      <LegalP>
        These Terms are governed by the laws of the State of Delaware, United States, without regard to conflict of law principles.
      </LegalP>
    ),
  },
  {
    id: 'amendments',
    number: 13,
    title: 'Amendments',
    icon: FileText,
    content: (
      <LegalP>
        We may update these Terms from time to time. Material changes will be posted on this page with an updated effective date. Continued use of our services constitutes acceptance of revised terms.
      </LegalP>
    ),
  },
  {
    id: 'contact',
    number: 14,
    title: 'Contact Information',
    icon: Mail,
    content: (
      <>
        <LegalP>For questions about these Terms, contact us at {SITE.email}.</LegalP>
        <LegalP>Effective Date: {SITE.lastUpdated.terms}</LegalP>
      </>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      subtitle="The terms governing your use of WPServices websites and professional WordPress development services."
      lastUpdated={SITE.lastUpdated.terms}
      readingMinutes={8}
      seoTitle="Terms of Service | WPServices"
      seoDescription="Read the WPServices Terms of Service covering project delivery, payments, intellectual property, warranties, and client responsibilities."
      seoPath="/terms-of-service"
      sections={sections}
    />
  );
}
