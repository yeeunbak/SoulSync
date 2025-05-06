import openai

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
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.5
    )

    try:
        # GPT 응답에서 JSON 파싱 시도
        text = response['choices'][0]['message']['content']
        return eval(text)  # 또는 json.loads(text) (더 안전)
    except Exception as e:
        return {"depression": 0, "anxiety": 0, "lethargy": 0}
