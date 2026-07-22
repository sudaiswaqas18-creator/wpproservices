type LogoVariant = 'light' | 'dark' | 'icon';

interface LogoProps {
  className?: string;
  variant?: LogoVariant;
  /** @deprecated Tagline is part of the logo image assets */
  showTagline?: boolean;
}

const LOGO = {
  light: '/logo-light.png',
  dark: '/logo-dark.png',
} as const;

export default function Logo({
  className = '',
  variant = 'light',
}: LogoProps) {
  const isDark = variant === 'dark';
  const isIcon = variant === 'icon';
  const src = isDark ? LOGO.dark : LOGO.light;

  return (
    <span className={`inline-flex shrink-0 items-center leading-none ${className}`}>
      <img
        src={src}
        alt="WPServices — WordPress Agency"
        className={
          isIcon
            ? 'h-9 w-auto object-contain'
            : isDark
              ? 'h-10 w-auto max-w-[210px] object-contain'
              : 'h-10 w-auto max-w-[230px] object-contain sm:h-11'
        }
        width={230}
        height={52}
        loading="eager"
        decoding="async"
        draggable={false}
      />
    </span>
  );
}
