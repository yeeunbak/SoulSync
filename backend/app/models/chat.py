from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional

class ChatDBModel(BaseModel):
    user_id: str
    character: str  # 캐릭터 유형
    user_message: str
    bot_reply: str
    emotion_score: dict  # {"depression": int, "anxiety": int, "lethargy": int}
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        schema_extra = {
            "example": {
                "user_id": "user123",
                "character": "empathic",
                "user_message": "요즘 너무 무기력하고 아무것도 하기 싫어요.",
                "bot_reply": "그런 기분이 들 땐 잠시 멈춰서 쉬는 것도 중요해요. 당신은 충분히 잘하고 있어요.",
                "emotion_score": {"depression": 72, "anxiety": 38, "lethargy": 90},
                "timestamp": "2025-05-06T04:30:00.000Z"
            }
        }
