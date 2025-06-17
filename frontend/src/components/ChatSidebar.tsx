type ChatSidebarProps = {
  onSelectChat: (id: number) => void;
  onClose: () => void;
};

const ChatSidebar = ({ onSelectChat, onClose }: ChatSidebarProps) => {
  return (
    <div className="w-56 bg-gray-100 p-4 text-black">
      <div className="flex justify-between items-center mb-4 font-semibold p-3">
        <span>상담내역</span>
        <button onClick={onClose}>✕</button>
      </div>
      <ul className="space-y-4 p-4">
        {[...Array(9)].map((_, i) => (
          <li key={i}>
            <button
              onClick={() => onSelectChat(i + 1)}
              className="w-full text-left hover:underline"
            >
               상담 {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
