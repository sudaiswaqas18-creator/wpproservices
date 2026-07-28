const steps = [
  {
    num: '01',
    title: 'Discovery & Planning',
    desc: 'Business goals, audience insights, and project scope defined to align strategy and success metrics.',
  },
  {
    num: '02',
    title: 'Architecture & Design',
    desc: 'Custom layouts and wireframes aligned to your brand, focused on clarity and conversions.',
  },
  {
    num: '03',
    title: 'Development & QA',
    desc: 'Agile sprints with clean code, integrations, and testing to ensure flawless performance.',
  },
  {
    num: '04',
    title: 'Launch & Optimization',
    desc: 'Seamless deployment with post-launch monitoring, speed, and SEO improvements.',
  },
];

export default function Process() {
  return (
    <section id="process" className="py-20">
      <div className="section-container">
        <h2 className="section-title text-center">Our Proven Development Process</h2>

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
