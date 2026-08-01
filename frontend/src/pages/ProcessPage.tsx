import Process from '../components/Process';
import WhyChooseUs from '../components/WhyChooseUs';
import TechStack from '../components/TechStack';
import CTA from '../components/CTA';
import SEO from '../components/seo/SEO';

export default function ProcessPage() {
  return (
    <>
      <SEO
        title="Our WordPress Process | WPServices"
        description="How we scope, stage, launch, and care for WordPress and WooCommerce projects — plus why teams choose a specialist studio."
        path="/process"
      />
      <section className="bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="section-container max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">How We Deliver WordPress Work</h1>
          <p className="section-subtitle mx-auto mt-4">
            A clear path from written scope to staging review and handoff — so themes, plugins, and stores ship without surprise cutovers.
          </p>
        </div>
      </section>
      <Process />
      <WhyChooseUs />
      <TechStack />
      <CTA />
    </>
  );
}
