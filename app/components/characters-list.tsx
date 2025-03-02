'use client';

import { useEffect, useState } from 'react';
import { Character } from '@/app/interfaces/characters';
import { CharactersService } from '@/app/services/api/characters';
import FilterNavigation from './filter-navigation';
import CharacterCard from './character-card';

const CharactersList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        const data = await CharactersService.getAll();
        setCharacters(data.results);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <FilterNavigation />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {characters.map((character) => (
          <CharacterCard key={character.url} character={character} />
        ))}
      </div>
    </div>
  );
};

export default CharactersList; 