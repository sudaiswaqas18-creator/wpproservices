import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageProgressBar() {
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setProgress(20);
    const t1 = window.setTimeout(() => setProgress(60), 120);
    const t2 = window.setTimeout(() => setProgress(90), 280);
    const t3 = window.setTimeout(() => {
      setProgress(100);
      window.setTimeout(() => setVisible(false), 250);
    }, 480);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed left-0 top-0 z-[60] h-[3px] bg-brand-500"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'easeOut', duration: 0.25 }}
          role="progressbar"
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}
