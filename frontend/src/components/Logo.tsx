import { MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';

/** light = black logo on white/light bg; dark = white logo on black/dark bg */
type LogoVariant = 'light' | 'dark' | 'icon';

interface LogoProps {
  className?: string;
  variant?: LogoVariant;
  /** Where the logo navigates. Public site: "/". Admin: "/admin". */
  to?: string;
  onClick?: () => void;
  showTagline?: boolean;
}

const LOGO = {
  /** Black mark — white / light backgrounds */
  light: '/logo/wp-services-black.png?v=14',
  /** White mark — black / dark backgrounds */
  dark: '/logo/wp-services-white.png?v=14',
  icon: '/logo/favicon.png?v=14',
} as const;

function scrollWindowToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}

export default function Logo({
  className = '',
  variant = 'light',
  to,
  onClick,
}: LogoProps) {
  const location = useLocation();
  const isDark = variant === 'dark';
  const isIcon = variant === 'icon';
  const src = isIcon ? LOGO.icon : isDark ? LOGO.dark : LOGO.light;

  const heightClass = isIcon
    ? 'h-9'
    : isDark
      ? 'h-9 sm:h-[40px] md:h-[44px]'
      : 'h-10 sm:h-[48px] md:h-[56px]';

  const image = (
    <img
      src={src}
      alt="WPServices — WordPress Development Agency"
      className={`block h-auto w-auto max-w-[min(170px,48vw)] object-contain object-left sm:max-w-[200px] md:max-w-[220px] ${heightClass}`}
      width={isIcon ? 36 : 220}
      height={isIcon ? 36 : isDark ? 44 : 56}
      loading="eager"
      {...{ fetchpriority: 'high' as const }}
      decoding="async"
      draggable={false}
    />
  );

  const wrapperClass = `inline-flex min-w-0 max-w-full shrink items-center leading-none ${className}`;

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    if (!to) return;

    const onSamePage =
      location.pathname === to ||
      (to === '/' && (location.pathname === '/' || location.pathname === ''));

    if (onSamePage) {
      e.preventDefault();
      scrollWindowToTop();
    }
  };

  if (to) {
    return (
      <Link
        to={to}
        onClick={handleNavClick}
        className={`${wrapperClass} focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2`}
        aria-label={to === '/admin' ? 'Admin Dashboard' : 'WPServices Home'}
      >
        {image}
      </Link>
    );
  }

  return (
    <span className={wrapperClass} aria-label="WPServices">
      {image}
    </span>
  );
}
