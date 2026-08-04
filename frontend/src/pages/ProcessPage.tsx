import Process from '../components/Process';
import WhyChooseUs from '../components/WhyChooseUs';
import TechStack from '../components/TechStack';
import CTA from '../components/CTA';
import SEO from '../components/seo/SEO';

const PRINCIPLES = [
  {
    title: 'Scope before sprints',
    body: 'We write inclusions, exclusions, and success criteria before theme or cart work starts. That document is what launch is measured against — not a slide deck of mood boards.',
  },
  {
    title: 'Staging is not optional theatre',
    body: 'Meaningful changes rehearse on staging: forms, checkout, redirects, and editor flows. Production receives verified work, not first contact with a broken payment path.',
  },
  {
    title: 'Handoff is part of delivery',
    body: 'Editors leave with patterns, update habits, and short docs. If only developers can change a page safely, the engagement is unfinished.',
  },
];

export default function ProcessPage() {
  return (
    <>
      <SEO
        title="Our WordPress Process | WPServices"
        description="How WPServices scopes, stages, launches, and hands off WordPress and WooCommerce projects with maintainable themes and clear success criteria."
        path="/process"
      />
      <section className="bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="section-container max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">How We Deliver WordPress Work</h1>
          <p className="section-subtitle mx-auto mt-4">
            A clear path from written scope to staging review and handoff — so themes, stores, and LMS builds ship
            without surprise cutovers. This process is unique to how WPServices runs engagements, not a generic agency
            waterfall copied from elsewhere.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-white py-14">
        <div className="section-container grid gap-6 md:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <article key={p.title} className="rounded-2xl border border-border bg-surface-50 p-6">
              <h2 className="text-lg font-bold text-ink">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <Process />
      <WhyChooseUs />
      <TechStack />
      <CTA />
    </>
  );
}
