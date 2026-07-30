import ContactForm from './ContactForm';

export default function CTA() {
  return (
    <section className="bg-surface-dark py-20">
      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-text-inverse">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Get a Custom WordPress Site That Boosts Sales &amp; Conversions
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Ready to transform your online presence? Our WordPress experts are standing by
              to discuss your project goals and provide a tailored roadmap.
            </p>
            <ul className="mt-8 space-y-3 text-secondary">
              <li className="flex items-center gap-2">✓ Free initial consultation</li>
              <li className="flex items-center gap-2">✓ Detailed project proposal within 48 hours</li>
              <li className="flex items-center gap-2">✓ No obligation — just expert advice</li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
