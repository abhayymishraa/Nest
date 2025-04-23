import { Metadata } from 'next'
import React from 'react'
import { GET_CHAPTER_DATA } from 'server/queries/chapterQueries'
import { apolloServerClient } from 'utils/helpers/apolloClientServer'
import { generateSeoMetadata } from 'utils/metaconfig'

export async function generateMetadata({
  params,
}: {
  params: { chapterKey: string }
}): Promise<Metadata> {
  const { chapterKey } = await params
  const client = await apolloServerClient()
  const { data } = await client.query({
    query: GET_CHAPTER_DATA,
    variables: {
      key: chapterKey,
    },
  })
  const chapter = data?.chapter
  if (!chapter) {
    return
  }
  return generateSeoMetadata({
    title: chapter.name,
    description: chapter.summary || 'Discover details about this OWASP chapter.',
    canonicalPath: `/chapter/${chapterKey}`,
    keywords: ['owasp', 'security', 'chapter', chapterKey, chapter.name],
  })
}

export default function ChapterDetailsLayout({ children }: { children: React.ReactNode }) {
  return <div className="chapter-layout">{children}</div>
}
