import { useEffect } from 'react';

const IDLE_MS = 1000;

export default function AnimatedScrollbar() {
  useEffect(() => {
    const root = document.documentElement;
    let idleTimer: ReturnType<typeof setTimeout>;

    const markScrolling = (target: EventTarget | null) => {
      root.classList.add('is-scrolling');

      let el = target instanceof HTMLElement ? target : null;
      while (el && el !== document.body) {
        if (el.classList.contains('scroll-area')) {
          el.classList.add('is-scrolling');
          const pane = el as HTMLElement & { _scrollTimer?: ReturnType<typeof setTimeout> };
          clearTimeout(pane._scrollTimer);
          pane._scrollTimer = setTimeout(() => {
            pane.classList.remove('is-scrolling');
          }, IDLE_MS);
          break;
        }
        el = el.parentElement;
      }

      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        root.classList.remove('is-scrolling');
      }, IDLE_MS);
    };

    const onScroll = (e: Event) => markScrolling(e.target);
    const onWheel = (e: Event) => markScrolling(e.target);

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('scroll', onScroll, { passive: true, capture: true });
    document.addEventListener('wheel', onWheel, { passive: true, capture: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('scroll', onScroll, { capture: true });
      document.removeEventListener('wheel', onWheel, { capture: true });
      clearTimeout(idleTimer);
      root.classList.remove('is-scrolling');
    };
  }, []);

  return null;
}
