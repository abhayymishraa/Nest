import { Card, CardContent, CardFooter, CardHeader } from 'components/ui/card'
import { Skeleton } from 'components/ui/skeleton'

export function UserDetailSkeleton() {
  return (
    <div data-testid="skeleton-loader" className="mt-24 min-h-screen w-full p-4">
      <div className="mx-auto md:max-w-3xl">
        <Card>
          <CardHeader className="relative p-0">
            <div className="h-32 bg-muted"></div>
            <div className="relative px-6">
              <div className="flex flex-col items-start justify-between sm:flex-row sm:space-x-6">
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
                  <div className="z-10 -mt-24">
                    <Skeleton className="h-40 w-40 rounded-full" />
                  </div>
                  <div className="mt-6 sm:mt-0 sm:pb-4">
                    <Skeleton className="mb-2 h-8 w-48" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                </div>
                <Skeleton className="mt-4 h-10 w-40 rounded-full" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 py-6">
            <Skeleton className="mb-4 h-4 w-3/4" />
            <Skeleton className="mb-2 h-4 w-1/2" />
            <Skeleton className="mb-2 h-4 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </CardContent>
          <div className="grid grid-cols-3 gap-4 bg-muted p-6">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="flex flex-col items-center p-6">
                <Skeleton className="mb-2 h-8 w-8 rounded-full" />
                <Skeleton className="mb-1 h-6 w-16" />
                <Skeleton className="h-4 w-12" />
              </Card>
            ))}
          </div>
          <CardFooter className="flex items-center justify-center">
            <div className="pt-4">
              <Skeleton className="h-4 w-48" />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default UserDetailSkeleton
