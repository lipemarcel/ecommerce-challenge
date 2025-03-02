import { CharactersResponse } from '@/app/interfaces/characters';
import { API_CONFIG } from './config';

export class CharactersService {
  static async getAll(): Promise<CharactersResponse> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PEOPLE}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch characters: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} 