from pydantic import BaseModel
from typing import Literal

class UserCreate(BaseModel):
    user_id: str
    character_choice: Literal[
        "공감적 경청가형",
        "인지적 통찰가형",
        "현실적 조언가형",
        "트라우마 민감형"
    ]

class UserResponse(UserCreate):
    pass  # 현재는 같지만 나중에 추가될 수 있음
