import { PlanetsResponse } from '@/app/interfaces/planets';
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

  static async getById(id: string): Promise<PlanetsResponse> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PLANETS}/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: PlanetsResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch planet ${id}: ${error.message}`);
      }
      throw new Error(`Failed to fetch planet ${id}`);
    }
  }
} 