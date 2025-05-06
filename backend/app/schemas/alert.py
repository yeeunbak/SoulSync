from pydantic import BaseModel

class AlertMessage(BaseModel):
    user_id: str
    message: str
    level: str  # 예: "위험", "주의", "정보"
