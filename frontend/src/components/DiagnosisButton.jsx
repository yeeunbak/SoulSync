export default function DiagnosisButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 20px",
        fontSize: "15px",
        width: "180px",
        height: "auto",               // 높이 자동
        minHeight: "60px",            // 최소 높이
        cursor: "pointer",
        borderRadius: "8px",
        border: "1px solid #ccc",
        backgroundColor: "#f9f9f9",
        wordBreak: "keep-all",        // 줄바꿈 허용
        textAlign: "center",
        whiteSpace: "normal",         // 여러 줄 허용
        lineHeight: "1.4",            // 줄 간격
      }}
    >
      {label}
    </button>
  );
}