import React, { useState } from 'react';
import ChatSidebar from '../components/ChatSidebar';
import ChatHeader from '../components/ChatHeader';
import ChatInput from '../components/ChatInput';
import character from '../assets/character_Main.png';

const ChatMain = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<number | null>(null);

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* 👤 캐릭터 이미지 - 화면 정중앙 */}
      <img
        src={character}
        alt="캐릭터"
        className="absolute z-0 left-1/2 top-1/2 w-[500px] h-auto -translate-x-1/2 -translate-y-1/2 opacity-90"
      />

    <div className="flex h-screen bg-gray-900 text-white">
      {/* 사이드바 (toggle) */}
      {sidebarOpen && (
        <ChatSidebar
          onSelectChat={setActiveChat}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      {/* 오른쪽 메인 */}
      <div className="flex-1 flex flex-col bg-white text-black">
        {/* 상단 헤더 */}
        <ChatHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* 중앙 콘텐츠 + 입력창 포함 */}
        <div className="flex flex-col justify-between flex-1">
          {/* 중앙 콘텐츠 (ex. 캐릭터 자리) */}
          <div className="flex-1 flex items-center justify-center">
          </div>

          {/* 입력창 */}
          <ChatInput />
        </div>
      </div>
    </div>
    </div>
  );
};

export default ChatMain;
