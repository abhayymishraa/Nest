import { Skeleton } from 'components/ui/Skeleton'

export function ProjectSkeleton() {
  const SKELETON_AVATAR_COUNT = 16
  const SKELETON_TOPIC_COUNT = 3
  return (
    <div
      data-testid="skeleton-loader"
      className="mb-2 mt-4 flex w-full flex-col items-start rounded-md border border-border bg-white p-2 pb-4 pl-4 transition-colors duration-300 ease-linear dark:bg-[#212529] md:max-w-6xl"
    >
      <div className="mt-2 flex w-full flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:gap-6 md:pt-0">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-6 w-[200px] sm:w-[300px]" />
        </div>
      </div>
      <div className="w-full space-y-2 py-4 pr-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[98%]" />
        <Skeleton className="h-4 w-[96%]" />
        <Skeleton className="h-4 w-[94%]" />
      </div>
      <div className="flex items-center gap-2 py-1">
        <Skeleton className="h-4 w-[300px]" />
      </div>
      <div className="flex w-full flex-col gap-4 pr-4 pt-1">
        <div className="flex w-full flex-wrap items-center gap-2">
          {Array.from({ length: SKELETON_AVATAR_COUNT }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-full" />
          ))}
        </div>
        <div className="flex w-full items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {Array.from({ length: SKELETON_TOPIC_COUNT }).map((_, i) => (
                <Skeleton key={`lang-${i}`} className="h-6 w-20 rounded-full" />
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {Array.from({ length: SKELETON_TOPIC_COUNT }).map((_, i) => (
                <Skeleton key={`topic-${i}`} className="h-6 w-24 rounded-full" />
              ))}
            </div>
          </div>
          <Skeleton className="h-9 w-[120px] rounded-md" />
        </div>
      </div>
    </div>
  )
}

export default ProjectSkeleton
