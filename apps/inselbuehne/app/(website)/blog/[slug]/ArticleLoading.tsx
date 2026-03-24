export default function ArticleLoading() {
  return (
    <div className="animate-pulse">
      <section className="bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 pt-48 pb-24 text-center">
          <div className="mx-auto h-4 w-24 rounded bg-slate-200" />
          <div className="mx-auto mt-6 h-14 w-3/4 rounded bg-slate-200" />
          <div className="mx-auto mt-5 h-6 w-2/3 rounded bg-slate-200" />
        </div>
      </section>
      <div className="container mx-auto max-w-4xl px-4 pb-24">
        <div className="mb-8 aspect-[16/10] rounded-2xl bg-slate-200" />
        <div className="mb-8 flex gap-8">
          <div className="h-10 w-24 rounded bg-slate-200" />
          <div className="h-10 w-28 rounded bg-slate-200" />
          <div className="h-10 w-24 rounded bg-slate-200" />
        </div>
        <div className="space-y-4">
          <div className="h-4 w-full rounded bg-slate-200" />
          <div className="h-4 w-11/12 rounded bg-slate-200" />
          <div className="h-4 w-5/6 rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
