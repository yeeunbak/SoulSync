import React, { useState } from "react";

const questions = [
  "기분이 가라앉거나, 우울하거나, 희망이 없다고 느꼈다.",
  "평소 하던 일에 대한 흥미가 없어지거나 즐거움을 느끼지 못했다.",
  "잠들기 어렵거나 자주 깨거나 혹은 너무 많이 잤다.",
  "평소보다 식욕이 줄었거나 혹은 평소보다 많이 먹었다.",
  "다른 사람들이 눈치 챌 정도로 평소보다 말하거나 행동이 느려졌다/혹은 너무 안절부절 못해서 가만히 앉아 있을 수 없었다.",
  "피곤하고 기운이 없었다.",
  "내가 잘못 했거나, 실패했다는 생각이 들었다/혹은 자신과 가족을 실망시켰다고 생각했다.",
  "신문을 읽거나 TV를 보는 것과 같은 일상적인 일에도 집중할 수 없었다.",
  "죽음을 생각하는 것이 더 낫겠다고 생각했다/혹은 자해할 생각을 했다.",
];

const options = [
  { label: "없음", value: 0 },
  { label: "2~6일", value: 1 },
  { label: "7~12일", value: 2 },
  { label: "거의 매일", value: 3 },
];

export default function DiagnosisForm() {
  const [answers, setAnswers] = useState(Array(9).fill(null));

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("제출된 답변:", answers);
    const totalScore = answers.reduce((sum, val) => sum + (val ?? 0), 0);
    alert(`총 점수는 ${totalScore}점입니다.`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>우울증 건강설문-9 (PHQ-9)</h2>
      <p>지난 2주간, 얼마나 자주 다음과 같은 문제들로 곤란을 겪으셨습니까?<br />지난 2주 동안에 아래와 같은 생각을 한 날을 헤아려서 해당하는 숫자에 표시하세요.</p>
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
