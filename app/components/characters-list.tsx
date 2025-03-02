'use client';

import { useEffect, useState } from 'react';
import { Character } from '@/app/interfaces/characters';
import { CharactersService } from '@/app/services/api/characters';
import FilterNavigation from './filter-navigation';
import CharacterCard from './character-card';
import { PlanetsService } from '@/app/services/api/planets';

const CharactersList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        const data = await CharactersService.getAll();
        setCharacters(data.results);
        setFilteredCharacters(data.results);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleFilterChange = async (planetName: string) => {
    if (planetName === 'All') {
      setFilteredCharacters(characters);
      return;
    }

    const filtered = await Promise.all(
      characters.map(async (character) => {
        try {
          const planet = await PlanetsService.getById(character.homeworld);
          return planet.name === planetName ? character : null;
        } catch {
          return null;
        }
      })
    );

    setFilteredCharacters(filtered.filter((char): char is Character => char !== null));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <FilterNavigation onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filteredCharacters.map((character) => (
          <CharacterCard key={character.url} character={character} />
        ))}
      </div>
    </div>
  );
};

export default CharactersList; 