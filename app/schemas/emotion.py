from pydantic import BaseModel
from typing import Literal

class EmotionAnalysisRequest(BaseModel):
    user_id: str
    message: str

class EmotionAnalysisResponse(BaseModel):
    sentiment: Literal["positive", "neutral", "negative"]
    score: float
