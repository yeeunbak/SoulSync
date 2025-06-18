/* 메인 채팅 페이지 */
import React, { useState } from 'react';
import ChatSidebar from '../components/ChatSidebar';
import ChatHeader from '../components/ChatHeader';
import ChatInput from '../components/ChatInput';
import character from '../assets/character_Main.png';
<<<<<<< HEAD
import bubble from '../assets/Bold2.svg';
=======
import bubble from '../assets/Bold3.svg';
import btnGuage from '../assets/button_gauge.svg'
import GaugeBox from "../components/GuageBox";

>>>>>>> 8e2f56b0a443e58cbe5c6501d58ad74c58b8eae8

const ChatMain = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<number | null>(null);
<<<<<<< HEAD
  const modelReply = "  ";

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* 👤 캐릭터 이미지 */}
=======
  const modelReply = " 대화내용 ";
  const [showGauge, setShowGauge] = useState(false); //  버튼 상태
  const depression = 0.7, anxiety = 0.5, lethargy = 0.6; // 임시 수치

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/*  캐릭터 이미지 */}
>>>>>>> 8e2f56b0a443e58cbe5c6501d58ad74c58b8eae8
      <img
        src={character}
        alt="캐릭터"
        className="absolute z-0 left-1/2 top-1/2 w-[500px] h-auto -translate-x-1/2 -translate-y-1/2 opacity-90"
      />

<<<<<<< HEAD
      {/* 💬 말풍선 답변 */}
      <div
        className="absolute z-10"
        style={{
          top: "0.1%",
          right: "0.1%",
=======
      {/*  말풍선 답변 */}
      <div
        className="absolute z-10"
        style={{
          top: "10%",
          right: "2%",
>>>>>>> 8e2f56b0a443e58cbe5c6501d58ad74c58b8eae8
          width: "800px",
          height: "auto",
        }}
      >
        <img src={bubble} alt="답변 배경" className="w-full h-auto opacity-80" />
<<<<<<< HEAD
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-6 py-4 text-sm font-semibold leading-relaxed text-black">
=======
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-6 py-4 text-sm font-bold leading-relaxed text-black">
>>>>>>> 8e2f56b0a443e58cbe5c6501d58ad74c58b8eae8
          {modelReply}
        </div>
      </div>

<<<<<<< HEAD
      {/* 💻 페이지 전체 레이아웃 */}
=======
<button
  onClick={() => setShowGauge(true)}
  style={{
    position: "absolute",
    bottom: "32%",
    left: "30%",
    zIndex: 20,
    background: "none",
    border: "none",
    cursor: "pointer",
    outline: "none",
  }}
>
  {/* 이미지와 텍스트를 겹치기 위한 래퍼 */}
  <div style={{ position: "relative", width: "180px", height: "180px" }}>
    {/* 버튼 이미지 */}
    <img
      src={btnGuage}
      alt="버튼"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "8px",
        display: "block",
        opacity: "60%",

      }}
    />
    
    {/* 텍스트 오버레이 */}
    <span
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "#4C5AA9	",
        fontSize: "16px",
        fontWeight: "bold",
        pointerEvents: "none",
        opacity: "90%",

      }}
    >
      나의 상태
    </span>
  </div>
</button>
{showGauge && (
  <div
    style={{
      position: "absolute",
      bottom: "72%", // 버튼보다 약간 위
      left: "10%",    // 버튼보다 왼쪽
      zIndex: 30,
    }}
  >
    <GaugeBox
      depression={depression}
      anxiety={anxiety}
      lethargy={lethargy}
      onClose={() => setShowGauge(false)} // ✅ 닫기 연결

    />
  </div>
)}
      {/*  페이지 전체 레이아웃 */}
>>>>>>> 8e2f56b0a443e58cbe5c6501d58ad74c58b8eae8
      <div className="flex h-screen bg-transparent text-white">
        {/* 사이드바 */}
        {sidebarOpen && (
          <ChatSidebar
            onSelectChat={setActiveChat}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        {/* 오른쪽 메인 */}
        <div className="flex-1 flex flex-col bg-white text-black">
          <ChatHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          {/* 채팅 캐릭터와 입력창 구역 */}
          <div className="flex flex-col justify-between flex-1">
            <div className="flex-1 flex items-center justify-center">{/* 캐릭터 자리 */}</div>
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMain;
