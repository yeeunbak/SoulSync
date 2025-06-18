/* 메인 채팅 페이지 */
import React, { useState } from 'react';
import ChatSidebar from '../components/ChatSidebar';
import ChatHeader from '../components/ChatHeader';
import ChatInput from '../components/ChatInput';
import GaugeBox from '../components/GuageBox';
import character from '../assets/character_Main.png';
import bubble from '../assets/Bold3.svg';
import btnGuage from '../assets/button_gauge.svg'



const ChatMain = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [modelReply, setModelReply] = useState('');
  const [showGauge, setShowGauge] = useState(false);

  // ✅ 감정 점수 상태 추가
  const [emotionScore, setEmotionScore] = useState({
    depression: 0,
    anxiety: 0,
    lethargy: 0,
  });

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* 캐릭터 이미지 */}
      <img
        src={character}
        alt="캐릭터"
        className="absolute z-0 left-1/2 top-1/2 w-[500px] h-auto -translate-x-1/2 -translate-y-1/2 opacity-90"
      />

      {/* 말풍선 응답 텍스트 */}
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

      {/* 나의 상태 버튼 */}
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

      {/* 감정 게이지 박스 */}
      {showGauge && (
        <div
          style={{
            position: 'absolute',
            bottom: '42.5%',
            left: '16.5%',
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

      {/* 전체 레이아웃 */}
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
              setEmotionScore={setEmotionScore} // ✅ 전달
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMain;