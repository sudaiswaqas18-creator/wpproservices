/** Extra unique delivery notes per case study slug — complements API fields */

export interface CaseStudyEnrichment {
  context: string;
  lessons: string[];
  seoBlurb: string;
}

const ENRICHMENT: Record<string, CaseStudyEnrichment> = {
  'grocery-loyalty-shipping': {
    context:
      'Grocery WooCommerce teams often patch free shipping with coupons that staff forget to retire. This engagement replaced coupon theatre with rules tied to order history so returning shoppers saw honest thresholds.',
    lessons: [
      'Write the shipping rule in one sentence before coding',
      'Stage address and guest-cart edge cases',
      'Give merchandisers a short threshold sheet, not a ticket queue',
    ],
    seoBlurb: 'WooCommerce loyalty shipping case study with staging QA and editor handoff.',
  },
  'cohort-lms-access': {
    context:
      'Private cohorts fail when access rules only live in a developer’s head. We modelled roles with instructors first, then implemented LearnDash gates staff could explain on a support call.',
    lessons: [
      'Sample cohort completes a full path on staging',
      'Document reset-progress policy before launch',
      'Separate enrollment ops from content editing roles',
    ],
    seoBlurb: 'LearnDash cohort access case study with role gates and admin handoff.',
  },
  'apparel-cart-recovery': {
    context:
      'Apparel recoveries that ignore inventory create angry shoppers. Messaging was wired to WooCommerce order events so offers matched stock and checkout state.',
    lessons: [
      'Tie recovery to real order lifecycle events',
      'Pause campaigns without breaking transactional mail',
      'Test guest and logged-in carts separately',
    ],
    seoBlurb: 'WooCommerce cart recovery case study tied to inventory-honest events.',
  },
  'attribute-subscription-pricing': {
    context:
      'Subscription renewals that ignore attributes create silent revenue leaks and support tickets. Attribute-aware renewal logic reduced exceptions for specialty retail.',
    lessons: [
      'Publish an attribute → price matrix for admins',
      'Stage renewals against a sample catalog',
      'Log exceptions instead of quiet failures',
    ],
    seoBlurb: 'WooCommerce subscription pricing case study driven by product attributes.',
  },
  'course-wallet-checkout': {
    context:
      'Team course buyers need self-serve seat assignment after payment. A wallet-style checkout cut support handoffs without inventing a second LMS.',
    lessons: [
      'Define seat limits before building UI',
      'Document refunds for unused seats',
      'Validate organization vs guest buyers on staging',
    ],
    seoBlurb: 'Course wallet checkout case study for team seat assignment on WordPress.',
  },
};

export function getCaseStudyEnrichment(slug: string | null | undefined): CaseStudyEnrichment | null {
  if (!slug) return null;
  return ENRICHMENT[slug] || null;
}
