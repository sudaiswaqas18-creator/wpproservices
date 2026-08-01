import Portfolio from '../components/Portfolio';
import CTA from '../components/CTA';
import SEO from '../components/seo/SEO';

export default function PortfolioPage() {
  return (
    <>
      <SEO
        title="WordPress Portfolio | WPServices"
        description="WordPress, WooCommerce, and LearnDash project showcase — storefronts, corporate sites, LMS dashboards, and B2B portals."
        path="/portfolio"
      />
      <section className="bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="section-container max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">WordPress Work Showcase</h1>
          <p className="section-subtitle mx-auto mt-4">
            Representative WordPress project types — WooCommerce storefronts, marketing sites, LearnDash dashboards, and member portals. Deeper write-ups live in case studies.
          </p>
        </div>
      </section>
      <Portfolio />
      <CTA />
    </>
  );
}
