import React from 'react';

interface GaugeBoxProps {
  depression: number;
  anxiety: number;
  lethargy: number;
  onClose: () => void;
}

// 색상 조건 함수
const getGaugeColor = (value: number) => {
  if (value >= 70) return 'bg-red-500';      // 경고
  if (value >= 50) return 'bg-yellow-400';   // 주의
  return 'bg-green-500';                      // 정상
};

const GaugeBar = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className="mb-4">
      <div className="font-semibold text-black">{label}</div>
      <div className="w-full h-4 bg-gray-300 rounded-full">
        <div
          className={`h-full rounded-full transition-all duration-300 ${getGaugeColor(value)}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

const GaugeBox: React.FC<GaugeBoxProps> = ({ depression, anxiety, lethargy, onClose }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-xl w-[300px] relative z-50">
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-lg text-gray-600 hover:text-black"
      >
        ✕
      </button>
      <GaugeBar label="우울" value={depression} />
      <GaugeBar label="불안" value={anxiety} />
      <GaugeBar label="무기력" value={lethargy} />
    </div>
  );
};

export default GaugeBox;