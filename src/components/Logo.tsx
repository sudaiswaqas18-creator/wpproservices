interface LogoProps {
  className?: string;
  compact?: boolean;
}

export default function Logo({ className = '', compact = false }: LogoProps) {
  return (
    <div className={`inline-flex shrink-0 items-center leading-none ${className}`}>
      <img
        src={compact ? '/logo-icon.svg' : '/logo.png'}
        alt="WPServices"
        className={
          compact
            ? 'h-9 w-9 object-contain'
            : 'block h-10 w-auto object-contain object-left sm:h-11'
        }
        width={compact ? 36 : 220}
        height={compact ? 36 : 44}
        decoding="async"
        draggable={false}
      />
    </div>
  );
}
