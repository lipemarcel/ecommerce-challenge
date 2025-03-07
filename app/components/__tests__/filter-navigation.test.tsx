import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import FilterNavigation from '../filter-navigation'

jest.mock('@/app/services/api/planets', () => ({
  PlanetsService: {
    getAllPlanets: jest.fn(() => Promise.resolve([
      { name: 'Tatooine', url: 'https://swapi.dev/api/planets/1/' },
      { name: 'Alderaan', url: 'https://swapi.dev/api/planets/2/' }
    ]))
  }
}))

const mockOnFilterChange = jest.fn()

describe('FilterNavigation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading state initially', () => {
    render(<FilterNavigation onFilterChange={mockOnFilterChange} />)
    expect(screen.getByText('Loading planets...')).toBeInTheDocument()
  })

  it('renders planets after loading', async () => {
    render(<FilterNavigation onFilterChange={mockOnFilterChange} />)

    // Espera o carregamento inicial terminar
    await waitFor(() => {
      expect(screen.queryByText('Loading planets...')).not.toBeInTheDocument()
    })

    // Clica no dropdown para abrir
    const dropdown = screen.getByText('All')
    fireEvent.click(dropdown)

    // Verifica se os planetas estão visíveis
    expect(screen.getByText('Tatooine')).toBeInTheDocument()
    expect(screen.getByText('Alderaan')).toBeInTheDocument()
  })

  it('calls onFilterChange when a planet is selected', async () => {
    render(<FilterNavigation onFilterChange={mockOnFilterChange} />)

    // Espera o carregamento inicial terminar
    await waitFor(() => {
      expect(screen.queryByText('Loading planets...')).not.toBeInTheDocument()
    })

    // Clica no dropdown para abrir
    const dropdown = screen.getByText('All')
    fireEvent.click(dropdown)

    // Clica em um planeta
    const planetOption = screen.getByText('Tatooine')
    fireEvent.click(planetOption)

    expect(mockOnFilterChange).toHaveBeenCalledWith('Tatooine')
  })
})