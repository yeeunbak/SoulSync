from pydantic import BaseModel
from typing import Literal

class User(BaseModel):
    user_id: str  # 사용자 식별자
    character_choice: Literal[
        "공감적 경청가형", 
        "인지적 통찰가형", 
        "현실적 조언가형", 
        "트라우마 민감형"
    ]  # 반드시 4개 중 하나

    
class UserInDB(BaseModel):
    username: str
    hashed_password: str
