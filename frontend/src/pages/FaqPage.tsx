import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import SEO from '../components/seo/SEO';

export default function FaqPage() {
  return (
    <>
      <SEO
        title="WordPress Agency FAQs | WPServices"
        description="Answers about WordPress builds, WooCommerce migrations, retainers, timelines, and how our staging-first delivery works."
        path="/faq"
      />
      <section className="bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="section-container max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">WordPress Agency FAQs</h1>
          <p className="section-subtitle mx-auto mt-4">
            Straight answers on scope, staging, migrations, WooCommerce work, and care plans — the questions operators ask before hiring a WordPress team.
          </p>
        </div>
      </section>
      <FAQ />
      <CTA />
    </>
  );
}
