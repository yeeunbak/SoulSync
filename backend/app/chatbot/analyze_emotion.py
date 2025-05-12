import openai
import os
from dotenv import load_dotenv
import json

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def analyze_emotion(user_message: str) -> dict:
    prompt = f"""
너는 사용자의 발화를 바탕으로 감정을 분석하는 심리상담 AI야.
사용자의 말에서 '우울(depression)', '불안(anxiety)', '무기력(lethargy)' 정도를 각각 0.0부터 100.0까지의 소수점 숫자로 평가해줘.

다음 형식의 JSON으로만 응답해:
{{
  "depression": 소수점 포함 숫자,
  "anxiety": 소수점 포함 숫자,
  "lethargy": 소수점 포함 숫자
}}

사용자 발화: "{user_message}"
"""

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o",  # ← 정확도 높이려면 4o 추천
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.5
        )

        text = response['choices'][0]['message']['content']
        print("GPT 응답:", text)

        emotion = json.loads(text)
        # float으로 강제 변환
        emotion = {k: float(v) for k, v in emotion.items()}
        return emotion

    except Exception as e:
        print(f"Error parsing response: {e}\nGPT returned:\n{text}")
        return {"depression": 0.0, "anxiety": 0.0, "lethargy": 0.0}
