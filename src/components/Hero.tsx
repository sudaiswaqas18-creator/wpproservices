import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroShowcase from './HeroShowcase';
import ContactLink from './ContactLink';

const stats = [
  { value: '10+', label: 'Years of Experience' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-surface-50 to-white pb-16 pt-10 lg:pb-24 lg:pt-16">
      <motion.div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-brand-200/30 blur-3xl" />
      <motion.div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-accent-100/40 blur-3xl" />
      <div className="section-container relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-sm font-semibold text-brand-600">{stats[0].value} {stats[0].label}</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
            Website Experiences <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">Beautifully Crafted.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            We design and develop exceptional WordPress websites that help ambitious businesses stand out and grow.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ContactLink className="btn-primary">Contact Us</ContactLink>
            <Link to="/services" className="btn-outline">View Services</Link>
          </div>
        </motion.div>
        <HeroShowcase />
      </div>
    </section>
  );
}
