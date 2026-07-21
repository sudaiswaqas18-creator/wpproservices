import { useEffect } from 'react';

const IDLE_MS = 1200;

export default function AnimatedScrollbar() {
  useEffect(() => {
    const root = document.documentElement;
    let idleTimer: ReturnType<typeof setTimeout>;

    const markScrolling = (target: EventTarget | null) => {
      root.classList.add('is-scrolling');
      if (target instanceof HTMLElement && target.classList.contains('scroll-area')) {
        target.classList.add('is-scrolling');
        clearTimeout((target as HTMLElement & { _scrollTimer?: ReturnType<typeof setTimeout> })._scrollTimer);
        (target as HTMLElement & { _scrollTimer?: ReturnType<typeof setTimeout> })._scrollTimer = setTimeout(() => {
          target.classList.remove('is-scrolling');
        }, IDLE_MS);
      }
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        root.classList.remove('is-scrolling');
      }, IDLE_MS);
    };

    const onScroll = (e: Event) => markScrolling(e.target);

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('scroll', onScroll, { passive: true, capture: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('scroll', onScroll, { capture: true });
      clearTimeout(idleTimer);
      root.classList.remove('is-scrolling');
    };
  }, []);

  return null;
}
