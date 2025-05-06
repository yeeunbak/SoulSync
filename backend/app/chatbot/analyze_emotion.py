import openai
import os
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

def analyze_emotion(user_message: str) -> dict:
    prompt = f"""
다음 사용자 발화에서 '우울', '불안', '무기력' 정도를 0부터 100 사이 점수로 평가해줘. 형식은 JSON으로, 예시는 다음과 같아:
{{
  "depression": 70,
  "anxiety": 45,
  "lethargy": 30
}}
사용자 발화: "{user_message}"
"""

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # 또는 gpt-4o
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.5
    )

    try:
        text = response['choices'][0]['message']['content']
        import json
        emotion = json.loads(text)  # ✅ eval() 대신 json.loads 사용
        return emotion
    except Exception as e:
        print(f"Error parsing response: {e}\nGPT returned:\n{text}")
        return {"depression": 0, "anxiety": 0, "lethargy": 0}