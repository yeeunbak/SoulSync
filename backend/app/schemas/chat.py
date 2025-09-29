from typing import Optional, Literal
from pydantic import BaseModel

class EmotionScore(BaseModel):
    depression: int
    anxiety: int
    lethargy: int

# ✅ 'mode' 필드만 추가 (기본 'basic')
class ChatRequest(BaseModel):
    user_id: str
    character: Literal['empathic', 'insightful', 'pragmatic', 'trauma_sensitive']
    message: str
    show_emotion_score: bool = False
    mode: Optional[Literal['basic', 'rag']] = 'basic'  # ← 추가

class ChatResponse(BaseModel):
    reply: str
    emotion_score: Optional[EmotionScore] = None
