import { render, screen, waitFor } from '@testing-library/react'
import CharacterCard from '../character-card'

// Mock que atrasa a resposta para simular loading
jest.mock('@/app/services/api/planets', () => ({
  PlanetsService: {
    getById: jest.fn(() => new Promise(resolve => {
      setTimeout(() => resolve({ name: 'Tatooine' }), 100)
    }))
  }
}))

const mockCharacter = {
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

describe('CharacterCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders character information correctly', async () => {
    render(<CharacterCard character={mockCharacter} />)

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    expect(screen.getByText(/Height • 172/)).toBeInTheDocument()
    expect(screen.getByText(/Mass • 77/)).toBeInTheDocument()
    expect(screen.getByText(/Gender • male/)).toBeInTheDocument()

    // Espera o planeta carregar
    await waitFor(() => {
      expect(screen.getByText('Tatooine')).toBeInTheDocument()
    })
  })

  it('handles planet loading state', async () => {
    render(<CharacterCard character={mockCharacter} />)
    
    // O texto "Loading..." deve aparecer antes do planeta carregar
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    
    // Espera o planeta carregar para garantir que o teste não interfira com outros
    await waitFor(() => {
      expect(screen.getByText('Tatooine')).toBeInTheDocument()
    })
  })
}) 