interface LogoProps {
  className?: string;
  compact?: boolean;
}

export default function Logo({ className = '', compact = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 via-brand-500 to-brand-600 shadow-lg shadow-brand-500/20 ring-1 ring-white/20">
        <svg viewBox="0 0 40 40" className="h-6 w-6" fill="none" aria-hidden>
          <path
            d="M7 28V12h3.2l3.8 9.2L17.8 12H21v16h-2.8v-9.4L14.6 28h-2.4L9.2 18.6V28H7z"
            fill="white"
          />
          <path
            d="M23 28V12h3l2.2 5.4c.6 1.5 1.1 3 1.6 4.6h.1c.5-1.6 1-3.1 1.6-4.6L31.5 12H34.5v16h-2.6v-9.8l-3.4 9.8h-2l-3.4-9.8V28H23z"
            fill="white"
            fillOpacity="0.92"
          />
          <circle cx="32" cy="10" r="2.5" fill="white" fillOpacity="0.45" />
          <circle cx="8" cy="10" r="1.5" fill="white" fillOpacity="0.35" />
        </svg>
      </div>
      {!compact && (
        <div className="leading-none">
          <span className="block text-[17px] font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-brand-500 to-brand-600 bg-clip-text text-transparent">WP</span>
            <span className="text-slate-700">Services</span>
          </span>
          <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            WordPress Agency
          </span>
        </div>
      )}
    </div>
  );
}
