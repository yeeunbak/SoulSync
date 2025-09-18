import React from 'react';
import type { Character } from '../contexts/CharacterContext';

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        onClick(character);
      }}
      className="group relative flex flex-col items-center cursor-pointer bg-white rounded-3xl p-8 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-blue-200 transform"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10 mb-6 h-40 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 overflow-hidden">
          <img 
            src={character.image} 
            alt={character.name} 
            className="w-full h-full object-contain rounded-full transition-transform duration-300 group-hover:scale-125" 
          />
        </div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
          <div className="bg-white rounded-2xl shadow-2xl p-4 border border-gray-200 w-64">
            <img 
              src={character.image} 
              alt={`${character.name} 미리보기`}
              className="w-full h-48 object-contain rounded-xl"
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center h-24 flex flex-col justify-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {character.name}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 line-clamp-2">
          {character.description}
        </p>
      </div>

      <div className="relative z-10 h-16 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
            선택하기
          </button>
        </div>
      </div>

      <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default CharacterCard;
