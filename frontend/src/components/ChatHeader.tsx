import { useNavigate } from "react-router-dom";

const ChatHeader = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
  const navigate = useNavigate();

  return (
<<<<<<< HEAD
    <div className="flex justify-between items-center p-4 border-b">
=======
    <div className="flex justify-between items-center p-4 border-b z-50 relative bg-white">
>>>>>>> 850464e50bc519513d3c54e9ee7334c80c3695f0
      {/* 사이드바 토글 버튼 */}
      <button onClick={onToggleSidebar}>☰</button>

      {/* 가운데 제목 */}
      <h1 className="text-3xl font-semibold">SoulSync</h1>

      <div className="space-x-2">
        <button
<<<<<<< HEAD
          onClick={() => navigate("/diag")} // ✅ 위치 고정
=======
          onClick={() => navigate("/diagnosis")}
>>>>>>> 850464e50bc519513d3c54e9ee7334c80c3695f0
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition"
        >
          진단하기
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;