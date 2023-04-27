import LocalForage from 'localforage'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { LocalForageWrapper, persistCache } from 'apollo3-cache-persist'

const httpLink = createHttpLink({
  uri: 'https://beta.pokeapi.co/graphql/v1beta'
})

const cache = new InMemoryCache()

await persistCache({
  cache,
  storage: new LocalForageWrapper(LocalForage)
})

const client = new ApolloClient({
  link: httpLink,
  cache
})

export default client
