from pydantic import BaseModel
from typing import Literal
from datetime import datetime

class ChatRequest(BaseModel):
    user_id: str
    message: str

class ChatResponse(BaseModel):
    reply: str
    character: str
    timestamp: datetime
