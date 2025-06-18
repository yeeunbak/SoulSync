import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CrisisSupport = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ ChatMain에서 넘어올 때 상태로 보내준 값 체크
  const fromChat = location.state?.fromChat === true;

  const handleReturn = () => {
    if (fromChat) {
      navigate('/chat', { replace: true }); // 상태 유지하며 chat으로 복귀
    } else {
      navigate('/'); // 그 외에는 홈으로
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-4 py-12">
      <div className="max-w-xl w-full bg-red-50 border border-red-300 rounded-xl p-8 shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-600 text-center mb-4">
          당신의 안전이 가장 중요해요
        </h1>

        <p className="text-center text-base mb-6">
          지금 많이 힘드신가요?<br />아래의 전문 기관이나 도움 경로를 통해 꼭 도움을 받아보세요.
        </p>

        <div className="bg-white border border-gray-300 rounded-md p-4 mb-6">
          <ul className="list-disc list-inside text-left space-y-2">
            <li>
              <span className="font-semibold">📞 정신건강 상담전화:</span> 1577-0199 (24시간 상담 가능)
            </li>
            <li>
              <span className="font-semibold">🚨 한국생명의전화:</span> 1588-9191 (자살 위기 중재)
            </li>
            <li>
              <span className="font-semibold">💬 문자 상담:</span> 1577-0199 (전화가 어려울 땐 문자로)
            </li>
            <li>
              <span className="font-semibold">🧠 마인드링크 화상 상담:</span> www.mindlink.or.kr
            </li>
            <li>
              <span className="font-semibold">🏥 가까운 병원이나 상담 센터:</span> 정신 건강 복지 센터 방문 상담
            </li>
          </ul>
        </div>

        <div className="text-center text-sm text-gray-600 mb-4">
          당신은 혼자가 아닙니다. SoulSync는 언제나 당신 편이에요.
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleReturn}
            className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            다시 상담 이어가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrisisSupport;