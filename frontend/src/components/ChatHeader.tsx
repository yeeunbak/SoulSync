import { useNavigate } from "react-router-dom";

const ChatHeader = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-4 border-b z-50 relative bg-white">
      {/* 사이드바 토글 버튼 */}
      <button onClick={onToggleSidebar}>☰</button>

      {/* 가운데 제목 */}
      <h1 className="text-3xl font-semibold">SoulSync</h1>

      <div className="space-x-2">
        <button
          onClick={() => navigate("/diagnosis")}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition"
        >
          진단하기
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;