from pydantic import BaseModel
from typing import Optional, Literal

class ChatRequest(BaseModel):
    user_id: str
    character: str
    message: str
    show_emotion_score: bool = False
    mode: Literal["basic", "rag"] = "basic"

class ChatResponse(BaseModel):
    reply: str
    emotion_score: Optional[dict] = None
