import gql from 'graphql-tag'

const GET_POKEMON_QUERY = gql`
  query getPokemon($id: Int!) {
    pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
      id
      name
    }
  }
`

export default GET_POKEMON_QUERY
