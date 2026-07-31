const technologies = [
  'Gutenberg',
  'WooCommerce',
  'LearnDash',
  'Custom plugins',
  'REST API',
  'PHP 8+',
  'MySQL',
  'WP-CLI',
  'Staging workflows',
  'Core Web Vitals',
  'WPML',
  'Elementor (when needed)',
];

export default function TechStack() {
  return (
    <section className="py-20">
      <div className="section-container text-center">
        <h2 className="section-title">Tools We Actually Ship With</h2>
        <p className="section-subtitle mx-auto">
          WordPress-native stack choices we use on client work — not a partnership claim or logo wall.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
