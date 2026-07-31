import Industries from '../components/Industries';
import CTA from '../components/CTA';
import SEO from '../components/seo/SEO';

export default function IndustriesPage() {
  return (
    <>
      <SEO
        title="Industries We Serve | WordPress Agency"
        description="WordPress and WooCommerce delivery for retail, education, healthcare, and B2B teams — themes, stores, LMS, and care plans shaped to each industry."
        path="/industries"
      />
      <section className="bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="section-container max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Industries We Serve with WordPress</h1>
          <p className="section-subtitle mx-auto mt-4">
            WordPress agencies that rank well spell out who they help. Here is how we apply themes,
            WooCommerce, LearnDash, and care plans across the industries we work in most.
          </p>
        </div>
      </section>
      <Industries />
      <CTA />
    </>
  );
}
