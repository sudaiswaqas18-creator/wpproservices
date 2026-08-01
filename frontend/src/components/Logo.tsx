import { Link } from 'react-router-dom';

/** light = black logo on white/light bg; dark = white logo on black/dark bg */
type LogoVariant = 'light' | 'dark' | 'icon';

interface LogoProps {
  className?: string;
  variant?: LogoVariant;
  /** Where the logo navigates. Public site: "/". Admin: "/admin". */
  to?: string;
  showTagline?: boolean;
}

const LOGO = {
  /** Black mark — white / light backgrounds */
  light: '/logo/wp-services-black.png?v=14',
  /** White mark — black / dark backgrounds */
  dark: '/logo/wp-services-white.png?v=14',
  icon: '/logo/favicon.png?v=14',
} as const;

export default function Logo({
  className = '',
  variant = 'light',
  to,
}: LogoProps) {
  const isDark = variant === 'dark';
  const isIcon = variant === 'icon';
  const src = isIcon ? LOGO.icon : isDark ? LOGO.dark : LOGO.light;

  const heightClass = isIcon
    ? 'h-9'
    : isDark
      ? 'h-[40px] sm:h-[44px]'
      : 'h-[48px] sm:h-[56px]';

  const image = (
    <img
      src={src}
      alt="WPServices — WordPress Development Agency"
      className={`block w-auto max-w-none object-contain object-left ${heightClass}`}
      width={isIcon ? 36 : 220}
      height={isIcon ? 36 : isDark ? 44 : 56}
      loading="eager"
      {...{ fetchpriority: 'high' as const }}
      decoding="async"
      draggable={false}
    />
  );

  const wrapperClass = `inline-flex shrink-0 items-center leading-none ${className}`;

  if (to) {
    return (
      <Link
        to={to}
        className={`${wrapperClass} focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2`}
        aria-label="WPServices Home"
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
