'use client';

import { useEffect, useState } from 'react';
import { Planet } from '@/app/interfaces/planets';
import { FilterType } from '@/app/interfaces/filters';
import { PlanetsService } from '@/app/services/api/planets';
import FilterNavigation from './filter_navigation';

const PlanetsList = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<FilterType>(FilterType.ALL);

  const fetchPlanets = async (filter: FilterType) => {
    try {
      setIsLoading(true);
      const data = await PlanetsService.getAll(filter);
      setPlanets(data.results);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanets(currentFilter);
  }, [currentFilter]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <FilterNavigation />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {planets.map((planet) => (
          <div 
            key={planet.url}
            className="border rounded-lg p-4 shadow-sm"
          >
            <h2 className="text-xl font-bold">{planet.name}</h2>
            <p>Climate: {planet.climate}</p>
            <p>Terrain: {planet.terrain}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanetsList; 