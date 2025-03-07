import { PlanetsService } from '../planets'
import { FilterType } from '@/app/interfaces/filters'

describe('PlanetsService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('gets all planets successfully', async () => {
    const mockResponse = {
      results: [
        {
          name: 'Tatooine',
          climate: 'arid',
          terrain: 'desert',
          url: 'https://swapi.dev/api/planets/1/'
        }
      ]
    }

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    const result = await PlanetsService.getAll(FilterType.ALL)
    
    expect(result).toEqual(mockResponse)
    expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets')
  })

  it('gets planet by id successfully', async () => {
    const mockPlanet = {
      name: 'Tatooine'
    }

    const planetUrl = 'https://swapi.dev/api/planets/1'

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPlanet)
    })

    const result = await PlanetsService.getById(planetUrl)
    
    expect(result).toEqual(mockPlanet)
    expect(fetch).toHaveBeenCalledWith(planetUrl)
  })

  it('handles API errors correctly', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    })

    await expect(PlanetsService.getAll(FilterType.ALL)).rejects.toThrow('HTTP error! status: 404')
  })

  it('handles network errors correctly', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network error'))

    await expect(PlanetsService.getAll(FilterType.ALL)).rejects.toThrow('Network error')
  })

  it('gets all planets with pagination', async () => {
    const firstPage = {
      results: [
        {
          name: 'Tatooine',
          climate: 'arid',
          terrain: 'desert',
          url: 'https://swapi.dev/api/planets/1/'
        }
      ],
      next: 'https://swapi.dev/api/planets/?page=2'
    }

    const secondPage = {
      results: [
        {
          name: 'Alderaan',
          climate: 'temperate',
          terrain: 'grasslands',
          url: 'https://swapi.dev/api/planets/2/'
        }
      ],
      next: null
    }

    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(firstPage)
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(secondPage)
      })

    const result = await PlanetsService.getAllPlanets()
    
    expect(result).toEqual([...firstPage.results, ...secondPage.results])
    expect(fetch).toHaveBeenCalledTimes(2)
  })

  it('gets planets with filter', async () => {
    const mockResponse = {
      results: [
        {
          name: 'Tatooine',
          climate: 'arid',
          terrain: 'desert',
          url: 'https://swapi.dev/api/planets/1/'
        }
      ]
    }

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    const result = await PlanetsService.getAll(FilterType.PLANETS)
    
    expect(result).toEqual(mockResponse)
    expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets?filter=planets')
  })
}) 