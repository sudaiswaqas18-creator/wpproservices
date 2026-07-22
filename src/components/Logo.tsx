type LogoVariant = 'light' | 'dark' | 'icon';

interface LogoProps {
  className?: string;
  variant?: LogoVariant;
  showTagline?: boolean;
}

const LOGO = {
  light: '/logo-light.png?v=3',
  dark: '/logo-dark.png?v=3',
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
      ? 'h-[38px] sm:h-[42px]'
      : 'h-[38px] sm:h-[44px]';

  return (
    <span
      className={`inline-flex shrink-0 items-center leading-none ${className}`}
      aria-label="WPServices"
    >
      <img
        src={src}
        alt="WPServices — WordPress Agency"
        className={`block w-auto max-w-none object-contain object-left ${heightClass}`}
        width={isDark ? 220 : 240}
        height={44}
        loading="eager"
        decoding="async"
        draggable={false}
      />
    </span>
  );
}
