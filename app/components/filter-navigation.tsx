'use client';

import { useState, useEffect } from 'react';
import { PlanetsService } from '@/app/services/api/planets';
import { Planet } from '@/app/interfaces/planets';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterNavigationProps {
  onFilterChange: (planetName: string) => void;
}

const FilterNavigation = ({ onFilterChange }: FilterNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllPlanets = async () => {
      try {
        setIsLoading(true);
        const allPlanets = await PlanetsService.getAllPlanets();
        // Ordenar planetas por nome
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

  return (
    <nav className="py-4">
      <div className="container">
        <div className="filter">
          <div className="label flex items-center gap-3">
            <span className="text-gray-600">Filter By:</span>
            <div className="relative">
              <div 
                onClick={() => setIsOpen(!isOpen)} 
                className="flex items-center gap-2 cursor-pointer"
              >
                <p className="text-gray-900">
                  {isLoading ? 'Loading planets...' : selectedFilter}
                </p>
                <svg 
                  className={`arrow transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  width="12" 
                  height="12" 
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M2.5 4.5L6 8L9.5 4.5" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              
              <AnimatePresence>
                {isOpen && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10 max-h-[300px] overflow-y-auto"
                  >
                    <div
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 
                        ${selectedFilter === 'All' ? 'bg-gray-50' : ''}`}
                      onClick={() => handleFilterSelect('All')}
                    >
                      All
                    </div>
                    {planets.map((planet) => (
                      <div
                        key={planet.url}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 
                          ${selectedFilter === planet.name ? 'bg-gray-50' : ''}`}
                        onClick={() => handleFilterSelect(planet.name)}
                      >
                        {planet.name}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FilterNavigation;
