'use client';

import { Character } from '@/app/interfaces/characters';
import { PlanetsService } from '@/app/services/api/planets';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  const [homeworld, setHomeworld] = useState<string>('Loading...');
  
  const characterId = character.url.split('/').filter(Boolean).pop() || '1';
  const imageUrl = `https://picsum.photos/seed/${characterId}/400/300`;

  useEffect(() => {
    const fetchHomeworld = async () => {
      try {
        const planet = await PlanetsService.getById(character.homeworld);
        setHomeworld(planet.name);
      } catch (error) {
        setHomeworld('Unknown');
      }
    };

    fetchHomeworld();
  }, [character.homeworld]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="container-people">
        <figure>
          <img 
            src={imageUrl}
            alt={character.name}
            className="w-full h-64 object-cover"
            loading="lazy"
          />
          <div className="content space-y-4 p-6">
            <p className="text-xl font-bold text-gray-900">{character.name}</p>
            <p className="text-gray-500">{homeworld}</p>
            <p className="text-sm uppercase text-gray-600">
              Height • {character.height}
            </p>
            <p className="text-sm uppercase text-gray-600">
              Mass • {character.mass}
            </p>
            <p className="text-sm uppercase text-gray-600">
              Gender • {character.gender}
            </p>
          </div>
        </figure>
      </div>
    </motion.div>
  );
};

export default CharacterCard; 