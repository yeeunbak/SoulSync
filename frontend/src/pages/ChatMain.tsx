import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatSidebar from '../components/ChatSidebar';
import ChatHeader from '../components/ChatHeader';
import ChatInput from '../components/ChatInput';
import GaugeBox from '../components/GuageBox';
import character from '../assets/character_Main.png';
import bubble from '../assets/Bold2.svg';
import btnGuage from '../assets/button_gauge.svg';

const ChatMain = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [modelReply, setModelReply] = useState('');
  const [showGauge, setShowGauge] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);

  const [emotionScore, setEmotionScore] = useState({
    depression: 0,
    anxiety: 0,
    lethargy: 0,
  });

  const [emotionHistory, setEmotionHistory] = useState({
    depression: [] as number[],
    anxiety: [] as number[],
    lethargy: [] as number[],
  });

  const navigate = useNavigate(); // ✅ 추가

  const handleNewEmotion = (newScore: { depression: number; anxiety: number; lethargy: number }) => {
    setEmotionHistory((prev) => {
      const updated = {
        depression: [...prev.depression, newScore.depression],
        anxiety: [...prev.anxiety, newScore.anxiety],
        lethargy: [...prev.lethargy, newScore.lethargy],
      };

      const average = {
        depression: Math.round(updated.depression.reduce((a, b) => a + b, 0) / updated.depression.length),
        anxiety: Math.round(updated.anxiety.reduce((a, b) => a + b, 0) / updated.anxiety.length),
        lethargy: Math.round(updated.lethargy.reduce((a, b) => a + b, 0) / updated.lethargy.length),
      };

      setEmotionScore(average);

      if (average.depression >= 70 && average.anxiety >= 70 && average.lethargy >= 70) {
        setShowCrisisModal(true);
      }

      return updated;
    });
  };

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      <img
        src={character}
        alt="캐릭터"
        className="absolute z-0 left-1/2 top-1/2 w-[500px] h-auto -translate-x-1/2 -translate-y-1/2 opacity-90"
      />

      <div
        className="absolute z-10"
        style={{ top: '0.1%', right: '0.1%', width: '800px', height: 'auto' }}
      >
        <img src={bubble} alt="답변 배경" className="w-full h-auto opacity-80" />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-10 py-10">
          <div className="text-center text-base font-medium text-black leading-relaxed max-w-[700px] whitespace-pre-wrap">
            {modelReply.split(/\n|\\n/).map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowGauge(true)}
        style={{
          position: 'absolute',
          bottom: '32%',
          left: '30%',
          zIndex: 20,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        <div style={{ position: 'relative', width: '180px', height: '180px' }}>
          <img src={btnGuage} alt="버튼" className="w-full h-full opacity-60" />
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#4C5AA9',
              fontSize: '16px',
              fontWeight: 'bold',
              pointerEvents: 'none',
              opacity: '90%',
            }}
          >
            나의 상태
          </span>
        </div>
      </button>

      {showGauge && (
        <div
          style={{
            position: 'absolute',
            bottom: '46%',
            left: '13%',
            zIndex: 30,
          }}
        >
          <GaugeBox
            depression={emotionScore.depression}
            anxiety={emotionScore.anxiety}
            lethargy={emotionScore.lethargy}
            onClose={() => setShowGauge(false)}
          />
        </div>
      )}

      {showCrisisModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-8 w-[400px] text-center relative">
            <h2 className="text-lg font-bold text-red-600 mb-3">안내해드릴까요?</h2>
            <p className="text-sm text-gray-800 mb-6 leading-relaxed">
              혹시 지금 많이 힘드신가요?<br />
              필요한 경우 안전한 도움을 받을 수 있도록 도와드릴게요.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowCrisisModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100"
              >
                저는 괜찮아요
              </button>
              <button
                onClick={() => navigate("/crisis")} // ✅ 페이지 이동
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                네, 안내해주세요
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex h-screen bg-transparent text-white">
        {sidebarOpen && (
          <ChatSidebar
            onSelectChat={setActiveChat}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex-1 flex flex-col bg-white text-black">
          <ChatHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <div className="flex flex-col justify-between flex-1">
            <div className="flex-1 flex items-center justify-center"></div>
            <ChatInput
              setModelReply={setModelReply}
              setEmotionScore={handleNewEmotion}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMain;
