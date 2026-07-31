type LogoVariant = 'light' | 'dark' | 'icon';

interface LogoProps {
  className?: string;
  variant?: LogoVariant;
  showTagline?: boolean;
}

const LOGO = {
  light: '/logo-light-header.webp?v=13',
  dark: '/logo-dark.webp?v=13',
} as const;

export default function Logo({
  className = '',
  variant = 'light',
}: LogoProps) {
  const isDark = variant === 'dark';
  const isIcon = variant === 'icon';
  const src = isDark ? LOGO.dark : LOGO.light;

  const heightClass = isIcon
    ? 'h-9'
    : isDark
      ? 'h-[40px] sm:h-[44px]'
      : 'h-[48px] sm:h-[56px]';

  return (
    <span
      className={`inline-flex shrink-0 items-center leading-none ${className}`}
      aria-label="WPServices Home"
    >
      <img
        src={src}
        alt="WPServices — WordPress Development Agency"
        className={`block w-auto max-w-none object-contain object-left ${heightClass}`}
        width={isDark ? 220 : 220}
        height={isDark ? 44 : 56}
        loading="eager"
        {...{ fetchpriority: 'high' as const }}
        decoding="async"
        draggable={false}
      />
    </span>
  );
}
