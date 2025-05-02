# /models/emotion.py
from pydantic import BaseModel

class EmotionResult(BaseModel):
    user_id: str
    message: str
    sentiment: Literal["positive", "neutral", "negative"]
    score: float  # 예: 감정 점수 (0.0~1.0)
