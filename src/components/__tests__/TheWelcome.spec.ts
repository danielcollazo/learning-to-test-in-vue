import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest'
import { VueWrapper, flushPromises, mount } from '@vue/test-utils'
import TheWelcome from '../TheWelcome.vue'
import { createMockClient } from 'mock-apollo-client'
import GET_POKEMON_QUERY from '@/apollo/queries/get-pokemon'
import { DefaultApolloClient } from '@vue/apollo-composable'
import GET_BERRIES_QUERY from '@/apollo/queries/get-berries'
import { render, screen } from '@testing-library/vue'

const pokemonMockResponse = {
  data: {
    pokemon_v2_pokemon: [{ __typename: 'pokemon_v2_pokemon', id: 1, name: 'bulbasaur' }]
  }
}

const berriesMockResponse = {
  data: { pokemon_v2_berry: [{ id: 3, name: 'pecha', __typename: 'pokemon_v2_berry' }] }
}

describe('Vue Test Utils', () => {
  let wrapper: VueWrapper<any>
  let pokemonQueryHandler: Mock<any, any>
  let berriesQueryHandler: Mock<any, any>

  beforeEach(() => {
    const mockClient = createMockClient()
    pokemonQueryHandler = vi.fn().mockResolvedValue(pokemonMockResponse)
    berriesQueryHandler = vi.fn().mockResolvedValue(berriesMockResponse)

    mockClient.setRequestHandler(GET_POKEMON_QUERY, pokemonQueryHandler)
    mockClient.setRequestHandler(GET_BERRIES_QUERY, berriesQueryHandler)

    wrapper = mount(TheWelcome, {
      global: {
        provide: {
          [DefaultApolloClient]: mockClient
        }
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('tests GET_POKEMON_QUERY', async () => {
    expect(wrapper.text()).toContain('Loading Pokemon...')

    await flushPromises()

    expect(wrapper.text()).toContain('bulbasaur')
    expect(pokemonQueryHandler).toHaveBeenCalledOnce()
    expect(pokemonQueryHandler).toBeCalledWith({ id: 1 })
    expect(TheWelcome).toBeTruthy()
  })

  it('tests GET_BERRIES_QUERY', async () => {
    expect(wrapper.text()).toContain('Loading Berry...')

    await flushPromises()

    expect(wrapper.text()).toContain('pecha')
    expect(berriesQueryHandler).toHaveBeenCalledOnce()
    expect(berriesQueryHandler).toBeCalledWith({ id: 3 })
  })
})

describe('Testing Library', () => {
  let pokemonQueryHandler: Mock<any, any>
  let berriesQueryHandler: Mock<any, any>

  beforeEach(() => {
    pokemonQueryHandler = vi.fn().mockResolvedValue(pokemonMockResponse)
    berriesQueryHandler = vi.fn().mockResolvedValue(berriesMockResponse)
    const mockClient = createMockClient()

    mockClient.setRequestHandler(GET_POKEMON_QUERY, pokemonQueryHandler)
    mockClient.setRequestHandler(GET_BERRIES_QUERY, berriesQueryHandler)

    render(TheWelcome, {
      global: {
        provide: {
          [DefaultApolloClient]: mockClient
        }
      }
    })
  })

  it('Renders result element', async () => {
    const pokemonLoadingText = screen.queryByText('Loading Pokemon...')
    expect(pokemonLoadingText).toBeInTheDocument()

    await flushPromises()

    expect(berriesQueryHandler).toHaveBeenCalledOnce()
    expect(pokemonQueryHandler).toHaveBeenCalledOnce()
    expect(pokemonQueryHandler).toBeCalledWith({ id: 1 })

    const resultsElement = screen.getByText(/bulbasaur/i)
    expect(resultsElement).toBeInTheDocument()
    expect(pokemonLoadingText).not.toBeInTheDocument()
  })
})
