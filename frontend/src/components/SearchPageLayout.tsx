import React, { useState } from 'react'
import Pagination from 'components/Pagination'
import SearchBar from 'components/Search'
import ChapterSkeleton from 'components/skeletons/Chapters'
import ContributeSkeleton from 'components/skeletons/Contribute'
import ProjectSkeleton from 'components/skeletons/Projects'
import CommunitySkeleton from 'components/skeletons/Users'

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
  sortChildren?: React.ReactNode
}

const SKELETON_PROJECT_COUNT = 4
const SKELETON_CONTRIBUTE_COUNT = 4
const SKELETON_CHAPTER_COUNT = 4
const SKELETON_USER_COUNT = 12

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
  loadingImageUrl = '/img/owasp_icon_white_sm.png',
  sortChildren,
  children,
}: SearchPageLayoutProps) => {
  const [isSearchBarReady, setIsSearchBarReady] = useState(false)

  const handleSearchBarReady = () => {
    setIsSearchBarReady(true)
  }

  return (
    <div className="mt-16 flex min-h-screen w-full flex-col items-center justify-normal p-5 text-text">
      <div className="flex w-full items-center justify-center">
        <SearchBar
          indexName={indexName}
          onSearch={onSearch}
          placeholder={searchPlaceholder}
          initialValue={searchQuery}
          onReady={handleSearchBarReady}
        />
        <div>{sortChildren}</div>
      </div>
      {!isSearchBarReady || !isLoaded ? (
        <>
          {indexName === 'projects' && (
            <div className="flex min-h-screen w-full flex-col items-center justify-center">
              {Array.from({ length: SKELETON_PROJECT_COUNT }).map((_, idx) => (
                <ProjectSkeleton key={idx} />
              ))}
            </div>
          )}
          {indexName === 'issues' && (
            <div className="flex min-h-screen w-full flex-col items-center">
              {Array.from({ length: SKELETON_CONTRIBUTE_COUNT }).map((_, idx) => (
                <ContributeSkeleton key={idx} />
              ))}
            </div>
          )}
          {(indexName === 'chapters' || indexName === 'committees') && (
            <div className="flex min-h-screen w-full flex-col items-center justify-center">
              {Array.from({ length: SKELETON_CHAPTER_COUNT }).map((_, idx) => (
                <ChapterSkeleton key={idx} />
              ))}
            </div>
          )}
          {indexName === 'users' && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: SKELETON_USER_COUNT }).map((_, idx) => (
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
