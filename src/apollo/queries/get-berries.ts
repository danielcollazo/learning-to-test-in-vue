import gql from 'graphql-tag'

const GET_BERRIES_QUERY = gql`
  query getBerries($id: Int!) {
    pokemon_v2_berry(where: { id: { _eq: $id } }) {
      id
      name
    }
  }
`

export default GET_BERRIES_QUERY
