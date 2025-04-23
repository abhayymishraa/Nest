import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { cookies } from 'next/headers'
const isServer = typeof window === 'undefined'

export async function apolloServerClient() {
  const host = isServer ? 'http://nest-backend:8000' : 'http://localhost:8000'

  const httpLink = createHttpLink({
    uri: `${host}/graphql/`,
    credentials: 'same-origin',
  })

  const authLink = setContext(async (_, { headers }) => {
    let csrfToken = null
    const cookieValue = await getCsrfTokenOnServer()
    csrfToken = cookieValue
    return {
      headers: {
        ...headers,
        'X-CSRFToken': csrfToken || '',
        Cookie: csrfToken ? `csrftoken=${csrfToken}` : '',
      },
    }
  })

  return new ApolloClient({
    cache: new InMemoryCache().restore(globalThis.__APOLLO_STATE__ || {}),
    link: authLink.concat(httpLink),
    ssrMode: isServer,
  })
}
export const getCsrfTokenOnServer = async () => {
  const cookieStore = await cookies()
  const csrfCookie = cookieStore.get('csrftoken')
  return csrfCookie?.value
}
