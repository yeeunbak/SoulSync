import { useNavigate } from "react-router-dom";


type ChatSidebarProps = {
  onSelectChat: (id: number) => void;
  onClose: () => void;
};

const ChatSidebar = ({ onSelectChat, onClose }: ChatSidebarProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-56 bg-gray-100 p-4 text-black">
      <div className="flex justify-between items-center mb-4 font-semibold p-3">
        <span>상담내역</span>
        <button onClick={onClose}>✕</button>
      </div>
            <button
              onClick={() => navigate("/chatlog")}
              className="w-full text-right hover:underline"
            >
               2025 .06 .18
            </button>

    </div>
  );
};

export default ChatSidebar;
