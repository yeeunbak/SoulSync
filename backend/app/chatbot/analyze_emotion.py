import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def analyze_emotion(user_message: str) -> dict:
    system_prompt = (
        "너는 사용자의 발화에서 감정을 분석하는 심리상담 AI야.\n"
        "'우울', '불안', '무기력' 정도를 0~100 사이의 숫자로 분석해서 "
        "정확히 다음 JSON 형태로만 응답해:\n"
        '{ "depression": 70, "anxiety": 45, "lethargy": 30 }'
    )

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ],
        temperature=0.5
    )

    try:
        content = response.choices[0].message.content.strip()
        emotion_data = json.loads(content)
        return emotion_data
    except Exception as e:
        # 실패 시 디버깅용 로그 출력 (선택 사항)
        print(f"Emotion parsing failed: {e}\nGPT response:\n{content}")
        return {"depression": 0, "anxiety": 0, "lethargy": 0}