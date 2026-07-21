import { useState } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'footer';
}

const LOGO_SOURCES = ['/logo.png', '/logo.svg', '/logo-placeholder.svg'] as const;

export default function Logo({ className = '', variant = 'default' }: LogoProps) {
  const [srcIndex, setSrcIndex] = useState(0);
  const height = variant === 'footer' ? 'h-[52px]' : 'h-10 sm:h-11';

  const handleError = () => {
    setSrcIndex((i) => (i < LOGO_SOURCES.length - 1 ? i + 1 : i));
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={LOGO_SOURCES[srcIndex]}
        alt="WPServices - WordPress Agency"
        className={`${height} w-auto object-contain`}
        onError={handleError}
        width={200}
        height={60}
      />
    </div>
  );
}
