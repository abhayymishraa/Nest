import { Metadata } from 'next'
import React from 'react'
import { GET_ORGANIZATION_DATA } from 'server/queries/organizationQueries'
import { apolloServerClient } from 'utils/helpers/apolloClientServer'
import { generateSeoMetadata } from 'utils/metaconfig'

export async function generateMetadata({
  params,
}: {
  params: { organizationKey: string }
}): Promise<Metadata> {
  const { organizationKey } = await params
  const client = await apolloServerClient()
  const { data } = await client.query({
    query: GET_ORGANIZATION_DATA,
    variables: {
      login: organizationKey,
    },
  })
  const organization = data?.organization
  if (!organization) {
    return
  }
  return generateSeoMetadata({
    title: organization?.name || organization?.login,
    description: organization?.description || 'Discover details about this OWASP organization.',
    canonicalPath: `/organizations/${organizationKey}`,
  })
}

export default function OrganizationDetailsLayout({ children }: { children: React.ReactNode }) {
  return <div className="organization-details-layout">{children}</div>
}
