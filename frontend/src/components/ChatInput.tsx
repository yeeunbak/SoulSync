import React, { useState } from 'react';
import sendIcon from '../assets/send-icon.svg';
import { sendChatMessage } from '../api/chat';

interface ChatInputProps {
  setModelReply: (text: string) => void;
  setEmotionScore: (score: { depression: number; anxiety: number; lethargy: number }) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ setModelReply, setEmotionScore }) => {
  const [message, setMessage] = useState('');

  // 누적 점수 및 횟수 상태 추가
  const [totalScore, setTotalScore] = useState({
    depression: 0,
    anxiety: 0,
    lethargy: 0,
  });
  const [count, setCount] = useState(0);

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      const res = await sendChatMessage(
        'testuser',       // 임시 사용자 ID
        'empathic',       // 임시 캐릭터 타입
        message,
        true              // 감정 점수 포함 요청
      );

      console.log('보낸 메시지:', message);
      console.log('GPT 응답:', res.reply);
      console.log('감정 점수:', res.emotion_score);

      setModelReply(res.reply);

      // 누적 점수 및 평균 계산
      const newCount = count + 1;
      const newTotal = {
        depression: totalScore.depression + res.emotion_score.depression,
        anxiety: totalScore.anxiety + res.emotion_score.anxiety,
        lethargy: totalScore.lethargy + res.emotion_score.lethargy,
      };

      setTotalScore(newTotal);
      setCount(newCount);

      // 평균 감정 점수 업데이트
      setEmotionScore({
        depression: newTotal.depression / newCount,
        anxiety: newTotal.anxiety / newCount,
        lethargy: newTotal.lethargy / newCount,
      });

      setMessage('');
    } catch (err) {
      console.error('메시지 전송 실패:', err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="w-full px-4 py-6 border-t flex justify-center bg-gray-50">
      <div className="w-[70%] max-w-3xl flex items-center rounded-full bg-white shadow px-4 py-2">
        <input
          type="text"
          placeholder="Type message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-3 py-2 bg-transparent focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="text-gray-400 hover:text-black transition text-lg"
        >
          <img src={sendIcon} alt="보내기" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
