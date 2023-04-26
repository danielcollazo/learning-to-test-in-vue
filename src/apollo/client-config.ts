import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'

const httpLink = createHttpLink({
  uri: 'https://beta.pokeapi.co/graphql/v1beta'
})

const cache = new InMemoryCache()

const client = new ApolloClient({
  link: httpLink,
  cache
})

export default client
