import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';

export default function PricingPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="section-container text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Pricing Plans</h1>
          <p className="section-subtitle mx-auto mt-4">Transparent, all-in-one WordPress packages. No hidden costs.</p>
        </div>
      </section>
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
