import { Skeleton } from 'components/ui/Skeleton'

export function CommunitySkeleton() {
  return (
    <div
      data-testid="skeleton-loader"
      className="group flex h-64 w-80 flex-col items-center rounded-lg bg-white p-6 text-left shadow-lg dark:bg-gray-800"
    >
      <div className="flex w-full flex-col items-center space-y-4">
        <Skeleton className="relative h-20 w-20 rounded-full ring-2 ring-gray-100 dark:ring-gray-700" />
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="mt-auto">
        <Skeleton className="h-5 w-24" />
      </div>
    </div>
  )
}

export default CommunitySkeleton
