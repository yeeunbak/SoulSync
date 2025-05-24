import React, { useState } from "react";

const questions = [
  "내가 텔레비전이나 라디오의 특별한 메시지를 받았다고 생각한 적이 있다.",
  "내 생각이 너무 빨라서 다른 사람이 따라잡기 어려울 정도라고 느낀 적이 있다.",
  "내 마음이 너무 바쁘게 움직여서 쉬고 싶어도 쉴 수 없다고 느낀 적이 있다.",
  "내 주변의 사람들이 나를 해치려고 하거나 음해하려 한다고 느낀 적이 있다.",
  "나는 종종 주변 사람들이 내 말을 이해하지 못한다고 느낀다.",
  "내가 너무 흥분해서 집중이 어려울 정도라고 느낀 적이 있다.",
  "나는 세상이 나를 위해 움직이고 있다고 느낀 적이 있다.",
  "나는 이상한 냄새나 맛, 소리 등을 다른 사람보다 더 자주 느낀다.",
  "나는 내 감정이 내 통제를 벗어난다고 느낄 때가 많다.",
  "나는 사람들이 내 생각을 읽고 있다고 느낀 적이 있다.",
  "나는 평범하지 않은 능력을 가졌다고 느낀다.",
  "나는 자주 혼자 있을 때 누군가 내 이름을 부른다고 느낀다.",
  "나는 내 생각이 다른 사람에게 전달된다고 느낀 적이 있다.",
  "나는 자주 다른 사람들과 감정적으로 단절되어 있다고 느낀다.",
  "나는 내 감정이 너무 격렬해서 감당하기 어렵다고 느낀다.",
  "나는 사람들의 시선이나 말에서 자신에 대한 비난을 자주 느낀다.",
];

const options = [
  { label: "예", value: 1 },
  { label: "아니요", value: 0 },
];

export default function DiagnosisFormMKPQ16() {
  const [answers, setAnswers] = useState(Array(16).fill(null));

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalScore = answers.reduce((sum, val) => sum + (val ?? 0), 0);
    alert(`mKPQ-16 총점: ${totalScore}점`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>교정된 정신증 고위험군 선별도구 (mKPQ-16)</h2>
      <p>아래 항목 중 지난 한 달 동안 당신에게 해당했던 것을 선택해 주세요. 각 문항에 대해 “예” 또는 “아니요”로 답해주세요.</p>
      {questions.map((question, qIndex) => (
        <div key={qIndex} style={{ marginBottom: "20px" }}>
          <p>{qIndex + 1}. {question}</p>
          {options.map((opt, oIndex) => (
            <label key={oIndex} style={{ marginRight: "15px" }}>
              <input
                type="radio"
                name={`q${qIndex}`}
                value={opt.value}
                checked={answers[qIndex] === opt.value}
                onChange={() => handleChange(qIndex, opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      ))}
      <button type="submit">제출</button>
    </form>
  );
}
