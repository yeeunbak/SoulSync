// frontend/src/components/CharacterPickForm.tsx
import React from 'react';

interface CharacterCardProps {
  name: string;
  image: string;
  onClick: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ name, image, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer bg-white text-black rounded-2xl p-6 shadow-md transition duration-200 hover:bg-gray-200 hover:shadow-lg"
    >
      <img src={image} alt={name} className="w-38 h-auto mb-6" />
      <span className="text-center font-bold text-xl block text-black">{name}</span>
    </div>
  );
};

export default CharacterCard;
