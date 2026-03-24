export default function PostGridLoading() {
  return (
    <div className="grid grid-cols-1 gap-8 pt-10 animate-pulse md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-tl-xl rounded-br-xl bg-white shadow-lg"
        >
          <div className="aspect-[5/4] bg-slate-200" />
          <div className="space-y-4 p-6 sm:p-8 md:p-6 lg:p-8">
            <div className="h-4 w-40 rounded bg-slate-200" />
            <div className="h-8 w-4/5 rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-5/6 rounded bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
