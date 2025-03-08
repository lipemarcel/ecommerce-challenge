import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import CharactersList from '../characters-list'
import { CharactersService } from '@/app/services/api/characters'

const mockCharactersResponse = {
  results: [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/'
    }
  ],
  next: 'https://swapi.dev/api/people/?page=2'
}

jest.mock('@/app/services/api/characters', () => ({
  CharactersService: {
    getAll: jest.fn(() => Promise.resolve(mockCharactersResponse))
  }
}))

// Mock do PlanetsService para evitar erros de fetch
jest.mock('@/app/services/api/planets', () => ({
  PlanetsService: {
    getById: jest.fn(() => Promise.resolve({ name: 'Tatooine' })),
    getAllPlanets: jest.fn(() => Promise.resolve([{ name: 'Tatooine', url: '1' }]))
  }
}))

describe('CharactersList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders characters correctly', async () => {
    await act(async () => {
      render(<CharactersList />)
    })

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    })
  })

  it('shows loading state initially', () => {
    render(<CharactersList />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('loads more characters when clicking load more button', async () => {
    await act(async () => {
      render(<CharactersList />)
    })

    // Espera o botão aparecer
    await waitFor(() => {
      expect(screen.getByText('Load More')).toBeInTheDocument()
    })

    // Clica no botão
    await act(async () => {
      fireEvent.click(screen.getByText('Load More'))
    })

    // Espera a segunda chamada ser feita
    await waitFor(() => {
      expect(CharactersService.getAll).toHaveBeenCalledTimes(2)
    })
  })

  it('handles error state', async () => {
    (CharactersService.getAll as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'))

    await act(async () => {
      render(<CharactersList />)
    })

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument()
    })
  })
})