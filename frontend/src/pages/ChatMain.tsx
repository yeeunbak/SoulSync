<<<<<<< HEAD
/* 메인 채팅 페이지 */
=======
import React, { useState } from 'react';
import ChatSidebar from '../components/ChatSidebar';
import ChatHeader from '../components/ChatHeader';
import ChatInput from '../components/ChatInput';
import character from '../assets/character_Main.png';
import bubble from '../assets/Bold2.svg';

const ChatMain = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const modelReply = "  ";

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* 👤 캐릭터 이미지 */}
      <img
        src={character}
        alt="캐릭터"
        className="absolute z-0 left-1/2 top-1/2 w-[500px] h-auto -translate-x-1/2 -translate-y-1/2 opacity-90"
      />

      {/* 💬 말풍선 답변 */}
      <div
        className="absolute z-10"
        style={{
          top: "0.1%",
          right: "0.1%",
          width: "800px",
          height: "auto",
        }}
      >
        <img src={bubble} alt="답변 배경" className="w-full h-auto opacity-80" />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-6 py-4 text-sm font-semibold leading-relaxed text-black">
          {modelReply}
        </div>
      </div>

      {/* 💻 페이지 전체 레이아웃 */}
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
>>>>>>> 4eca8867a8b4b7864fd55ac1ef1fb312e607b021
