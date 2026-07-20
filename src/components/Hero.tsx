import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ContactForm from './ContactForm';

const stats = [
  { value: '10+', label: 'Years of Experience' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface-50 to-white pb-16 pt-10 lg:pb-24 lg:pt-16">
      <div className="section-container relative grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-sm font-semibold text-brand-600">{stats[0].value} {stats[0].label}</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-[3.25rem]">
            Website Experiences <span className="text-brand-600">Beautifully Crafted.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            We design and develop exceptional WordPress websites that help ambitious businesses stand out and grow.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/contact" className="btn-primary">Contact Us</Link>
            <Link to="/services" className="btn-outline">View Services</Link>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <ContactForm compact />
        </motion.div>
      </div>
    </section>
  );
}
