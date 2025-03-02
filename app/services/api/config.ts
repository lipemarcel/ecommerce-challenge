export const API_CONFIG = {
  BASE_URL: 'https://swapi.dev/api',
  ENDPOINTS: {
    PLANETS: '/planets',
    PEOPLE: '/people',
  },
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
} as const; 