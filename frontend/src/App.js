import React, { useState } from "react";
import DiagnosisButton from "./components/DiagnosisButton";
import DiagnosisModal from "./components/DiagnosisModal";
import DiagnosisFormPHQ9 from "./components/DiagnosisFormPHQ9";
import DiagnosisFormPSS from "./components/DiagnosisFormPSS";
import DiagnosisFormGAD7 from "./components/DiagnosisFormGAD7";
import DiagnosisFormMKPQ16 from "./components/DiagnosisFormMKPQ16";

function App() {
  const [modalType, setModalType] = useState(null);
  const closeModal = () => setModalType(null);

  const renderModalContent = () => {
    switch (modalType) {
      case "PHQ9":
        return <DiagnosisFormPHQ9 />;
      case "PSS":
        return <DiagnosisFormPSS />;
      case "GAD7":
        return <DiagnosisFormGAD7 />;
      case "MKPQ16":
        return <DiagnosisFormMKPQ16 />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* ⬆️ 상단 고정 제목 영역 */}
      <div style={{ textAlign: "center", marginTop: "40px", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "28px", lineHeight: "1.5" }}>
          <strong>SoulSync</strong>는 처음이시군요!<br />
          당신에 대해 알려주세요.
        </h1>
      </div>

      {/* ⬇️ 버튼 정중앙 영역 */}
      <div
        style={{
          minHeight: "calc(100vh - 180px)", // 제목 높이 감안
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: "translateY(-10%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            maxWidth: "400px",
          }}
        >
          <DiagnosisButton label="지각된 스트레스 척도 (PSS)" onClick={() => setModalType("PSS")} />
          <DiagnosisButton label="우울증 건강설문-9 (PHQ-9)" onClick={() => setModalType("PHQ9")} />
          <DiagnosisButton label="일반화된 불안장애 척도-7 (GAD-7)" onClick={() => setModalType("GAD7")} />
          <DiagnosisButton label="교정된 정신증 고위험군 선별도구 (mKPQ-16)" onClick={() => setModalType("MKPQ16")} />

             {/* 안내문 추가 */}
             <p style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
            <span style={{ color: "#3366cc", fontWeight: "bold", cursor: "pointer" }}>아니요</span> 를 선택하시면 SoulSync의 정확도가 떨어질 수 있어요.
            </p>
        </div>
      </div>

      {/* 모달 */}
      <DiagnosisModal visible={!!modalType} onClose={closeModal}>
        {renderModalContent()}
      </DiagnosisModal>
    </div>
  );
}

export default App;
