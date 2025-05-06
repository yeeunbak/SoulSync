from fastapi import APIRouter, HTTPException
from app.schemas.analyze import AnalyzeRequest, AnalyzeResponse
import os
import openai
import json

router = APIRouter()
openai.api_key = os.getenv("OPENAI_API_KEY")

@router.post("/analyze-emotion", response_model=AnalyzeResponse)
async def analyze_emotion(req: AnalyzeRequest):
    prompt = f"""
너는 정신건강 상담 전문가야. 사용자의 발화를 기반으로 다음 세 가지 감정 상태를 0부터 100 사이 점수로 평가해줘.
- 우울 (Depression)
- 불안 (Anxiety)
- 무기력 (Lethargy)

다음 JSON 형식으로만 응답해줘:
{{ "우울": 숫자, "불안": 숫자, "무기력": 숫자 }}

입력: "{req.message}"
    """

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.5,
        )
        content = response['choices'][0]['message']['content'].strip()
        data = json.loads(content)
        return AnalyzeResponse(**data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"GPT 처리 오류: {str(e)}")