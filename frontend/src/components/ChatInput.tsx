import React, { useState } from 'react';
import sendIcon from '../assets/send-icon.svg';

const ChatInput = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    console.log('보낸 메시지:', message);
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
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
