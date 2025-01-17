import { Skeleton } from 'components/ui/Skeleton'

export function ContributeSkeleton() {
  return (
    <div
      data-testid="skeleton-loader"
      className="mb-2 mt-4 flex w-full flex-col items-start rounded-md border border-border bg-white p-2 pb-4 pl-4 transition-colors duration-300 ease-linear dark:bg-[#212529] md:max-w-6xl"
    >
      <div className="mt-2 flex w-full flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:gap-6 md:pt-0">
        <div className="flex items-center gap-3">
          <Skeleton data-testid="loading-spinner" className="h-6 w-[300px] sm:w-[600px]" />
        </div>
      </div>
      <Skeleton className="my-4 h-4 w-[150px]" />

      <div className="w-full space-y-2 pb-4 pr-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
      </div>

      <div className="mt-4 flex w-full justify-between">
        <div className="flex items-center gap-2 py-1">
          <Skeleton className="h-5 w-[60px]" />
          <Skeleton className="h-5 w-[60px]" />
          <Skeleton className="h-5 w-[60px]" />
        </div>
        <Skeleton className="h-9 w-[120px]" />
      </div>
    </div>
  )
}

export default ContributeSkeleton
