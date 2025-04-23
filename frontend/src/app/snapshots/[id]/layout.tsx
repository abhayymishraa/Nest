import { Metadata } from 'next'
import React from 'react'
import { GET_SNAPSHOT_DETAILS } from 'server/queries/snapshotQueries'
import { apolloServerClient } from 'utils/helpers/apolloClientServer'
import { generateSeoMetadata } from 'utils/metaconfig'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id: snapshotKey } = await params
  const client = await apolloServerClient()
  const { data } = await client.query({
    query: GET_SNAPSHOT_DETAILS,
    variables: { key: snapshotKey },
  })
  const snapshot = data?.snapshot
  if (!snapshot) {
    return
  }
  return generateSeoMetadata({
    title: snapshot?.title,
    description: snapshot.description || 'Discover details about this OWASP snapshot.',
    canonicalPath: `/snapshots/${snapshotKey}`,
    keywords: ['owasp', 'snapshot', snapshotKey, snapshot.name],
  })
}
export default function SnapshotDetailsLayout({ children }: { children: React.ReactNode }) {
  return children
}
