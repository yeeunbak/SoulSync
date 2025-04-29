from pydantic import BaseModel
from datetime import datetime

class Conversation(BaseModel):
    user_id: str                      # 사용자 식별자
    user_message: str                # 사용자가 입력한 메시지
    bot_reply: str                   # 챗봇이 생성한 답변
    timestamp: datetime              # 대화가 저장된 시간 (서버에서 datetime.now()로 찍음)