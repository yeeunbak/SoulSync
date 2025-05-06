# /models/conversation.py
from pydantic import BaseModel
from datetime import datetime

class Conversation(BaseModel):
    user_id: str
    character: str
    message: str
    sender: Literal["user", "assistant"]
    timestamp: datetime
