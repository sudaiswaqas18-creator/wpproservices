import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';

export default function PricingPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="section-container text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">WordPress Project Pricing</h1>
          <p className="section-subtitle mx-auto mt-4">
            Starting packages for WordPress builds and redesigns. Complex WooCommerce, plugins, or migrations are quoted after a short discovery call.
          </p>
        </div>
      </section>
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
