import openai
import os
from dotenv import load_dotenv
import json

# .env 파일에서 OpenAI API 키 불러오기
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def analyze_emotion(user_message: str) -> dict:
    prompt = f"""
너는 감정 분석 전문가야.

사용자 발화에서 '우울(depression)', '불안(anxiety)', '무기력(lethargy)' 정도를 0.0부터 100.0까지의 **소수점 숫자(float)**로 정밀하게 평가해줘.
소숫점 둘째 자리까지 반영해도 좋아. 반드시 다양한 수치를 사용해 (예: 61.3, 73.9, 47.2 등).

❗주의: 반드시 아래 JSON 형식으로만 응답해야 해. 다른 텍스트는 절대 포함하지 마. reply, 설명, 문장 없이 **정확히 이 구조**만 응답해:

{{
  "depression": 73.2,
  "anxiety": 64.5,
  "lethargy": 39.9
}}

사용자 발화: "{user_message}"
"""

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.5
        )

        text = response['choices'][0]['message']['content']
        print("GPT 응답:\n", text)

        # 마크다운 코드 블럭 제거
        clean_text = text.strip()
        if clean_text.startswith("```json"):
            clean_text = clean_text.removeprefix("```json").strip()
        if clean_text.startswith("```"):
            clean_text = clean_text.removeprefix("```").strip()
        if clean_text.endswith("```"):
            clean_text = clean_text.removesuffix("```").strip()

        emotion = json.loads(clean_text)

        return {
            "depression": float(emotion.get("depression", 0)),
            "anxiety": float(emotion.get("anxiety", 0)),
            "lethargy": float(emotion.get("lethargy", 0))
        }

    except Exception as e:
        print(f"\n❗Error parsing response: {e}\nGPT returned:\n{text}")
        return {"depression": 0.0, "anxiety": 0.0, "lethargy": 0.0}