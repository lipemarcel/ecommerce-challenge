import { PlanetsResponse, Planet } from '@/app/interfaces/planets';
import { FilterType } from '@/app/interfaces/filters';
import { API_CONFIG } from './config';

export class PlanetsService {
  static async getAll(filter: FilterType = FilterType.ALL): Promise<PlanetsResponse> {
    try {
      let url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PLANETS}`;
      
      // Adiciona parâmetros de filtro se necessário
      if (filter !== FilterType.ALL) {
        url += `?filter=${filter}`;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: PlanetsResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch planets: ${error.message}`);
      }
      throw new Error('Failed to fetch planets');
    }
  }

  static async getAllPlanets(): Promise<Planet[]> {
    try {
      let allPlanets: Planet[] = [];
      let nextPage: string | null = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PLANETS}`;

      while (nextPage) {
        const response = await fetch(nextPage);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: PlanetsResponse = await response.json();
        allPlanets = [...allPlanets, ...data.results];
        nextPage = data.next;
      }

      return allPlanets;
    } catch (error) {
      throw new Error(`Failed to fetch planets: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async getById(url: string): Promise<{ name: string }> {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { name: data.name };
    } catch (error) {
      throw new Error(`Failed to fetch planet: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} 