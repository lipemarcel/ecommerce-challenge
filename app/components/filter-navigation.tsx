'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlanetsService } from '@/app/services/api/planets';
import { Planet } from '@/app/interfaces/planets';
import Button from '@/app/components/ui/button';

interface FilterNavigationProps {
  onFilterChange: (planetName: string) => void;
  className?: string;
}

const FilterNavigation = ({ onFilterChange, className = '' }: FilterNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllPlanets = async () => {
      try {
        setIsLoading(true);
        const allPlanets = await PlanetsService.getAllPlanets();
        const sortedPlanets = allPlanets.sort((a, b) => a.name.localeCompare(b.name));
        setPlanets(sortedPlanets);
      } catch (error) {
        console.error('Failed to fetch planets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllPlanets();
  }, []);

  const handleFilterSelect = (planetName: string) => {
    setSelectedFilter(planetName);
    setIsOpen(false);
    onFilterChange(planetName);
  };

  const handleClearAll = () => {
    setSelectedFilter('All');
    onFilterChange('All');
  };

  const isDisabled = selectedFilter === 'All' || isLoading;

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <span className="text-gray-600 dark:text-gray-400 font-medium whitespace-nowrap">
            Filter By:
          </span>
          <div className="relative flex-1 sm:flex-none">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full sm:w-64 px-4 py-2 text-left bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-800 dark:text-gray-200 font-medium">
                  {isLoading ? 'Loading planets...' : selectedFilter}
                </span>
                <motion.svg
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </div>
            </button>

            <AnimatePresence>
              {isOpen && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 w-full sm:w-64 mt-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="max-h-60 overflow-y-auto">
                    <motion.button
                      whileHover={{ backgroundColor: '#F3F4F6' }}
                      onClick={() => handleFilterSelect('All')}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 transition-colors duration-200 ${
                        selectedFilter === 'All' 
                          ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-200' 
                          : 'text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      All
                    </motion.button>
                    {planets.map((planet) => (
                      <motion.button
                        key={planet.url}
                        whileHover={{ backgroundColor: '#F3F4F6' }}
                        onClick={() => handleFilterSelect(planet.name)}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 transition-colors duration-200 ${
                          selectedFilter === planet.name 
                            ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-200' 
                            : 'text-gray-800 dark:text-gray-200'
                        }`}
                      >
                        {planet.name}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <Button
            onClick={handleClearAll}
            variant="outline"
            disabled={selectedFilter === 'All'}
            className={`
              px-6 font-normal uppercase transition-all
              ${selectedFilter === 'All'
                ? 'opacity-50'
                : 'hover:border-gray-400 dark:hover:border-gray-500'
              }
            `}
          >
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterNavigation;
