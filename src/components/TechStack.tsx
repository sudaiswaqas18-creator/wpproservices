const technologies = [
  'Elementor', 'Astra', 'Divi', 'Avada', 'Flatsome', 'WP Bakery',
  'WP Rocket', 'WooCommerce', 'LearnDash', 'Yoast', 'Rank Math',
  'WPML', 'Gutenberg', 'REST API', 'React', 'PHP 8+', 'MySQL', 'Docker',
];

export default function TechStack() {
  return (
    <section className="py-20">
      <div className="section-container text-center">
        <h2 className="section-title">Trusted Expertise Across the Ecosystem</h2>
        <p className="section-subtitle mx-auto">
          We work with the most popular themes, plugins, and frameworks trusted by millions
          of businesses worldwide.
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
