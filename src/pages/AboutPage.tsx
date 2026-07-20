import { Link } from 'react-router-dom';
import Process from '../components/Process';
import TechStack from '../components/TechStack';
import CTA from '../components/CTA';

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="section-container max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">About PixelForge Digital</h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            We are a WordPress development agency with 10+ years of experience building scalable,
            secure, and conversion-focused websites for businesses worldwide. Our team of 80+ developers
            has delivered 1,500+ successful projects across e-commerce, education, healthcare, and more.
          </p>
        </div>
      </section>
      <Process />
      <section className="py-16">
        <div className="section-container grid gap-8 sm:grid-cols-3 text-center">
          {[{ v: '10+', l: 'Years Experience' }, { v: '80+', l: 'Developers' }, { v: '1,500+', l: 'Projects Delivered' }].map((s) => (
            <div key={s.l} className="card">
              <div className="text-4xl font-extrabold text-brand-600">{s.v}</div>
              <p className="mt-2 text-gray-600">{s.l}</p>
            </div>
          ))}
        </div>
      </section>
      <TechStack />
      <section className="pb-16 text-center">
        <Link to="/contact" className="btn-primary">Work With Us</Link>
      </section>
      <CTA />
    </>
  );
}
