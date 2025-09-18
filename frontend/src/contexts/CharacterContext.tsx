import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Character {
  id: string;
  name: string;
  image: string;
  description: string;
  personality: string;
  greeting: string;
}

interface CharacterContextType {
  selectedCharacter: Character | null;
  setSelectedCharacter: (character: Character | null) => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
};

interface CharacterProviderProps {
  children: ReactNode;
}

export const CharacterProvider: React.FC<CharacterProviderProps> = ({ children }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  return (
    <CharacterContext.Provider value={{ selectedCharacter, setSelectedCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
};
