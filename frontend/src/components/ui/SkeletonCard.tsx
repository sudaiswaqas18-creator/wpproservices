export default function SkeletonCard({ lines = 3 }: { lines?: number }) {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-6 shadow-card">
      <div className="h-12 w-12 rounded-xl bg-gray-200" />
      <div className="mt-4 h-5 w-2/3 rounded bg-gray-200" />
      <div className="mt-3 space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-3 rounded bg-gray-100" style={{ width: `${90 - i * 12}%` }} />
        ))}
      </div>
    </div>
  );
}
