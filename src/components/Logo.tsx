interface LogoProps {
  className?: string;
  compact?: boolean;
}

export default function Logo({ className = '', compact = false }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={compact ? '/logo-icon.svg' : '/logo.svg'}
        alt="WPProServices — WordPress Agency"
        className={
          compact
            ? 'h-10 w-10 object-contain'
            : 'h-11 w-auto max-w-[min(100%,240px)] object-contain object-left sm:h-12 sm:max-w-[260px]'
        }
        width={compact ? 40 : 240}
        height={compact ? 40 : 48}
        decoding="async"
      />
    </div>
  );
}
