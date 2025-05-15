import { useState } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;

    // 사용자 메시지 추가
    const newMessage: Message = { sender: "user", text: input };
    setMessages([...messages, newMessage]);

    // 임시 응답 (나중에 GPT로 대체)
    const botReply: Message = { sender: "bot", text: "GPT 응답 예정!" };
    setMessages((prev) => [...prev, newMessage, botReply]);

    setInput("");
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-4 border rounded-xl bg-white shadow">
      <h2 className="text-xl font-bold mb-4">🧠 SoulSync 챗봇</h2>
      <div className="h-80 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg ${
              msg.sender === "user" ? "bg-blue-100 text-right" : "bg-gray-200 text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border px-3 py-2 rounded-lg"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="메시지를 입력하세요..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={handleSend}
        >
          보내기
        </button>
      </div>
    </div>
  );
}
