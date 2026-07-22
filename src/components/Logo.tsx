type LogoVariant = 'light' | 'dark' | 'icon';

interface LogoProps {
  className?: string;
  variant?: LogoVariant;
  showTagline?: boolean;
}

function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill="#7C3AED"
        d="M24 3c11.6 0 21 9.4 21 21s-9.4 21-21 21S3 35.6 3 24 12.4 3 24 3Z"
      />
      <path
        fill="#7C3AED"
        d="M3 20.5c0-2.4 2-3.5 3.8-2.4l2.8 1.6V11.5C9.6 8.1 11.9 5.8 15.3 5.8h2.8c2.4 0 4.4 2 4.4 4.4V24c0 2.4-2 4.4-4.4 4.4h-2c-2.8 0-5.1-1.5-6.4-3.8L3 20.5Z"
      />
      <text
        x="13.5"
        y="29.5"
        fill="#fff"
        fontFamily="Inter,Segoe UI,Arial,sans-serif"
        fontSize="17"
        fontWeight="800"
        letterSpacing="-0.5"
      >
        WP
      </text>
      <path
        fill="#F97316"
        d="M10 40.5c7-4.8 17-4.8 24 0-3.8 3-8.4 4.6-13.5 4.6S13.8 43.5 10 40.5Z"
      />
    </svg>
  );
}

export default function Logo({
  className = '',
  variant = 'light',
  showTagline = true,
}: LogoProps) {
  if (variant === 'icon') {
    return (
      <span className={`inline-flex shrink-0 ${className}`} aria-label="WPServices">
        <LogoMark size={36} />
      </span>
    );
  }

  const isDark = variant === 'dark';
  const nameColor = isDark ? '#FFFFFF' : '#7C3AED';
  const taglineColor = isDark ? '#94A3B8' : '#64748B';
  const swooshColor = '#F97316';

  return (
    <span className={`inline-flex shrink-0 items-center leading-none select-none ${className}`} aria-label="WPServices">
      <svg
        viewBox="0 0 248 48"
        className={`w-auto ${isDark ? 'h-9' : 'h-10 sm:h-11'}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="WPServices WordPress Agency"
      >
        <g transform="translate(0 1)">
          <path
            fill="#7C3AED"
            d="M22 2c11 0 20 9 20 20s-9 20-20 20c-5.2 0-9.9-2-13.4-5.2C4.8 33.6 2 28.4 2 22 2 11 11 2 22 2Z"
          />
          <path
            fill="#7C3AED"
            d="M2 18c0-2.2 1.8-3.2 3.5-2.2L8 17.5V8.5C8 5.5 10 3.5 13 3.5h2.5c2.2 0 4 1.8 4 4V22c0 2.2-1.8 4-4 4h-1.8c-2.6 0-4.8-1.4-6-3.5L2 18Z"
          />
          <text
            x="11.5"
            y="27.5"
            fill="#fff"
            fontFamily="Inter,Segoe UI,Arial,sans-serif"
            fontSize="15.5"
            fontWeight="800"
            letterSpacing="-0.5"
          >
            WP
          </text>
          <path
            fill="#F97316"
            d="M8 39.5c6.5-4.5 16-4.5 22.5 0-3.5 2.8-7.8 4.3-12.5 4.3s-9-1.5-10-4.3Z"
          />
        </g>
        <path stroke={swooshColor} strokeWidth="2.4" strokeLinecap="round" d="M46 24c4-5 10-5 14 0" />
        <text
          x="66"
          y="31"
          fill={nameColor}
          fontFamily="Inter,Segoe UI,Arial,sans-serif"
          fontSize="24"
          fontWeight="800"
          letterSpacing="-0.6"
        >
          WPServices
        </text>
        <circle cx="214.5" cy="13.5" r="2.4" fill={swooshColor} />
        {showTagline && (
          <text
            x="128"
            y="43"
            fill={taglineColor}
            fontFamily="Inter,Segoe UI,Arial,sans-serif"
            fontSize="8.5"
            fontWeight="500"
            letterSpacing="0.2"
          >
            WordPress Agency
          </text>
        )}
      </svg>
    </span>
  );
}
