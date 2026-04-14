const SkeletonCartTotals = ({ header = true }) => {
  return (
    <div className="flex flex-col gap-3">
      {header && <div className="mb-4 h-4 w-32 animate-pulse rounded bg-muted" />}
      <div className="flex items-center justify-between">
        <div className="h-3 w-32 animate-pulse rounded bg-muted" />
        <div className="h-3 w-32 animate-pulse rounded bg-muted" />
      </div>

      <div className="flex items-center justify-between">
        <div className="h-3 w-24 animate-pulse rounded bg-muted" />
        <div className="h-3 w-24 animate-pulse rounded bg-muted" />
      </div>

      <div className="flex items-center justify-between">
        <div className="h-3 w-28 animate-pulse rounded bg-muted" />
        <div className="h-3 w-20 animate-pulse rounded bg-muted" />
      </div>

      <div className="my-2 h-px w-full border-b border-dashed border-border" />

      <div className="flex items-center justify-between">
        <div className="mb-4 h-6 w-32 animate-pulse rounded bg-muted" />
        <div className="mb-4 h-6 w-24 animate-pulse rounded bg-muted" />
      </div>
    </div>
  )
}

export default SkeletonCartTotals
