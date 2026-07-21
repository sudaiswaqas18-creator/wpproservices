interface LogoProps {
  className?: string;
  compact?: boolean;
}

export default function Logo({ className = '', compact = false }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={compact ? '/logo-icon.png' : '/logo.png'}
        alt="WPServices — WordPress Agency"
        className={
          compact
            ? 'h-10 w-10 object-contain'
            : 'h-10 w-auto max-w-[min(100%,220px)] object-contain object-left sm:h-12 sm:max-w-[280px]'
        }
        width={compact ? 40 : 280}
        height={compact ? 40 : 48}
        decoding="async"
      />
    </div>
  );
}
