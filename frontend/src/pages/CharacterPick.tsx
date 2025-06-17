/* 캐릭터선택창 */
import React from 'react';
import CharacterCard from '../components/CharacterPickForm';

import empathImg from '../assets/empath.png';
import cognitiveImg from '../assets/cognitive.png';
import advisorImg from '../assets/advisor.png';
import traumaImg from '../assets/trauma.png';

const CharacterPick: React.FC = () => {
  const handleCharacterSelect = (type: string) => {
    console.log(`${type} 캐릭터 선택됨`);
    // TODO: 여기에 라우팅 또는 상태 저장 로직 추가 가능
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-8 py-16 bg-white text-black">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-black">당신의 친구를 선택하세요!</h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-black">
        <CharacterCard
          name="공감적 경청가형"
          image={empathImg}
          onClick={() => handleCharacterSelect("공감적 경청가형")}
        />
        <CharacterCard
          name="인지적 통찰가형"
          image={cognitiveImg}
          onClick={() => handleCharacterSelect("인지적 통찰가형")}
        />
        <CharacterCard
          name="현실적 조언가형"
          image={advisorImg}
          onClick={() => handleCharacterSelect("현실적 조언가형")}
        />
        <CharacterCard
          name="트라우마 민감형"
          image={traumaImg}
          onClick={() => handleCharacterSelect("트라우마 민감형")}
        />
      </div>
    </div>
  );
};

export default CharacterPick;
