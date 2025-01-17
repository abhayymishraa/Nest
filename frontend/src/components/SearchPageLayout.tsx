import React, { useState } from 'react'
import Pagination from 'components/Pagination'
import SearchBar from 'components/Search'
import ChapterSkeleton from 'components/skeletons/ChapterSkeleton'
import CommunitySkeleton from 'components/skeletons/CommunitySkeleton'
import ContributeSkeleton from 'components/skeletons/ContributeSkeleton'
import ProjectSkeleton from 'components/skeletons/ProjectSkeleton'

interface SearchPageLayoutProps {
  isLoaded: boolean
  totalPages: number
  currentPage: number
  searchQuery: string

  onSearch: (query: string) => void

  onPageChange: (page: number) => void
  searchPlaceholder: string
  empty: string
  indexName: string
  loadingImageUrl?: string
  children?: React.ReactNode
}

const SearchPageLayout = ({
  isLoaded,
  totalPages,
  currentPage,
  searchQuery,
  onSearch,
  onPageChange,
  searchPlaceholder,
  empty,
  indexName,
  children,
}: SearchPageLayoutProps) => {
  const [isSearchBarReady, setIsSearchBarReady] = useState(false)

  const handleSearchBarReady = () => {
    setIsSearchBarReady(true)
  }

  return (
    <div className="mt-16 flex min-h-screen w-full flex-col items-center justify-normal p-5 text-text">
      <div className="w-full max-w-lg">
        <SearchBar
          indexName={indexName}
          onSearch={onSearch}
          placeholder={searchPlaceholder}
          initialValue={searchQuery}
          onReady={handleSearchBarReady}
        />
      </div>
      {!isSearchBarReady || !isLoaded ? (
        <>
          {indexName === 'projects' && (
            <div className="flex min-h-screen w-full flex-col items-center justify-center">
              {[...Array(4)].map((_, idx) => (
                <ProjectSkeleton key={idx} />
              ))}
            </div>
          )}
          {indexName === 'issues' && (
            <div className="flex min-h-screen w-full flex-col items-center">
              {[...Array(4)].map((_, idx) => (
                <ContributeSkeleton key={idx} />
              ))}
            </div>
          )}
          {(indexName === 'chapters' || indexName === 'committees') && (
            <div className="flex min-h-screen w-full flex-col items-center justify-center">
              {[...Array(4)].map((_, idx) => (
                <ChapterSkeleton key={idx} />
              ))}
            </div>
          )}
          {indexName === 'users' && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(12)].map((_, idx) => (
                <CommunitySkeleton key={idx} />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <div>
            {totalPages === 0 && <div className="text bg:text-white m-4 text-xl">{empty}</div>}
            {children}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              isLoaded={isLoaded}
            />
          )}
        </>
      )}
    </div>
  )
}

export default SearchPageLayout
