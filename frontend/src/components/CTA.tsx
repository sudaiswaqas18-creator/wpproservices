import ContactForm from './ContactForm';

export default function CTA() {
  return (
    <section className="bg-surface-dark py-20">
      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-text-inverse">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Tell Us About Your Next WordPress Project
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Whether you need a new theme, a WooCommerce rebuild, a plugin, or a careful migration —
              share your goals and we will respond with a clear scope outline.
            </p>
            <ul className="mt-8 space-y-3 text-secondary">
              <li className="flex items-center gap-2">✓ Complimentary discovery call</li>
              <li className="flex items-center gap-2">✓ Written scope outline after we understand the brief</li>
              <li className="flex items-center gap-2">✓ No retainer required to talk through options</li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
