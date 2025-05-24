import React, { useState } from "react";

const questions = [
  "초조하거나 불안하거나 조마조마하게 느낀다.",
  "걱정하는 것을 멈출 수가 없다.",
  "여러 가지 것들에 대해 걱정을 너무 많이 한다.",
  "편하게 있기 어렵다.",
  "너무 안절부절 못해서 가만히 있기 힘들다.",
  "쉽게 짜증이 나거나 쉽게 성을 내게 된다.",
  "마치 무서운 일이 생길 것처럼 두렵게 느껴진다.",
];

const options = [
  { label: "전혀 방해 받지 않았다", value: 0 },
  { label: "며칠 동안 방해 받았다", value: 1 },
  { label: "2주 중 절반 이상 방해 받았다", value: 2 },
  { label: "거의 매일 방해 받았다", value: 3 },
];

export default function DiagnosisFormGAD7() {
  const [answers, setAnswers] = useState(Array(7).fill(null));

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalScore = answers.reduce((sum, val) => sum + (val ?? 0), 0);
    alert(`GAD-7 총점: ${totalScore}점`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>일반화된 불안장애 척도-7 (GAD-7)</h2>
      <p>지난 2주 동안 아래 문제들로 인해 얼마나 자주 방해를 받았는지 체크해 주세요.</p>
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
