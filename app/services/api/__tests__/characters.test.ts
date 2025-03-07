import { CharactersService } from '../characters'

describe('CharactersService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('gets all characters successfully', async () => {
    const mockResponse = {
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
          url: 'https://swapi.dev/api/people/1/'
        }
      ],
      next: 'https://swapi.dev/api/people/?page=2'
    }

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    const result = await CharactersService.getAll()
    
    expect(result).toEqual(mockResponse)
    expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/people')
  })

  it('gets characters with pagination', async () => {
    const mockResponse = {
      results: [
        {
          name: 'Leia Organa',
          height: '150',
          mass: '49',
          hair_color: 'brown',
          skin_color: 'light',
          eye_color: 'brown',
          birth_year: '19BBY',
          gender: 'female',
          homeworld: 'https://swapi.dev/api/planets/2/',
          url: 'https://swapi.dev/api/people/5/'
        }
      ],
      next: null
    }

    const nextPageUrl = 'https://swapi.dev/api/people/?page=2'

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    const result = await CharactersService.getAll(nextPageUrl)
    
    expect(result).toEqual(mockResponse)
    expect(fetch).toHaveBeenCalledWith(nextPageUrl)
  })

  it('handles API errors correctly', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    })

    await expect(CharactersService.getAll()).rejects.toThrow('HTTP error! status: 404')
  })

  it('handles network errors correctly', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network error'))

    await expect(CharactersService.getAll()).rejects.toThrow('Network error')
  })

  it('handles failed requests with custom error message', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    })

    await expect(CharactersService.getAll()).rejects.toThrow('Failed to fetch characters')
  })
}) 