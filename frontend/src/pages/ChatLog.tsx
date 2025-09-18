import character from "../assets/character_Main.png"; // 필요시
import React from "react";

const dummyMessages = [
  { id: 1, sender: "user", text: "안녕하세요!" },
  { id: 2, sender: "bot", text: "안녕하세요, 무엇을 도와드릴까요?" },
  { id: 3, sender: "user", text: "서비스에 대해 알고 싶어요." },
  { id: 4, sender: "bot", text: "AI 상담 서비스를 제공하고 있습니다." },
];

const ChatLog = () => {
  return (
    <div className="w-full h-screen bg-white p-6 overflow-y-auto">
      <div className="max-w-2xl mx-auto space-y-4">
        {dummyMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[70%] ${
                msg.sender === "user"
                  ? "bg-gray-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatLog;
