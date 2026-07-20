export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 shadow-sm">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
          <path d="M4 18V6h3.5l3 5.5L13.5 6H17v12h-2.5v-6.5l-3.5 6h-2l-3.5-6V18H4z" />
        </svg>
      </div>
      <div className="leading-tight">
        <span className="block text-base font-bold text-gray-900">PixelForge</span>
        <span className="block text-[10px] font-medium uppercase tracking-widest text-brand-600">
          Digital
        </span>
      </div>
    </div>
  );
}
