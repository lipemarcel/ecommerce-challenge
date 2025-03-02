'use client';

import { Character } from '@/app/interfaces/characters';
import { PlanetsService } from '@/app/services/api/planets';
import { useEffect, useState } from 'react';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  const [homeworld, setHomeworld] = useState<string>('Loading...');

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
    <article className="bg-white rounded-lg p-6 shadow-sm">
      <div className="container-people">
        <figure>
          <img 
            src="/placeholder-image.jpg" 
            alt={character.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="content space-y-4">
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
            <h5 className="text-gray-600">Additional Info</h5>
            <h4 className="text-gray-600">More Details</h4>
          </div>
        </figure>
      </div>
    </article>
  );
};

export default CharacterCard; 