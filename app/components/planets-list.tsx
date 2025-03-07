'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Planet } from '@/app/interfaces/planets';
import { FilterType } from '@/app/interfaces/filters';
import { PlanetsService } from '@/app/services/api/planets';
import FilterNavigation from './filter-navigation';

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <FilterNavigation 
        onFilterChange={(planetName) => {
          setCurrentFilter(planetName === 'All' ? FilterType.ALL : planetName as FilterType)
        }}
        className="mb-8"
      />
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {planets.map((planet, index) => (
          <motion.div
            key={planet.url}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">{planet.name}</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium w-24">Climate:</span>
                  <span className="text-gray-800">{planet.climate}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium w-24">Terrain:</span>
                  <span className="text-gray-800">{planet.terrain}</span>
                </div>
                {planet.population && (
                  <div className="flex items-center">
                    <span className="text-gray-600 font-medium w-24">Population:</span>
                    <span className="text-gray-800">{planet.population}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PlanetsList; 