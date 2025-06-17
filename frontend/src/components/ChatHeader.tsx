const ChatHeader = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <button onClick={onToggleSidebar}>☰</button>
      <h1 className="text-3xl text-lg font-semibold">SoulSync</h1>
      <div className="space-x-2">
      </div>
    </div>
  );
};

export default ChatHeader;
