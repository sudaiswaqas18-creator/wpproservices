type LogoVariant = 'light' | 'dark' | 'icon';

interface LogoProps {
  className?: string;
  variant?: LogoVariant;
  showTagline?: boolean;
}

const LOGO = {
  light: '/logo-light.png?v=5',
  dark: '/logo-dark.png?v=5',
} as const;

export default function Logo({
  className = '',
  variant = 'light',
}: LogoProps) {
  const isDark = variant === 'dark';
  const isIcon = variant === 'icon';
  const src = isDark ? LOGO.dark : LOGO.light;

  // Light theme logo is intentionally larger — matches premium header presence
  const heightClass = isIcon
    ? 'h-9'
    : isDark
      ? 'h-[40px] sm:h-[44px]'
      : 'h-[48px] sm:h-[56px]';

  return (
    <span
      className={`inline-flex shrink-0 items-center leading-none ${className}`}
      aria-label="WPServices"
    >
      <img
        src={src}
        alt="WPServices — WordPress Agency"
        className={`block w-auto max-w-none object-contain object-left drop-shadow-sm ${heightClass}`}
        width={isDark ? 220 : 280}
        height={isDark ? 44 : 56}
        loading="eager"
        decoding="async"
        draggable={false}
      />
    </span>
  );
}
