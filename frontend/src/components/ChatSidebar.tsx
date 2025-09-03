import { useNavigate } from "react-router-dom";
import { useCharacter } from '../contexts/CharacterContext';
import { useState } from 'react';

type ChatSidebarProps = {
  onSelectChat: (id: number) => void;
  onClose: () => void;
};
const chatData = {
  "2024-12-19": [
    {
      id: 1,
      time: "14:30",
      userMessage: "요즘 너무 스트레스가 많아요...",
      botReply: "정말 힘드시겠어요. 어떤 일들이 가장 스트레스가 되고 있나요?",
      emotion: { depression: 65, anxiety: 70, lethargy: 45 }
    },
    {
      id: 2,
      time: "14:25",
      userMessage: "회사에서 일이 너무 많아서 잠도 못 자고 있어요",
      botReply: "충분한 휴식이 필요하시겠어요. 잠을 잘 못 주무시는 것이 가장 큰 문제인 것 같아요.",
      emotion: { depression: 55, anxiety: 80, lethargy: 60 }
    },
    {
      id: 3,
      time: "14:20",
      userMessage: "안녕하세요! 오늘 기분이 좀 안 좋아서 상담받고 싶어요",
      botReply: "안녕하세요! 기분이 안 좋으시군요. 어떤 일이 있었는지 편하게 말씀해주세요.",
      emotion: { depression: 40, anxiety: 50, lethargy: 35 }
    }
  ],
  "2024-12-18": [
    {
      id: 4,
      time: "16:45",
      userMessage: "어제 상담 후 기분이 좀 나아졌어요",
      botReply: "정말 다행이에요! 어떤 부분이 도움이 되었나요?",
      emotion: { depression: 30, anxiety: 40, lethargy: 25 }
    },
    {
      id: 5,
      time: "16:30",
      userMessage: "오늘은 좀 더 긍정적으로 생각해보려고 해요",
      botReply: "좋은 마음가짐이에요! 긍정적인 변화를 느끼고 계시는군요.",
      emotion: { depression: 25, anxiety: 35, lethargy: 20 }
    }
  ],
  "2024-12-17": [
    {
      id: 6,
      time: "20:15",
      userMessage: "오늘 하루가 정말 힘들었어요...",
      botReply: "힘든 하루를 보내셨군요. 어떤 일이 있었는지 말씀해주세요.",
      emotion: { depression: 75, anxiety: 80, lethargy: 70 }
    },
    {
      id: 7,
      time: "20:00",
      userMessage: "스트레스 때문에 잠을 잘 못 자고 있어요",
      botReply: "스트레스로 인한 수면 문제는 정말 힘들죠. 어떤 방법을 시도해보셨나요?",
      emotion: { depression: 60, anxiety: 75, lethargy: 65 }
    }
  ]
};

const ChatSidebar = ({ onSelectChat, onClose }: ChatSidebarProps) => {
  const navigate = useNavigate();
  const { selectedCharacter } = useCharacter();
  const [selectedDate, setSelectedDate] = useState<string>("2024-12-19");

  const getDateString = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    });
  };

  const getFullDateString = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const getEmotionColor = (emotion: { depression: number; anxiety: number; lethargy: number }) => {
    const avg = (emotion.depression + emotion.anxiety + emotion.lethargy) / 3;
    if (avg >= 70) return 'bg-red-100 text-red-700';
    if (avg >= 50) return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  };

  const getEmotionText = (emotion: { depression: number; anxiety: number; lethargy: number }) => {
    const avg = (emotion.depression + emotion.anxiety + emotion.lethargy) / 3;
    if (avg >= 70) return '높음';
    if (avg >= 50) return '보통';
    return '낮음';
  };

  const availableDates = Object.keys(chatData).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  const currentChats = chatData[selectedDate as keyof typeof chatData] || [];

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">상담 내역</h2>
              <p className="text-sm text-gray-500">{selectedCharacter?.name}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="text-sm text-gray-600">
          {getFullDateString(selectedDate)}
        </div>
      </div>

      <div className="px-4 py-2 border-b border-gray-100">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {availableDates.map((date) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`px-3 py-2 text-sm rounded-lg whitespace-nowrap transition-colors ${
                selectedDate === date
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {getDateString(date)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentChats.length > 0 ? (
          currentChats.map((chat) => (
            <div 
              key={chat.id}
              className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 font-medium">{chat.time}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${getEmotionColor(chat.emotion)}`}>
                  감정: {getEmotionText(chat.emotion)}
                </span>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-800 font-medium">
                  "{chat.userMessage.length > 30 ? chat.userMessage.substring(0, 30) + '...' : chat.userMessage}"
                </div>
                <div className="text-xs text-gray-600">
                  {chat.botReply.length > 40 ? chat.botReply.substring(0, 40) + '...' : chat.botReply}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📝</div>
            <p className="text-sm">이 날짜에는 상담 내역이 없습니다.</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => navigate("/chatlog")}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
        >
          전체 상담 내역 보기
        </button>
      </div>
    </div>
  );
};

export default ChatSidebar;
