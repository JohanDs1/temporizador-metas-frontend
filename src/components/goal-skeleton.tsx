import { Skeleton } from "@/components/ui/skeleton"

export function GoalCardSkeleton() {
  return (
    <article className="rounded-3xl border border-border/70 bg-card p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-7">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-2">
          {/* Badge */}
          <Skeleton className="h-6 w-24 rounded-full" />

          {/* Title */}
          <Skeleton className="h-6 w-3/4 rounded-md" />

          {/* Description */}
          <div className="space-y-1.5 pt-1">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-2/3 rounded-md" />
          </div>
        </div>

        {/* Dropdown button */}
        <Skeleton className="size-8 shrink-0 rounded-full" />
      </header>

      {/* Countdown */}
      <div className="mt-6">
        <div className="flex items-center justify-center gap-3">
          <div className="space-y-2 text-center">
            <Skeleton className="h-10 w-16 rounded-lg" />
            <Skeleton className="mx-auto h-3 w-10 rounded-md" />
          </div>

          <Skeleton className="h-8 w-2 rounded-md" />

          <div className="space-y-2 text-center">
            <Skeleton className="h-10 w-16 rounded-lg" />
            <Skeleton className="mx-auto h-3 w-10 rounded-md" />
          </div>

          <Skeleton className="h-8 w-2 rounded-md" />

          <div className="space-y-2 text-center">
            <Skeleton className="h-10 w-16 rounded-lg" />
            <Skeleton className="mx-auto h-3 w-10 rounded-md" />
          </div>

          <Skeleton className="h-8 w-2 rounded-md" />

          <div className="space-y-2 text-center">
            <Skeleton className="h-10 w-16 rounded-lg" />
            <Skeleton className="mx-auto h-3 w-10 rounded-md" />
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-5">
        <Skeleton className="h-1 w-full rounded-full" />
      </div>

      {/* Footer */}
      <footer className="mt-5 flex items-center gap-2">
        <Skeleton className="size-4 shrink-0 rounded-full" />
        <Skeleton className="h-4 w-40 rounded-md" />
      </footer>
    </article>
  )
}