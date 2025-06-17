import React from "react";

interface GaugeBoxProps {
  depression: number;
  anxiety: number;
  lethargy: number;
  onClose: () => void;

}

const GaugeBox: React.FC<GaugeBoxProps> = ({ depression, anxiety, lethargy, onClose }) => {
  const renderGauge = (label: string, value: number) => (
    <div className="mt-4 mb-4">
      <div className="text-sm font-bold text-black mb-1">{label}</div>
      <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#6388E6] transition-all duration-300"
          style={{ width: `${value * 100}%` }}  
        />
      </div>
    </div>
  );

  return (
    <div
      className="absolute top-4 left-4 z-50 w-[350px] p-6 rounded-xl shadow-xl"
      style={{
        backgroundSize: "200%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
    <button
    onClick={onClose}
    className="absolute top-2 right-2 text-white bg-black bg-opacity-40 hover:bg-opacity-70 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold"
    >
    X
    </button>
      {renderGauge("우울", depression)}
      {renderGauge("불안", anxiety)}
      {renderGauge("무기력", lethargy)}
    </div>
  );
};

export default GaugeBox;
