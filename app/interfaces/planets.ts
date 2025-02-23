// Tipos para os climas possíveis
export type Climate = 'arid' | 'temperate' | 'tropical' | 'frozen' | 'murky';

// Tipo para garantir que a URL seja válida
export type SWAPIUrl = `https://swapi.dev/api/${string}`;

// Interface para o planeta
export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: Climate | string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: SWAPIUrl[];
  films: SWAPIUrl[];
  created: string;
  edited: string;
  url: SWAPIUrl;
}

// Interface para a resposta da API
export interface PlanetsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
} 