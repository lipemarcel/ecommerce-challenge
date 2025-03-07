'use client';

import { useEffect, useState } from 'react';
import { Character } from '@/app/interfaces/characters';
import { CharactersService } from '@/app/services/api/characters';
import FilterNavigation from './filter-navigation';
import CharacterCard from './character-card';
import Button from './ui/button';
import { PlanetsService } from '@/app/services/api/planets';
import { motion } from 'framer-motion';

const CharactersList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);

  const fetchCharacters = async (url?: string) => {
    try {
      setIsLoadingMore(!!url);
      const data = await CharactersService.getAll(url);
      
      if (url) {
        // Adiciona novos personagens à lista existente
        setCharacters(prev => [...prev, ...data.results]);
        setFilteredCharacters(prev => [...prev, ...data.results]);
      } else {
        // Carregamento inicial
        setCharacters(data.results);
        setFilteredCharacters(data.results);
      }
      
      setNextPage(data.next);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleLoadMore = () => {
    if (nextPage) {
      fetchCharacters(nextPage);
    }
  };

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
    <div className="space-y-6">
      <FilterNavigation onFilterChange={handleFilterChange} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4"
      >
        {filteredCharacters.map((character, index) => {
          const characterId = character.url.split('/').filter(Boolean).pop();
          return (
            <motion.div
              key={characterId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <CharacterCard character={character} />
            </motion.div>
          );
        })}
      </motion.div>

      {nextPage && (
        <div className="flex justify-center pb-8">
          <Button
            variant="outline"
            size="lg"
            isLoading={isLoadingMore}
            onClick={handleLoadMore}
          >
            LOAD MORE
          </Button>
        </div>
      )}
    </div>
  );
};

export default CharactersList; 