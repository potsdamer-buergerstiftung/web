const SkeletonLineItem = () => {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
      <div className="flex gap-4">
        <div className="h-24 w-24 shrink-0 animate-pulse rounded-xl bg-muted" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              <div className="h-3 w-24 animate-pulse rounded bg-muted" />
            </div>
            <div className="space-y-2 text-right">
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
              <div className="h-3 w-16 animate-pulse rounded bg-muted" />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
            <div className="h-12 w-16 animate-pulse rounded-md bg-muted" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonLineItem
