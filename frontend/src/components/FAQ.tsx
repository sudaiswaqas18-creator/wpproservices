import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApiData } from '../hooks/useApiData';
import ContactLink from './ContactLink';

export default function FAQ() {
  const { data: faqs } = useApiData('faqs');
  const [openId, setOpenId] = useState<number | null>(null);

  if (!faqs.length) return null;

  return (
    <section id="faq" className="bg-surface-elevated py-20">
      <div className="section-container">
        <h2 className="section-title text-center">WordPress Agency FAQs</h2>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition hover:border-accent/40">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="pr-4 font-semibold text-ink">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-accent transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="border-t border-gray-50 px-6 pb-5 pt-2 text-sm leading-relaxed text-gray-600">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <ContactLink className="btn-primary">Book a WordPress Consultation</ContactLink>
        </div>
      </div>
    </section>
  );
}
