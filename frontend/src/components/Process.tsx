const steps = [
  {
    num: '01',
    title: 'Discover the WordPress stack',
    desc: 'Hosting, theme, plugins, WooCommerce or LearnDash constraints, content model, and success criteria — mapped before any build estimate.',
  },
  {
    num: '02',
    title: 'Scope themes, data & flows',
    desc: 'Wireframes or tickets for templates, custom post types, checkout or LMS paths, redirects, and staging access — written so nothing is assumed.',
  },
  {
    num: '03',
    title: 'Build on staging & QA',
    desc: 'Theme and plugin work in a staging environment with editor walkthroughs, Core Web Vitals checks on key templates, and regression passes.',
  },
  {
    num: '04',
    title: 'Launch, handoff & care',
    desc: 'DNS or deploy cutover, redirect verification, documentation for your team, and a post-launch support window for WordPress quirks.',
  },
];

export default function Process() {
  return (
    <section id="process" className="py-20">
      <div className="section-container">
        <h2 className="section-title text-center">How WordPress Projects Move Here</h2>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              {i < steps.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-brand-200 lg:block" />
              )}
              <div className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500 text-xl font-bold text-white shadow-lg">
                  {step.num}
                </div>
                <h3 className="mt-5 font-bold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
