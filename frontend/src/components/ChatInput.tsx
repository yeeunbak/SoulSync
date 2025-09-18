import React, { useState } from 'react';
import sendIcon from '../assets/send-icon.svg';
import { sendChatMessage } from '../api/chat';
import { useCharacter } from '../contexts/CharacterContext';

interface ChatInputProps {
  setModelReply: (text: string) => void;
  setEmotionScore: (score: { depression: number; anxiety: number; lethargy: number }) => void;
}

// [추가] UI 캐릭터 id → 백엔드가 허용하는 키로 매핑
// 허용 값: 'insightful' | 'trauma_sensitive' | 'empathic' | 'pragmatic'
const mapCharacterToApi = (
  id?: string
): 'insightful' | 'trauma_sensitive' | 'empathic' | 'pragmatic' => {
  const map: Record<string, 'insightful' | 'trauma_sensitive' | 'empathic' | 'pragmatic'> = {
    // 공감형
    empath: 'empathic',
    empathy: 'empathic',
    empathic: 'empathic',
    // 통찰형
    insightful: 'insightful',
    // 현실 조언형
    advisor: 'pragmatic',
    pragmatic: 'pragmatic',
    // 트라우마 민감형
    trauma: 'trauma_sensitive',
    trauma_sensitive: 'trauma_sensitive',
  };
  return (id && map[id]) || 'insightful';
};

const ChatInput: React.FC<ChatInputProps> = ({ setModelReply, setEmotionScore }) => {
  const { selectedCharacter } = useCharacter();
  const [message, setMessage] = useState('');

  // 누적 점수 및 횟수 상태
  const [totalScore, setTotalScore] = useState({ depression: 0, anxiety: 0, lethargy: 0 });
  const [count, setCount] = useState(0);
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    const text = message.trim();
    if (!text || sending) return;

    try {
      setSending(true);

      // [변경] 백엔드 허용 값으로 변환해서 전달
      const apiCharacter = mapCharacterToApi(selectedCharacter?.id);

      const res = await sendChatMessage(
        'testuser',          // TODO: 실제 사용자 ID로 교체
        apiCharacter,        // ← 여기!
        text,
        true                 // 감정 점수 포함
      );

      setModelReply(res.reply);

      // emotion_score가 null일 수 있으니 안전 처리
      if (res.emotion_score) {
        const newCount = count + 1;
        const newTotal = {
          depression: totalScore.depression + res.emotion_score.depression,
          anxiety: totalScore.anxiety + res.emotion_score.anxiety,
          lethargy: totalScore.lethargy + res.emotion_score.lethargy,
        };

        setTotalScore(newTotal);
        setCount(newCount);

        setEmotionScore({
          depression: newTotal.depression / newCount,
          anxiety: newTotal.anxiety / newCount,
          lethargy: newTotal.lethargy / newCount,
        });
      }

      setMessage('');
    } catch (err) {
      console.error('메시지 전송 실패:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full px-6 py-6 border-t border-gray-200 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100 transition-all duration-200 hover:shadow-xl">
            <div className="flex items-center">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="당신의 이야기를 자유롭게 이야기해주세요 !"
                className="flex-1 px-6 py-4 bg-transparent resize-none focus:outline-none text-gray-800 placeholder-gray-500 min-h-[56px] max-h-32 text-base"
                rows={1}
                style={{ height: 'auto', minHeight: '56px', maxHeight: '128px' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                }}
                disabled={sending}
              />
              
              <button
                onClick={handleSend}
                disabled={!message.trim() || sending}
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 mr-2 ${
                  message.trim() && !sending
                    ? 'bg-transparent text-gray-600 hover:scale-105'
                    : 'bg-transparent text-gray-400 cursor-not-allowed'
                }`}
                style={{ outline: 'none', border: 'none' }}
              >
                <img src={sendIcon} alt="보내기" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
