import React, { useState } from "react";

const questions = [
  "지난 한 달 동안, 예기치 못한 일 때문에 당황했던 적이 얼마나 있었습니까?",
  "지난 한 달 동안, 중요한 일들을 통제할 수 없다고 느낀 적이 얼마나 있었습니까?",
  "지난 한 달 동안, 신경이 예민해지고 스트레스를 많이 느낀 적이 얼마나 있었습니까?",
  "지난 한 달 동안, 당신이 개인적인 문제들을 다루지 못하고 있다고 느낀 적이 얼마나 있었습니까?",
  "지난 한 달 동안, 일상적인 일들에 대해서도 분노가 치민 적이 얼마나 있었습니까?",
  "지난 한 달 동안, 어려움들이 너무 많아서 극복할 수 없다고 느낀 적이 얼마나 있었습니까?",
  "지난 한 달 동안, 당신의 삶이 만족스러웠다고 느낀 적이 얼마나 있었습니까?",
  "지난 한 달 동안, 일상적인 일들도 제대로 해낼 수 없었다고 느낀 적이 얼마나 있었습니까?",
  "지난 한 달 동안, 인생의 어려운 일들을 잘 다룰 수 있다고 느낀 적이 얼마나 있었습니까?",
  "지난 한 달 동안, 당신이 상황을 잘 통제하고 있다고 느낀 적이 얼마나 있었습니까?",
];

const options = [
  { label: "전혀 그렇지 않다", value: 0 },
  { label: "가끔 그렇다", value: 1 },
  { label: "자주 그렇다", value: 2 },
  { label: "매우 자주 그렇다", value: 3 },
];

export default function DiagnosisFormPSS() {
  const [answers, setAnswers] = useState(Array(10).fill(null));

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalScore = answers.reduce((sum, val) => sum + (val ?? 0), 0);
    alert(`PSS 총점: ${totalScore}점`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>지각된 스트레스 척도 (PSS)</h2>
      <p>다음은 여러분이 지난 한 달간 얼마나 느꼈던지를 묻는 질문들입니다.<br />각 문항에 대해 해당하는 정도를 선택해 주세요.</p>
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
