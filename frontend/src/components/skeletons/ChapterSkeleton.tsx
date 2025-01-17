import { Skeleton } from 'components/ui/skeleton'

export function ChapterSkeleton() {
  return (
    <div
      data-testid="skeleton-loader"
      className="mb-2 mt-4 flex w-full flex-col items-start rounded-md border border-border bg-white p-2 pb-4 pl-4 transition-colors duration-300 ease-linear dark:bg-[#212529] md:max-w-6xl"
    >
      <div className="mt-2 flex w-full flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:gap-6 md:pt-0">
        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-[300px] sm:w-[600px]" />
        </div>
      </div>

      <div className="w-full space-y-2 py-6 pr-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[100%]" />
        <Skeleton className="h-4 w-[99%]" />
        <Skeleton className="h-4 w-[100%]" />
        <Skeleton className="h-4 w-[75%]" />
      </div>

      <div className="flex items-center gap-2 pt-0">
        <Skeleton className="h-5 w-[450px]" />
      </div>

      <div className="flex w-full flex-col gap-4 pr-4 pt-2">
        <div className="flex w-full flex-wrap items-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-full" />
          ))}
        </div>

        <div className="flex w-full items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={`lang-${i}`} className="h-5 w-5 rounded-full" />
              ))}
            </div>
          </div>

          <Skeleton className="h-9 w-[120px] rounded-md" />
        </div>
      </div>
    </div>
  )
}

export default ChapterSkeleton
